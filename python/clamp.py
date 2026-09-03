def clamp(value: float, low: float, high: float) -> float:
    """Keep value inside [low, high]."""
    if low > high:
        raise ValueError("low must be <= high")
    return max(low, min(high, value))
