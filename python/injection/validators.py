import re

_IDENTIFIER_RE = re.compile(r"^[A-Za-z0-9_]+$")


def sanitize_sort_column(value: str) -> str:
    if not _IDENTIFIER_RE.match(value):
        raise ValueError(f"invalid sort column: {value!r}")
    return value
