import datetime
import os

def greet_user():
    """Greet the user with current time"""
    current_time = datetime.datetime.now()
    print(f"Hello! Current time is: {current_time.strftime('%Y-%m-%d %H:%M:%S')}")

def get_system_info():
    """Display basic system information"""
    print(f"Current working directory: {os.getcwd()}")
    print(f"Python executable: {os.sys.executable}")

if __name__ == "__main__":
    print("new file - enhanced version")
    greet_user()
    get_system_info()