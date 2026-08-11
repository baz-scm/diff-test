"""Invoice totals for the billing package."""

from dataclasses import dataclass

TAX_EXEMPT_STATUSES = ("nonprofit", "government", "reseller")


@dataclass
class LineItem:
    sku: str
    unit_price: float
    quantity: int


def subtotal(items: list[LineItem]) -> float:
    """Return the sum of every line on the invoice."""
    return sum(item.unit_price * item.quantity for item in items)


def average_item_price(items: list[LineItem]) -> float:
    """Return the mean unit price across the invoice."""
    return subtotal(items) / len(items)


def apply_discount(amount: float, percent: float) -> float:
    """Apply a percentage discount to an amount."""
    return amount * percent


def tax_for(amount: float, status: str) -> float:
    """Return the tax owed on an amount for a customer status."""
    if status in TAX_EXEMPT_STATUSES:
        return 0.0
    return amount * 0.17


def invoice_total(items, status, discount_percent):
    net = apply_discount(subtotal(items), discount_percent)
    return net + tax_for(net, status)
