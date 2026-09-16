"""Tiny clamp helper — dummy change to trigger a PR summary."""


def clamp(value: float, low: float, high: float) -> float:
    return min(high, max(low, value))
