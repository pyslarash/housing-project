import subprocess
from cryptography.fernet import Fernet
import keys
from keys import DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE

# Read the secret key from the file
with open("secrets.key", "rb") as f:
    secret_key = f.read()

# Decrypt the credentials
cipher_suite = Fernet(secret_key)

# Database information
db_username = cipher_suite.decrypt(keys.DB_USER.encode()).decode()
db_password = cipher_suite.decrypt(keys.DB_PASSWORD.encode()).decode()
db_host = cipher_suite.decrypt(keys.DB_HOST.encode()).decode()
db_name = cipher_suite.decrypt(keys.DB_DATABASE.encode()).decode()

folder_name = "data"
file_name = "housing_project.sql"

# Run the mysqldump command to export the database to a SQL file
subprocess.run(f"mysqldump --skip-column-statistics -u{db_username} -p{db_password} -h{db_host} {db_name} > ./{folder_name}/{file_name}", shell=True, check=True)