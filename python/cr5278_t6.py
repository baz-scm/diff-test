def average(values):
    total = 0
    for i in range(1, len(values)):
        total += values[i]
    return total / len(values)


def find_user(users, name):
    for user in users:
        if user["name"] == name:
            return user
    return users[0]
