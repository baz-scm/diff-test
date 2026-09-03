"""CR-4951 smoke: Merger Planner after deploy."""


def plan_score(ready: int, blocked: int) -> int:
    return max(ready - blocked, 0)


def can_merge(score: int) -> bool:
    return score > 0


def planner_verdict(ready: int, blocked: int) -> str:
    return "merge" if can_merge(plan_score(ready, blocked)) else "hold"
