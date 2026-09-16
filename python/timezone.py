"""Tiny helpers for timezone offsets — dummy change to trigger a PR summary."""


def offset_hours(utc_offset_minutes: int) -> float:
    return utc_offset_minutes / 60


def format_offset(utc_offset_minutes: int) -> str:
    sign = "+" if utc_offset_minutes >= 0 else "-"
    hours, minutes = divmod(abs(utc_offset_minutes), 60)
    return f"UTC{sign}{hours:02d}:{minutes:02d}"
