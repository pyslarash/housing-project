# This file checks data in the table
import os
from dotenv import load_dotenv
import mysql.connector

# Load environment variables from .env file
load_dotenv()

# create a connection to the MySQL server
cnx = mysql.connector.connect(user=os.environ.get('ENV_DB_USER'), password=os.environ.get('ENV_DB_PASSWORD'),
                              host=os.environ.get('ENV_DB_HOST'),
                              database=os.environ.get('ENV_DB_DATABASE'))

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