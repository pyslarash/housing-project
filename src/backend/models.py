from flask import Flask
from sqlalchemy import create_engine, Column, Integer, String, Boolean, Float, Text, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base
import mysql.connector # Connecting to MySQL DB

# create a connection to the MySQL server in XAMPP
cnx = mysql.connector.connect(user='pyslarash', password='!FancyPass123$',
                              host='localhost',
                              database='housing_project')

app = Flask(__name__)

Base = declarative_base()

class User(Base):
    __tablename__ = 'user'

    id = Column(Integer, primary_key=True, autoincrement=True)
    profile_pic = Column(String(255))
    username = Column(String(255), nullable=False)
    email = Column(String(255), nullable=False)
    password = Column(String(255), nullable=False)
    first_name = Column(String(255))
    last_name = Column(String(255))
    info = Column(Text)
    type = Column(String(255))

    def serialize(self):
        return {
            'id': self.id,
            'profile_pic': self.profile_pic,
            'username': self.username,
            'email': self.email,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'info': self.info,
            'type': self.type
        }

class CombinedCityData(Base):
    __tablename__ = 'combined_city_data'

    id = Column(Integer, primary_key=True, autoincrement=True)
    city = Column(String(255), nullable=False)
    state = Column(String(255), nullable=False)
    city_median_income = Column(Integer)
    city_crime_violent = Column(Integer)
    city_crime_property = Column(Integer)
    city_num_of_brews = Column(Integer)
    city_one_br_price = Column(Integer)
    city_two_br_price = Column(Integer)
    city_is_startup = Column(String(255))
    city_is_foodie = Column(String(255))
    cbsa = Column(Integer)
    metro = Column(String(255))
    metro_state = Column(String(255))
    metro_population = Column(Integer)
    metro_aqi = Column(Integer)
    metro_one_br_price = Column(Integer)
    metro_two_br_price = Column(Integer)
    metro_unemployment = Column(Float)
    metro_avg_nwi = Column(Float)
    state_min_wage = Column(Float)
    mj_legal_status = Column(String(255))
    mj_medicinal = Column(String(255))
    mj_decriminalized = Column(String(255))
    state_one_br_price = Column(Integer)
    state_two_br_price = Column(Integer)
    city_population = Column(Integer)
    city_density = Column(Float)

    def serialize(self):
        return {
            'id': self.id,
            'city': self.city,
            'state': self.state,
            'city_population': self.city_population,
            'city_density': self.city_density,
            'city_median_income': self.city_median_income,            
            'city_crime_violent': self.city_crime_violent,
            'city_crime_property': self.city_crime_property,
            'city_num_of_brews': self.city_num_of_brews,
            'city_one_br_price': self.city_one_br_price,
            'city_two_br_price': self.city_two_br_price,
            'city_is_startup': self.city_is_startup,
            'city_is_foodie': self.city_is_foodie,
            'cbsa': self.cbsa,
            'metro': self.metro,
            'metro_state': self.metro_state,
            'metro_population': self.metro_population,
            'metro_aqi': self.metro_aqi,
            'metro_one_br_price': self.metro_one_br_price,
            'metro_two_br_price': self.metro_two_br_price,
            'metro_unemployment': self.metro_unemployment,
            'metro_avg_nwi': self.metro_avg_nwi,
            'state_min_wage': self.state_min_wage,
            'mj_legal_status': self.mj_legal_status,
            'mj_medicinal': self.mj_medicinal,
            'mj_decriminalized': self.mj_decriminalized,
            'state_one_br_price': self.state_one_br_price,
            'state_two_br_price': self.state_two_br_price            
        }

class Favorites(Base):
    __tablename__ = 'favorites'

    user_id = Column(Integer, ForeignKey('user.id'), primary_key=True)
    city_id = Column(Integer, ForeignKey('combined_city_data.id'), primary_key=True)

    user = relationship('User', backref='favorites')
    city = relationship('CombinedCityData', backref='favorites')
    
    def serialize(self):
        return {
            'user_id': self.user_id,
            'city_id': self.city_id,
            'user': self.user.serialize(),
            'city': self.city.serialize()
        }
    
# close the connection
cnx.close()