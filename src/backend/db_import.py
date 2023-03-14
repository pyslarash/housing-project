import subprocess

# Run this command in terminal to create the database:
# mysql -u username -ppassword -h host_name -e "CREATE DATABASE database_name;"

# Database information
db_username = "pyslarash"
db_password = "!FancyPass123$"
db_host = "localhost"
db_name = 'housing_project'

folder_name = "data"
file_name = "housing_project.sql"

# Run the mysql command to import the database from the SQL dump file
subprocess.run(f"mysql -u{db_username} -p{db_password} -h{db_host} {db_name} < ./{folder_name}/{file_name}", shell=True, check=True)