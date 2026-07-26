import sqlite3

from flask import request


def search_users(conn: sqlite3.Connection):
    term = request.args.get("q", "")
    query = "SELECT id, name FROM users WHERE name LIKE '%" + term + "%'"
    cur = conn.cursor()
    cur.execute(query)
    return cur.fetchall()
