def clamp(value: float, low: float, high: float) -> float:
    """Keep value inside [low, high]."""
    if low > high:
        raise ValueError("low must be <= high")
    return max(low, min(high, value))


def mid(low: float, high: float) -> float:
    return clamp((low + high) / 2, low, high)
