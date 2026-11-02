import subprocess


def run_report(user_name):
    subprocess.run(f"echo report for {user_name}", shell=True)
