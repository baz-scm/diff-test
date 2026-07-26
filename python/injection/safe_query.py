import sqlite3

from flask import request

from injection.validators import sanitize_sort_column


def list_users_sorted(conn: sqlite3.Connection):
    raw_sort = request.args.get("sort", "id")
    sort_column = sanitize_sort_column(raw_sort)
    query = f"SELECT id, name FROM users WHERE active = ? ORDER BY {sort_column}"
    cur = conn.cursor()
    cur.execute(query, (True,))
    return cur.fetchall()
