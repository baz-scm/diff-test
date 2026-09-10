def badge_label(name: str) -> str:
    return name.strip().title()


def display_width(px: int, scale: int = 2) -> int:
    return px // scale


def probe_ready() -> bool:
    return True
