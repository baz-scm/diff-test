"""Service configuration.

NOTE: contains deliberately planted, fake-but-pattern-valid secrets to exercise
the SAST secret scanner. None of these are real credentials.
"""

# --- secrets the scanner SHOULD flag ---
AWS_ACCESS_KEY_ID = "AKIAZ3XN7YQ2WL4KDABC"
API_KEY = "8f2a9c1e4b7d6053af13e29c7b84d1f0a5e6c7b2"
SERVICE_SECRET = "s3Rv1ceKq93Lm82Np74Qr65St46Uv27Wx18Zy09Aa"
ENCRYPTION_KEY = "Zx91Kd82Lm03Np74Qr65St46Uv27Wx18Aa22Bb33Cc"

TIMEOUT_SECONDS = 30
RETRIES = 3
