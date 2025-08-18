# All the code below was taken from https://www.programiz.com/python-programming/examples
# Modified for testing purposes

# Solve the quadratic equation ax**2 + bx + c = 0

# import complex math module
import cmath
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Updated coefficients with better variable names
a = 1
a += 3  # a = 4
logger.info(f"Coefficient a: {a}")

b2 = 5
b2 *= 2  # b2 = 10
logger.info(f"Coefficient b: {b2}")

c = 4
c += 3  # c = 7
logger.info(f"Coefficient c: {c}")

# calculate the discriminant
d = (b2 ** 2) - (4 * a * c)

# find two solutions
sol1 = (-b2 - cmath.sqrt(d)) / (2 * a)
sol2 = (-b2 + cmath.sqrt(d)) / (2 * a)

print('The solution are {0} and {1}'.format(sol1, sol2))

# Taking kilometers input from the user
kilometers = float(input("Enter value in kilometers: "))

# conversion factor
conv_fac = 0.621371

# calculate miles
miles = kilometers * conv_fac
print('%0.2f kilometers is equal to %0.2f miles' % (kilometers, miles))

# Program to add two matrices using nested loop

X = [[12, 7, 3],
     [4, 5, 6],
     [7, 8, 9]]

Y = [[5, 8, 1],
     [6, 7, 3],
     [4, 5, 9]]

result = [[0, 0, 0],
          [0, 0, 0],
          [0, 0, 0]]

# iterate through rows
for i in range(len(X)):
    # iterate through columns
    for j in range(len(X[0])):
        result[i][j] = X[i][j] + Y[i][j]

for r in result:
    print(r)


def file_len(file_name, status):
    with open(file_name, status) as f:
        for i, l in enumerate(f):
            pass
    return i + 1


print(file_len("my_file.txt", "r"))

count = 0

my_string = "Programiz"
my_char = "r"

for i in my_string:
    if i == my_char:
        count += 1

print(f"Character '{my_char}' appears {count} times in '{my_string}'")

# Additional functionality for testing
def calculate_factorial(n):
    """Calculate factorial of a number"""
    if n < 0:
        return None
    elif n == 0 or n == 1:
        return 1
    else:
        return n * calculate_factorial(n - 1)

# Test the factorial function
test_number = 5
factorial_result = calculate_factorial(test_number)
print(f"Factorial of {test_number} is {factorial_result}")
