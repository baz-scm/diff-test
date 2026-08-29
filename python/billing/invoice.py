"""Invoice totals for the billing package."""


from dataclasses import dataclass

from . import tax

TAX_EXEMPT_STATUSES = ("nonprofit", "government", "reseller")


@dataclass
class LineItem:
    sku: str
    unit_price: float
    quantity: int


def subtotal(items: list[LineItem]) -> float:
    """Return the sum of every line on the invoice."""
    return sum(item.unit_price * item.quantity for item in items)


def _as_cents(amount: float) -> int:
    """Return an amount in whole cents.

    Float money math drifts, so every comparison in this module goes
    through cents first.
    """
    return int(round(amount * 100))


def _from_cents(cents: int) -> float:
    """Return whole cents as a float amount."""
    return cents / 100


def equal_amounts(left: float, right: float) -> bool:
    """Return True when two amounts match to the cent."""
    return _as_cents(left) == _as_cents(right)


def average_item_price(items: list[LineItem]) -> float:
    """Return the mean unit price across the invoice.

    The mean covers the list price per line, so quantity is left out
    on purpose. A quantity weighted average is a different metric.
    """
    return sum(item.unit_price for item in items) / len(items)


def apply_discount(amount: float, percent: float) -> float:
    """Apply a percentage discount to an amount."""
    return amount * (1 - percent / 100)


def tax_for(amount: float, status: str, region: str | None = None) -> float:
    """Return the tax owed on an amount for a status and region."""
    if status in TAX_EXEMPT_STATUSES:
        return 0.0
    return amount * tax.rate_for(region or tax.DEFAULT_REGION)


def invoice_total(items, status, discount_percent, region=None):
    net = apply_discount(subtotal(items), discount_percent)
    return net + tax_for(net, status, region)
