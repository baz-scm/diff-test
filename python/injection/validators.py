"""Shared input validators — the 'pre-handler' sanitization layer used by other modules."""

import re

_IDENTIFIER_RE = re.compile(r"^[A-Za-z0-9_]+$")


def sanitize_sort_column(value: str) -> str:
    """Allowlist a SQL identifier: only [A-Za-z0-9_], otherwise reject.

    This neutralizes injection for any value passed through it before it reaches a SQL sink.
    """
    if not _IDENTIFIER_RE.match(value):
        raise ValueError(f"invalid sort column: {value!r}")
    return value
