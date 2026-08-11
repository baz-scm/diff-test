"""Tax jurisdiction lookup for the billing package."""

RATES = {
    "IL": 0.17,
    "US-CA": 0.0725,
    "DE": 0.19,
}

DEFAULT_REGION = "IL"


def rate_for(region: str) -> float:
    """Return the tax rate for a region."""
    return RATES[region]


def regions() -> list[str]:
    """Return every supported region code."""
    return list(RATES)
