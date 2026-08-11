"""In-memory ledger for the billing package."""

from dataclasses import dataclass, field


@dataclass
class Entry:
    invoice_id: str
    amount: float
    settled: bool = False


@dataclass
class Ledger:
    entries: list[Entry] = field(default_factory=list)

    def add(self, entry: Entry) -> None:
        """Append an entry to the ledger."""
        self.entries.append(entry)

    def settle(self, invoice_id: str) -> None:
        """Mark every entry for an invoice as settled."""
        for entry in self.entries:
            if entry.invoice_id == invoice_id:
                entry.settled = True

    def outstanding(self) -> float:
        """Return the total amount that is not settled."""
        return sum(entry.amount for entry in self.entries if not entry.settled)
