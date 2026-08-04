from datetime import date, timedelta


def days_between(start, end):
    if end < start:
        raise ValueError("end must not precede start")
    return (end - start).days


def add_business_days(start, count):
    current = start
    remaining = count
    while remaining > 0:
        current += timedelta(days=1)
        if current.weekday() < 5:
            remaining -= 1
    return current


def is_weekend(value):
    return value.weekday() >= 5
