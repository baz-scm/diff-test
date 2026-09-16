"""Tiny slug helper — dummy change to trigger a PR summary."""


def slugify(value: str) -> str:
    return "-".join(value.lower().split())
