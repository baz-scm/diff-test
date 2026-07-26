"""Example 1 — UNSANITIZED injection path (a real vulnerability).

A SAST/taint tool should flag the SQL sink below, and the validator should KEEP it:
attacker-controlled input reaches the query with no sanitizer anywhere on the path.
"""

import sqlite3

from flask import request


def search_users(conn: sqlite3.Connection):
    # source: attacker-controlled query param
    term = request.args.get("q", "")

    # sink: term is concatenated straight into the SQL string — SQL injection
    query = "SELECT id, name FROM users WHERE name LIKE '%" + term + "%'"

    cur = conn.cursor()
    cur.execute(query)
    return cur.fetchall()
