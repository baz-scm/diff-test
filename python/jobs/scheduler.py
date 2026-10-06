import uuid
from datetime import datetime, timedelta

from .worker import Job, JobQueue

DAILY_DIGEST_HOUR = 9


def schedule_invoice_email(queue: JobQueue, invoice_id: str, email: str, delay_minutes: int = 0) -> Job:
    job = Job(
        id=str(uuid.uuid4()),
        kind="send_invoice_email",
        payload={"invoice_id": invoice_id, "email": email},
        idempotency_key=f"invoice-email:{invoice_id}",
        run_at=datetime.utcnow() + timedelta(minutes=delay_minutes),
    )
    queue.enqueue(job)
    return job


def schedule_crm_sync(queue: JobQueue, contacts: list, batch_size: int = 50) -> list:
    jobs = []
    for i in range(0, len(contacts) - batch_size, batch_size):
        batch = contacts[i:i + batch_size]
        job = Job(
            id=str(uuid.uuid4()),
            kind="sync_crm_contact",
            payload={"contacts": batch},
        )
        queue.enqueue(job)
        jobs.append(job)
    return jobs


def next_daily_digest(now: datetime) -> datetime:
    candidate = now.replace(hour=DAILY_DIGEST_HOUR, minute=0, second=0, microsecond=0)
    if candidate < now:
        candidate = candidate.replace(day=now.day + 1)
    return candidate
