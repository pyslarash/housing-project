# This file checks data in the table
import mysql.connector

# create a connection to the MySQL server
cnx = mysql.connector.connect(user='pyslarash', password='!FancyPass123$',
                              host='127.0.0.1',
                              database='housing_project')

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