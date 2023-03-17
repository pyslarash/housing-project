# This file checks data in the table
import mysql.connector
from cryptography.fernet import Fernet
import keys
from keys import DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE

# Read the secret key from the file
with open("secrets.key", "rb") as f:
    secret_key = f.read()

# Decrypt the credentials
cipher_suite = Fernet(secret_key)

# create a connection to the MySQL server
cnx = mysql.connector.connect(user=cipher_suite.decrypt(keys.DB_USER.encode()).decode(), password=cipher_suite.decrypt(keys.DB_PASSWORD.encode()).decode(),
                              host=cipher_suite.decrypt(keys.DB_HOST.encode()).decode(),
                              database=cipher_suite.decrypt(keys.DB_DATABASE.encode()).decode())

# create a cursor object to execute SQL queries
cursor = cnx.cursor()

# define the query to retrieve data from your table
query = "SELECT * FROM combined_city_data LIMIT 10"

# execute the query
cursor.execute(query)

# iterate over the result set and display each row
for row in cursor:
    print(row)

# close the cursor and connection
cursor.close()
cnx.close()