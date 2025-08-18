# Solve the quadratic equation ax**2 + bx + c = 0
# Enhanced version with error handling

# import complex math module
import cmath
import sys

def solve_quadratic(a, b, c):
    """Solve quadratic equation with error handling"""
    if a == 0:
        print("Error: 'a' cannot be zero for a quadratic equation")
        return None, None
    
    # calculate the discriminant
    d = (b**2) - (4*a*c)
    
    # find two solutions
    sol1 = (-b-cmath.sqrt(d))/(2*a)
    sol2 = (-b+cmath.sqrt(d))/(2*a)
    
    return sol1, sol2

# Test coefficients
a = 1
b = 5
c = 6

sol1, sol2 = solve_quadratic(a, b, c)
if sol1 is not None:
    print('The solutions are {0} and {1}'.format(sol1, sol2))

# Unit conversion function with validation
def km_to_miles(kilometers):
    """Convert kilometers to miles with validation"""
    if kilometers < 0:
        raise ValueError("Distance cannot be negative")
    
    # conversion factor
    conv_fac = 0.621371
    
    # calculate miles
    miles = kilometers * conv_fac
    return miles

# Test conversion (using hardcoded value for testing)
try:
    test_km = 10.5
    miles = km_to_miles(test_km)
    print('%0.2f kilometers is equal to %0.2f miles' % (test_km, miles))
except ValueError as e:
    print(f"Conversion error: {e}")


# Program to add two matrices using nested loop

X = [[12,7,3],
     [4 ,5,6],
     [7 ,8,9]]

Y = [[5,8,1],
     [6,7,3],
     [4,5,9]]

result = [[0,0,0],
          [0,0,0],
          [0,0,0]]

# iterate through rows
for i in range(len(X)):
    # iterate through columns
    for j in range(len(X[0])):
        result[i][j] = X[i][j] + Y[i][j]

for r in result:
    print(r)


def file_len(fname):
    """Count lines in a file with error handling"""
    try:
        with open(fname) as f:
            for i, l in enumerate(f):
                pass
        return i + 1
    except FileNotFoundError:
        print(f"Error: File '{fname}' not found")
        return 0
    except Exception as e:
        print(f"Error reading file: {e}")
        return 0

# Test with a non-existent file (for demonstration)
line_count = file_len("my_file.txt")
print(f"File line count: {line_count}")

count = 0

my_string = "Programiz"
my_char = "r"

for i in my_string:
    if i == my_char:
        count += 1

print(count)
