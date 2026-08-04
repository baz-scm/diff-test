"""Geometry helpers for basic 2D area calculations (circle, rectangle, triangle)."""
import math


def circle_area(radius):
    if radius < 0:
        raise ValueError("radius must be non-negative")
    return math.pi * radius ** 2


def rectangle_area(width, height):
    if width < 0 or height < 0:
        raise ValueError("sides must be non-negative")
    return width * height


def triangle_area(base, height):
    if base < 0 or height < 0:
        raise ValueError("base and height must be non-negative")
    return 0.5 * base * height


def square_area(side):
    if side < 0:
        raise ValueError("side must be non-negative")
    return side * side
