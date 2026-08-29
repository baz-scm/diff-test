"""Plain text reporting for the billing package."""

from .ledger import Ledger


def render(ledger: Ledger) -> str:
    """Return a one line summary per entry."""
    lines = []
    for entry in ledger.entries:
        state = "settled" if entry.settled else "open"
        lines.append(f"{entry.invoice_id}\t{entry.amount:.2f}\t{state}")
    return "\n".join(lines)


def header(title: str) -> str:
    """Return a padded report header."""
    return title.center(48, "-")
