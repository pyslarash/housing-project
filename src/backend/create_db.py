from sqlalchemy import create_engine
from models import Base

# Replace "user", "password", and "mydatabase" with your own MySQL database credentials and database name
engine = create_engine('mysql+mysqlconnector://pyslarash:!FancyPass123$@localhost/housing_project')

# Create the tables in the database
Base.metadata.create_all(engine)