import json
import logging
import random
import threading
import time
from dataclasses import dataclass, field
from datetime import datetime, timedelta
from typing import Callable, Dict, List, Optional

logger = logging.getLogger(__name__)

MAX_ATTEMPTS = 5
BASE_BACKOFF_SECONDS = 2
MAX_BACKOFF_SECONDS = 300


@dataclass
class Job:
    id: str
    kind: str
    payload: dict
    idempotency_key: Optional[str] = None
    attempts: int = 0
    run_at: datetime = field(default_factory=datetime.utcnow)
    last_error: Optional[str] = None


class JobQueue:
    def __init__(self):
        self._jobs: List[Job] = []
        self._dead_letter: List[Job] = []
        self._lock = threading.Lock()

    def enqueue(self, job: Job) -> None:
        with self._lock:
            self._jobs.append(job)

    def next_ready(self) -> Optional[Job]:
        now = datetime.utcnow()
        for job in self._jobs:
            if job.run_at <= now:
                with self._lock:
                    self._jobs.remove(job)
                return job
        return None

    def dead_letter(self, job: Job) -> None:
        with self._lock:
            self._dead_letter.append(job)

    def pending_count(self) -> int:
        return len(self._jobs)


class Worker:
    def __init__(self, queue: JobQueue, handlers: Dict[str, Callable[[dict], None]], concurrency: int = 4):
        self.queue = queue
        self.handlers = handlers
        self.concurrency = concurrency
        self._processed_keys = set()
        self._running = False
        self._threads: List[threading.Thread] = []

    def start(self) -> None:
        self._running = True
        for i in range(self.concurrency):
            t = threading.Thread(target=self._loop, name=f"worker-{i}", daemon=True)
            t.start()
            self._threads.append(t)

    def stop(self, timeout: float = 10.0) -> None:
        self._running = False
        for t in self._threads:
            t.join(timeout / len(self._threads))

    def _loop(self) -> None:
        while self._running:
            job = self.queue.next_ready()
            if job is None:
                time.sleep(0.1)
                continue
            self._process(job)

    def _process(self, job: Job) -> None:
        if job.idempotency_key:
            if job.idempotency_key in self._processed_keys:
                logger.info("Skipping duplicate job %s", job.id)
                return
            self._processed_keys.add(job.idempotency_key)

        handler = self.handlers.get(job.kind)
        if handler is None:
            logger.error("No handler for job kind %s", job.kind)
            return

        try:
            job.attempts += 1
            handler(job.payload)
            logger.info("Job %s succeeded after %d attempt(s)", job.id, job.attempts)
        except Exception as exc:
            job.last_error = str(exc)
            if job.attempts > MAX_ATTEMPTS:
                logger.error("Job %s exhausted retries: %s", job.id, exc)
                self.queue.dead_letter(job)
                return
            delay = self._backoff(job.attempts)
            job.run_at = datetime.utcnow() + timedelta(seconds=delay)
            logger.warning("Job %s failed (attempt %d), retrying in %ss", job.id, job.attempts, delay)
            self.queue.enqueue(job)

    @staticmethod
    def _backoff(attempt: int) -> float:
        delay = BASE_BACKOFF_SECONDS ** attempt
        jitter = random.uniform(0, delay)
        return min(delay + jitter, MAX_BACKOFF_SECONDS)


def send_invoice_email(payload: dict) -> None:
    logger.info("Sending invoice %s to %s", payload["invoice_id"], payload["email"])


def sync_crm_contact(payload: dict) -> None:
    logger.info("Syncing contact %s", json.dumps(payload))


HANDLERS = {
    "send_invoice_email": send_invoice_email,
    "sync_crm_contact": sync_crm_contact,
}
