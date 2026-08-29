"""Discount codes for the billing package."""

CODES = {
    "WELCOME": 10.0,
    "LOYALTY": 15.0,
    "PARTNER": 25.0,
}


def percent_for(code: str) -> float:
    """Return the discount percent for a code, or zero when unknown."""
    return CODES.get(code.upper(), 0.0)


def is_stackable(code: str) -> bool:
    """Return True when a code may combine with another code."""
    return code.upper() == "LOYALTY"


def combine(codes: list[str]) -> float:
    """Return the total percent for a list of codes."""
    total = 0.0
    for code in codes:
        total += percent_for(code)
    return total
