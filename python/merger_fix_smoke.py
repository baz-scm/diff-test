"""CR-4951 smoke: Merger on Planner after reread fix."""


def score_change(additions: int, deletions: int) -> int:
    return max(additions - deletions, 0)


def ready_to_merge(score: int, blockers: int) -> bool:
    return score > 0 and blockers == 0


def verdict(score: int, blockers: int) -> str:
    return "ready" if ready_to_merge(score, blockers) else "blocked"
