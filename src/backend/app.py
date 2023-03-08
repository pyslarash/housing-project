import os
import time
from flask import Flask, request, jsonify, url_for, make_response
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker
from sqlalchemy.exc import OperationalError
from models import User, CombinedCityData, Favorites

app = Flask(__name__)

# Create the engine and session outside the request handler
engine = create_engine('mysql://pyslarash:!FancyPass123$@localhost/housing_project')
Session = sessionmaker(bind=engine)
session = None

# Try to create a test session and test the connection
try:
    session = Session()

    # create a text object representing the SQL query
    query = text('SELECT 1')

    # execute the query using the session and fetch the result
    result = session.execute(query).scalar()

    # check if the query returned a result
    if result is not None:
        print("Database connection successful")
    else:
        print("Error connecting to database")
except Exception as e:
    print("Error connecting to database: ", e)

# Define the endpoint for testing the connection
@app.route('/', methods=['GET'])
def hello_world():
    if session:
        return 'Hello, World!'
    else:
        return "Unable to connect to database", 500

# THIS ENDPOINT SHOWS ALL OF THE USERS
@app.route('/users', methods=['GET'])
def get_users():
    if session:
        users = session.query(User).all()
        serialized_users = [user.serialize() for user in users]
        return jsonify(serialized_users), 200
    else:
        return "Unable to connect to database", 500

# THIS ENDPOINT SHOWS INFO OF A SINGLE USER BY ID OF A USER ID
@app.route('/users/<int:user_id>', methods=['GET'])  
def get_single_user(user_id):
    session = Session()
    user = session.query(User).filter_by(id=user_id).first()
    session.close()

    # Check if the user was found
    if user is None:
        response = make_response(jsonify({'message': 'User not found'}), 404)
        response.headers['Content-Type'] = 'application/json'
        return response

    # Serialize the user data and return it as JSON
    serialized_user = user.serialize()
    return jsonify(serialized_user), 200

# THIS ENDPOINT CREATES A USER
@app.route('/create_user', methods=['POST'])
def create_user():
    if session:
        request_body_user = request.get_json()
        
        # Check if username or email already exist
        existing_user = session.query(User).filter_by(username=request_body_user['username']).first()
        existing_email = session.query(User).filter_by(email=request_body_user['email']).first()
        
        # If username or email already exist, return an error
        if existing_user or existing_email:
            response = make_response(jsonify({'message': 'Username or email already exists'}), 400)
            response.headers['Content-Type'] = 'application/json'
            return response
        
        # If username and email do not exist, create new user
        user_add = User(username=request_body_user["username"], email=request_body_user["email"], password=request_body_user["password"], type=request_body_user["type"])
        session.add(user_add)
        session.commit()
        print(request_body_user)
        return jsonify(request_body_user), 200
    else:
        return "Unable to connect to database", 500

