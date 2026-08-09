def mean(values):
    if not values:
        raise ValueError("values must not be empty")
    return sum(values) / len(values)


def median(values):
    if not values:
        raise ValueError("values must not be empty")
    ordered = sorted(values)
    mid = len(ordered) // 2
    if len(ordered) % 2:
        return ordered[mid]
    return (ordered[mid - 1] + ordered[mid]) / 2
