"""Tiny slug helper — dummy change to trigger a PR summary."""


def slugify(value: str) -> str:
    return "-".join(value.lower().split())


def is_slug(value: str) -> bool:
    return value == slugify(value)
