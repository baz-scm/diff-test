def slugify(text):
    return "-".join(text.lower().split())


def truncate(text, limit):
    if limit < 0:
        raise ValueError("limit must be non-negative")
    if len(text) <= limit:
        return text
    return text[:limit].rstrip() + "..."


def initials(full_name):
    return "".join(part[0].upper() for part in full_name.split() if part)


def title_case(text):
    return " ".join(word.capitalize() for word in text.split())
