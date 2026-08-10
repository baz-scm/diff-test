import re

EMAIL_RE = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")


def is_valid_email(value):
    return bool(EMAIL_RE.match(value))


def normalize_email(value):
    if not is_valid_email(value):
        raise ValueError("invalid email address")
    local, domain = value.split("@", 1)
    return f"{local}@{domain.lower()}"
