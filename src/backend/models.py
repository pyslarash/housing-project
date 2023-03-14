from flask import Flask
from sqlalchemy import create_engine, Column, Integer, String, Boolean, Float, Text, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import query
import secrets
from flask_sqlalchemy import SQLAlchemy
import mysql.connector # Connecting to MySQL DB

app = Flask(__name__)
db = SQLAlchemy()

# create a connection to the MySQL server in XAMPP
cnx = mysql.connector.connect(user='pyslarash', password='!FancyPass123$',
                              host='localhost',
                              database='housing_project')
class User(db.Model):
    __tablename__ = 'user'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    profile_pic = db.Column(db.String(255))
    username = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), nullable=False)
    password_hash = db.Column(db.String(255))
    first_name = db.Column(db.String(255))
    last_name = db.Column(db.String(255))
    info = db.Column(db.Text)
    type = db.Column(db.String(50))
    logged_in = db.Column(db.Boolean, default=False)    
    favorites_count = db.relationship("Favorites", lazy='subquery', backref="user_parent", cascade="all,delete-orphan", overlaps="favorites_count,user_parent")

    # Add the query_class attribute to the User class
    query_class = query.Query
    
    def serialize(self):
        return {
            'id': self.id,
            'profile_pic': self.profile_pic,
            'username': self.username,
            'email': self.email,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'info': self.info,
            'type': self.type,
            'favorites_count': len(self.favorites_count)
        }

class CombinedCityData(db.Model):
    __tablename__ = 'combined_city_data'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    city = db.Column(db.String(255), nullable=False)
    state = db.Column(db.String(255), nullable=False)
    city_median_income = db.db.Column(Integer)
    city_crime_violent = db.Column(db.Integer)
    city_crime_property = db.Column(db.Integer)
    city_num_of_brews = db.Column(db.Integer)
    city_one_br_price = db.Column(db.Integer)
    city_two_br_price = db.Column(db.Integer)
    city_is_startup = db.Column(db.String(255))
    city_is_foodie = db.Column(db.String(255))
    cbsa = db.Column(db.Integer)
    metro = db.Column(db.String(255))
    metro_state = db.Column(db.String(255))
    metro_population = db.Column(db.Integer)
    metro_aqi = db.Column(db.Integer)
    metro_one_br_price = db.Column(db.Integer)
    metro_two_br_price = db.Column(db.Integer)
    metro_unemployment = db.Column(db.Float)
    metro_avg_nwi = db.Column(db.Float)
    state_min_wage = db.Column(db.Float)
    mj_legal_status = db.Column(db.String(255))
    mj_medicinal = db.Column(db.String(255))
    mj_decriminalized = db.Column(db.String(255))
    state_one_br_price = db.Column(db.Integer)
    state_two_br_price = db.Column(db.Integer)
    city_population = db.Column(db.Integer)
    city_density = db.Column(db.Float)

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


class Favorites(db.Model):
    __tablename__ = 'favorites'

    user_id = db.Column(db.Integer, ForeignKey('user.id'), primary_key=True)
    city_id = db.Column(db.Integer, ForeignKey('combined_city_data.id'), primary_key=True)

    user = db.relationship('User', backref=db.backref('favorites', overlaps="user_parent"))
    city = db.relationship('CombinedCityData', backref='favorites')
    
    def serialize(self):
        return {
            'city': self.city.serialize()
        }
    
class RevokedToken(db.Model):
    __tablename__ = 'revoked_tokens'

    id = db.Column(db.Integer, primary_key=True)
    jti = db.Column(db.String(120), unique=True, nullable=False)

    def __init__(self, jti):
        self.jti = jti

    @classmethod
    def is_jti_blacklisted(cls, jti):
        query = cls.query.filter_by(jti=jti).first()
        return bool(query)

    def serialize(self):
        return {
            'id': self.id,
            'jti': self.jti
        }

# close the connection
cnx.close()
