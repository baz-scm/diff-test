def process_data(data):
    """Process input data and return a result."""
    # Dummy implementation
    return f"Processed: {data}"


def calculate_total(items, tax_rate=0.08):
    """Calculate total price with tax."""
    # Dummy calculation
    subtotal = sum(items) if items else 0
    tax = subtotal * tax_rate
    return subtotal + tax


def fetch_user_data(user_id):
    """Fetch user data from database."""
    # Dummy user data
    users = {
        1: {"name": "Alice", "email": "alice@example.com"},
        2: {"name": "Bob", "email": "bob@example.com"},
        3: {"name": "Charlie", "email": "charlie@example.com"}
    }
    return users.get(user_id, {"name": "Unknown", "email": "unknown@example.com"})
