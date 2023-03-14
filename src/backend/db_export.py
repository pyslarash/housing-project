import subprocess

# Database information
db_username = "pyslarash"
db_password = "!FancyPass123$"
db_host = "localhost"
db_name = 'housing_project'

folder_name = "data"
file_name = "housing_project.sql"

# Run the mysqldump command to export the database to a SQL file
subprocess.run(f"mysqldump --skip-column-statistics -u{db_username} -p{db_password} -h{db_host} {db_name} > ./{folder_name}/{file_name}", shell=True, check=True)