from cryptography.fernet import Fernet

# Generate a secret key
secret_key = Fernet.generate_key()

# Encrypt the credentials
cipher_suite = Fernet(secret_key)

DB_HOST = cipher_suite.encrypt(b'localhost').decode()
DB_PORT = cipher_suite.encrypt(b'5000').decode()
DB_USER = cipher_suite.encrypt(b'pyslarash').decode()
DB_PASSWORD = cipher_suite.encrypt(b'!FancyPass123$').decode()
DB_DATABASE = cipher_suite.encrypt(b'housing_project').decode()

# Write the secret key and encrypted credentials to a file
with open("secrets.key", "wb") as f:
    f.write(secret_key)

with open("keys.py", "w") as f:
    f.write(f"DB_HOST = '{DB_HOST}'\n")
    f.write(f"DB_PORT = '{DB_PORT}'\n")
    f.write(f"DB_USER = '{DB_USER}'\n")
    f.write(f"DB_PASSWORD = '{DB_PASSWORD}'\n")
    f.write(f"DB_DATABASE = '{DB_DATABASE}'\n")
