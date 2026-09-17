def clamp01(value: float) -> float:
    return max(0.0, min(1.0, value))

def invert01(value: float) -> float:
    return 1.0 - clamp01(value)
