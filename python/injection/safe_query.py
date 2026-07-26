"""Example 2 — injection path that IS sanitized by a pre-handler in ANOTHER file.

A SAST/taint tool will likely flag the SQL sink (identifier interpolated into the query
string), but the validator should DROP it as a false positive: the value is run through
`sanitize_sort_column` (an allowlist in python/injection/validators.py) before it ever
reaches the sink, so the taint is neutralized on the path.
"""

import sqlite3

from flask import request

from injection.validators import sanitize_sort_column


def list_users_sorted(conn: sqlite3.Connection):
    # source: attacker-controlled query param
    raw_sort = request.args.get("sort", "id")

    # pre-handler sanitization, defined in another file: allowlist-validate the identifier
    sort_column = sanitize_sort_column(raw_sort)

    # sink: sort_column is now guaranteed to match ^[A-Za-z0-9_]+$; the value filter is parameterized
    query = f"SELECT id, name FROM users WHERE active = ? ORDER BY {sort_column}"

    cur = conn.cursor()
    cur.execute(query, (True,))
    return cur.fetchall()
