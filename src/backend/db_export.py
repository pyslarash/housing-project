import os
from dotenv import load_dotenv
import subprocess

# Load environment variables from .env file
load_dotenv()

# Database information
db_username = os.environ.get('ENV_DB_USER')
db_password = os.environ.get('ENV_DB_PASSWORD')
db_host = os.environ.get('ENV_DB_HOST')
db_name = os.environ.get('ENV_DB_DATABASE')

folder_name = "data"
file_name = "housing_project.sql"

# Run the mysqldump command to export the database to a SQL file
subprocess.run(f"mysqldump --skip-column-statistics -u{db_username} -p{db_password} -h{db_host} {db_name} > ./{folder_name}/{file_name}", shell=True, check=True)