# THIS ENDPOINT DELETES A USER
@app.route('/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    user = User.query.get(user_id)
    if user is None:
        response = make_response(jsonify({'message': 'User not found'}), 404)
        response.headers['Content-Type'] = 'application/json'
        return response
    session.delete(user)
    session.commit()
    return jsonify({'message': 'User deleted successfully'}), 200
    
#THIS IS THE FILTER FOR THE DATABASE
@app.route('/filtered_city_data', methods=['GET'])
def get_filtered_city_data():
    if session:
        # Get the query parameters
        city_median_income_min = request.args.get('city_median_income_min', type=float)
        city_median_income_max = request.args.get('city_median_income_max', type=float)
        city_median_income_null_is_ok = request.args.get('city_median_income_null_is_ok', type=str, default='false')
        city_population_min = request.args.get('city_population_min', type=int)
        city_population_max = request.args.get('city_population_max', type=int)
        city_population_null_is_ok = request.args.get('city_population_null_is_ok', type=str, default='false')
        city_density_min = request.args.get('city_density_min', type=int)
        city_density_max = request.args.get('city_density_max', type=int)
        city_density_null_is_ok = request.args.get('city_density_null_is_ok', type=str, default='false')
        city_crime_violent_min = request.args.get('city_crime_violent_min', type=int)
        city_crime_violent_max = request.args.get('city_crime_violent_max', type=int)
        city_crime_violent_null_is_ok = request.args.get('city_crime_violent_null_is_ok', type=str, default='false')
        city_crime_property_min = request.args.get('city_crime_property_min', type=int)
        city_crime_property_max = request.args.get('city_crime_property_max', type=int)
        city_crime_property_null_is_ok = request.args.get('city_crime_property_null_is_ok', type=str, default='false')
        city_one_br_price_min = request.args.get('city_one_br_price_min', type=int)
        city_one_br_price_max = request.args.get('city_one_br_price_max', type=int)
        city_one_br_price_null_is_ok = request.args.get('city_one_br_price_null_is_ok', type=str, default='false')
        city_two_br_price_min = request.args.get('city_two_br_price_min', type=int)
        city_two_br_price_max = request.args.get('city_two_br_price_max', type=int)
        city_two_br_price_null_is_ok = request.args.get('city_two_br_price_null_is_ok', type=str, default='false')
        city_num_of_brews = request.args.get('city_num_of_brews', type=int)
        city_num_of_brews_null_is_ok = request.args.get('city_num_of_brews_null_is_ok', type=str, default='false')
        city_is_startup = request.args.get('city_is_startup', type=str)
        city_is_foodie = request.args.get('city_is_foodie', type=str)
        metro_population_min = request.args.get('metro_population_min', type=int)
        metro_population_max = request.args.get('metro_population_max', type=int)
        metro_population_null_is_ok = request.args.get('metro_population_null_is_ok', type=str, default='false')
        metro_one_br_price_min = request.args.get('metro_one_br_price_min', type=int)
        metro_one_br_price_max = request.args.get('metro_one_br_price_max', type=int)
        metro_one_br_price_null_is_ok = request.args.get('metro_one_br_price_null_is_ok', type=str, default='false')
        metro_two_br_price_min = request.args.get('metro_two_br_price_min', type=int)
        metro_two_br_price_max = request.args.get('metro_two_br_price_max', type=int)
        metro_two_br_price_null_is_ok = request.args.get('metro_two_br_price_null_is_ok', type=str, default='false')
        metro_unemployment_min = request.args.get('metro_unemployment_min', type=int)
        metro_unemployment_max = request.args.get('metro_unemployment_max', type=int)
        metro_unemployment_null_is_ok = request.args.get('metro_unemployment_null_is_ok', type=str, default='false')
        metro_avg_nwi_min = request.args.get('metro_avg_nwi_min', type=int)
        metro_avg_nwi_max = request.args.get('metro_avg_nwi_max', type=int)
        metro_avg_nwi_null_is_ok = request.args.get('metro_avg_nwi_null_is_ok', type=str, default='false')
        states = request.args.getlist('state')
        state_min_wage_min = request.args.get('state_min_wage_min', type=int)
        state_min_wage_max = request.args.get('state_min_wage_max', type=int)
        state_min_wage_null_is_ok = request.args.get('state_min_wage_null_is_ok', type=str, default='false')
        state_mj_legal_status = request.args.get('state_mj_legal_status', type=str)
        state_mj_legal_status_null_is_ok = request.args.get('state_mj_legal_status_null_is_ok', type=str, default='false')
        state_mj_medicinal = request.args.get('state_mj_medicinal', type=str)
        state_mj_medicinal_null_is_ok = request.args.get('state_mj_medicinal_null_is_ok', type=str, default='false')
        state_mj_decriminalized = request.args.get('state_mj_decriminalized', type=str)
        state_mj_decriminalized_null_is_ok = request.args.get('state_mj_decriminalized_null_is_ok', type=str, default='false')
        state_one_br_price_min = request.args.get('state_one_br_price_min', type=int)
        state_one_br_price_max = request.args.get('state_one_br_price_max', type=int)
        state_one_br_price_null_is_ok = request.args.get('state_one_br_price_null_is_ok', type=str, default='false')
        state_two_br_price_min = request.args.get('state_two_br_price_min', type=int)
        state_two_br_price_max = request.args.get('state_two_br_price_max', type=int)
        state_two_br_price_null_is_ok = request.args.get('state_two_br_price_null_is_ok', type=str, default='false')
        
        # Build the query based on the input parameters
        query = session.query(CombinedCityData)#.limit(10)
        if city_median_income_min:
            if city_median_income_null_is_ok.lower() == 'true':
                query = query.filter(
                    (CombinedCityData.city_median_income.between(city_median_income_min, city_median_income_max)) | (CombinedCityData.city_median_income.is_(None))
                )
            else:
                query = query.filter(
                    CombinedCityData.city_median_income.between(city_median_income_min, city_median_income_max),
                    CombinedCityData.city_median_income.isnot(None)
                )
        if city_population_min:
            if city_population_null_is_ok.lower() == 'true':
                query = query.filter(
                    (CombinedCityData.city_population.between(city_population_min, city_population_max)) | (CombinedCityData.city_population.is_(None))
                )
            else:
                query = query.filter(
                    CombinedCityData.city_population.between(city_population_min, city_population_max),
                    CombinedCityData.city_population.isnot(None)
                )
        if city_density_min:
            if city_density_null_is_ok.lower() == 'true':
                query = query.filter(
                    (CombinedCityData.city_density.between(city_density_min, city_density_max)) | (CombinedCityData.city_density.is_(None))
                )
            else:
                query = query.filter(
                    CombinedCityData.city_density.between(city_density_min, city_density_max),
                    CombinedCityData.city_density.isnot(None)
                )
        if city_crime_violent_min:
            if city_crime_violent_null_is_ok.lower() == 'true':
                query = query.filter(
                    (CombinedCityData.city_crime_violent.between(city_crime_violent_min, city_crime_violent_max)) | (CombinedCityData.city_crime_violent.is_(None))
                )
            else:
                query = query.filter(
                    CombinedCityData.city_crime_violent.between(city_crime_violent_min, city_crime_violent_max), 
                    CombinedCityData.city_crime_violent.isnot(None)
                )
        if city_crime_property_min:
            if city_crime_property_null_is_ok.lower() == 'true':
                query = query.filter(
                    (CombinedCityData.city_crime_property.between(city_crime_property_min, city_crime_property_max)) | (CombinedCityData.city_crime_property.is_(None))
                )
            else:
                query = query.filter(
                    CombinedCityData.city_crime_property.between(city_crime_property_min, city_crime_property_max), 
                    CombinedCityData.city_crime_property.isnot(None)
                )
        if city_one_br_price_min:
            if city_one_br_price_null_is_ok.lower() == 'true':
                query = query.filter(
                    (CombinedCityData.city_one_br_price.between(city_one_br_price_min, city_one_br_price_max)) | (CombinedCityData.city_one_br_price.is_(None))
                )
            else:
                query = query.filter(
                    CombinedCityData.city_one_br_price.between(city_one_br_price_min, city_one_br_price_max), 
                    CombinedCityData.city_one_br_price.isnot(None)
                )
        if city_two_br_price_min:
            if city_two_br_price_null_is_ok.lower() == 'true':
                query = query.filter(
                    (CombinedCityData.city_two_br_price.between(city_two_br_price_min, city_two_br_price_max)) | (CombinedCityData.city_two_br_price.is_(None))
                )
            else:
                query = query.filter(
                    CombinedCityData.city_two_br_price.between(city_two_br_price_min, city_two_br_price_max), 
                    CombinedCityData.city_two_br_price.isnot(None)
                )
        if city_num_of_brews:
            if city_num_of_brews_null_is_ok.lower() == 'true':
                query = query.filter(
                    (CombinedCityData.city_num_of_brews == city_num_of_brews) | (CombinedCityData.city_num_of_brews.is_(None))
                )
            else:
                query = query.filter(
                    CombinedCityData.city_num_of_brews == city_num_of_brews, 
                    CombinedCityData.city_num_of_brews.isnot(None)
                )
        if city_is_startup:
            if city_is_startup.lower() == 'true':
                query = query.filter(CombinedCityData.city_is_startup == 'YES')
            else:
                query = query.filter(CombinedCityData.city_is_startup == 'NO')
        if city_is_foodie:
            if city_is_foodie.lower() == 'true':
                query = query.filter(CombinedCityData.city_is_foodie == 'YES')
            else:
                query = query.filter(CombinedCityData.city_is_foodie == 'NO')
        if metro_population_min:
            if metro_population_null_is_ok.lower() == 'true':
                query = query.filter(
                    (CombinedCityData.metro_population_price.between(metro_population_min, metro_population_max)) | (CombinedCityData.metro_population.is_(None))
                )
            else:
                query = query.filter(
                    CombinedCityData.metro_population.between(metro_population_min, metro_population_max),
                    CombinedCityData.metro_population.isnot(None)
                )
        if metro_one_br_price_min:
            if metro_one_br_price_null_is_ok.lower() == 'true':
                query = query.filter(
                    (CombinedCityData.metro_one_br_price.between(metro_one_br_price_min, metro_one_br_price_max)) | (CombinedCityData.metro_one_br_price.is_(None))
                )
            else:
                query = query.filter(
                    CombinedCityData.metro_one_br_price.between(metro_one_br_price_min, metro_one_br_price_max),
                                    CombinedCityData.metro_one_br_price.isnot(None)
                )
        if metro_two_br_price_min:
            if metro_two_br_price_null_is_ok.lower() == 'true':
                query = query.filter(
                    (CombinedCityData.metro_two_br_price.between(metro_two_br_price_min, metro_two_br_price_max)) | (CombinedCityData.metro_two_br_price.is_(None))
                )
            else:
                query = query.filter(
                    CombinedCityData.metro_two_br_price.between(metro_two_br_price_min, metro_two_br_price_max),
                    CombinedCityData.metro_two_br_price.isnot(None)
                )
        if metro_unemployment_min:
            if metro_unemployment_null_is_ok.lower() == 'true':
                query = query.filter(
                    (CombinedCityData.metro_unemployment.between(metro_unemployment_min, metro_unemployment_max)) | (CombinedCityData.metro_unemployment.is_(None))
                )
            else:
                query = query.filter(
                    CombinedCityData.metro_unemployment.between(metro_unemployment_min, metro_unemployment_max),
                    CombinedCityData.metro_unemployment.isnot(None)
                )
        if metro_avg_nwi_min:
            if metro_avg_nwi_null_is_ok.lower() == 'true':
                query = query.filter(
                    (CombinedCityData.metro_avg_nwi.between(metro_avg_nwi_min, metro_avg_nwi_max)) | (CombinedCityData.metro_avg_nwi.is_(None))
                )
            else:
                query = query.filter(
                    CombinedCityData.metro_avg_nwi.between(metro_avg_nwi_min, metro_avg_nwi_max),
                    CombinedCityData.metro_avg_nwi.isnot(None)
                )
        if states:
            query = query.filter(CombinedCityData.state.in_(states))
        if state_min_wage_min:
            if state_min_wage_null_is_ok.lower() == 'true':
                query = query.filter(
                    (CombinedCityData.state_min_wage.between(state_min_wage_min, state_min_wage_max)) | (CombinedCityData.state_min_wage.is_(None))
                )
            else:
                query = query.filter(
                    CombinedCityData.state_min_wage.between(state_min_wage_min, state_min_wage_max),
                    CombinedCityData.state_min_wage.isnot(None)
                )
        if state_mj_legal_status:
            if state_mj_legal_status_null_is_ok.lower() == 'true':
                query = query.filter(
                    (CombinedCityData.mj_legal_status == state_mj_legal_status) | (CombinedCityData.mj_legal_status.is_(None))
                )
            else:
                query = query.filter(
                    CombinedCityData.mj_legal_status == state_mj_legal_status,
                    CombinedCityData.mj_legal_status.isnot(None)
                )
        if state_mj_medicinal:
            if state_mj_medicinal_null_is_ok.lower() == 'true':
                query = query.filter(
                    (CombinedCityData.mj_medicinal == state_mj_medicinal) | (CombinedCityData.mj_medicinal.is_(None))
                )
            else:
                query = query.filter(
                    CombinedCityData.mj_medicinal == state_mj_medicinal,
                    CombinedCityData.mj_medicinal.isnot(None)
                )
        if state_mj_decriminalized:
            if state_mj_decriminalized_null_is_ok.lower() == 'true':
                query = query.filter(
                    (CombinedCityData.mj_decriminalized == state_mj_decriminalized) | (CombinedCityData.mj_decriminalized.is_(None))
                )
            else:
                query = query.filter(
                    CombinedCityData.mj_decriminalized == state_mj_decriminalized,
                    CombinedCityData.mj_decriminalized.isnot(None)
                )
        if state_one_br_price_min:
            if state_one_br_price_null_is_ok.lower() == 'true':
                query = query.filter(
                    (CombinedCityData.state_one_br_price.between(state_one_br_price_min, state_one_br_price_max)) | (CombinedCityData.state_one_br_price.is_(None))
                )
            else:
                query = query.filter(
                    CombinedCityData.state_one_br_price.between(state_one_br_price_min, state_one_br_price_max),
                    CombinedCityData.state_one_br_price.isnot(None)
                )
        if state_two_br_price_min:
            if state_two_br_price_null_is_ok.lower() == 'true':
                query = query.filter(
                    (CombinedCityData.state_two_br_price.between(state_two_br_price_min, state_two_br_price_max)) | (CombinedCityData.state_two_br_price.is_(None))
                )
            else:
                query = query.filter(
                    CombinedCityData.state_two_br_price.between(state_two_br_price_min, state_two_br_price_max),
                    CombinedCityData.state_two_br_price.isnot(None)
                )

        # Returning the results
        combined_city_data = query.all()

        # Serialize the data and return it as JSON
        serialized_data = [city.serialize() for city in combined_city_data]
        return jsonify(serialized_data), 200

    else:
        return "Unable to connect to database", 500

    
if __name__ == '__main__':
    app.run(debug=True) #running in debug to track changes
