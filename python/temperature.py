ABSOLUTE_ZERO_C = -273.15


def celsius_to_fahrenheit(celsius):
    if celsius < ABSOLUTE_ZERO_C:
        raise ValueError("below absolute zero")
    return celsius * 9 / 5 + 32


def celsius_to_kelvin(celsius):
    if celsius < ABSOLUTE_ZERO_C:
        raise ValueError("below absolute zero")
    return celsius - ABSOLUTE_ZERO_C
