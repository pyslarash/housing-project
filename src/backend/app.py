
import os
from dotenv import load_dotenv
from sqlalchemy_utils import database_exists, create_database
from sqlalchemy import create_engine
from datetime import datetime
from jwt.exceptions import ExpiredSignatureError

# Load environment variables from .env file
load_dotenv()

# Database information
db_username = os.environ.get('ENV_DB_USER')
db_password = os.environ.get('ENV_DB_PASSWORD')
db_host = os.environ.get('ENV_DB_HOST')
db_name = os.environ.get('ENV_DB_DATABASE')

db_uri = f"mysql://{db_username}:{db_password}@{db_host}"

# Create the engine and session outside the request handler
engine = create_engine(f'{db_uri}/{db_name}', echo=True)

if not database_exists(engine.url):
    create_database(engine.url)

from flask import Flask, request, jsonify, make_response, request
from sqlalchemy import text, func, select
from sqlalchemy.orm import sessionmaker
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity, get_jwt
from jwt.exceptions import ExpiredSignatureError
from jwt_config import configure_jwt
from werkzeug.security import generate_password_hash, check_password_hash
from models import db, User, Favorites, CombinedCityData, RevokedToken
from datetime import timedelta
from flask_cors import CORS
from flask_cors import cross_origin
from flask_migrate import Migrate
from flask_mailing import Mail, Message

app = Flask(__name__)
# db = SQLAlchemy(app)
CORS(app) # This enables CORS for all routes
CORS(app, resources={r"/*": {"origins": "*"}})
app.config['SQLALCHEMY_DATABASE_URI'] = f"mysql://{db_username}:{db_password}@{db_host}/{db_name}"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)
configure_jwt(app)

Session = sessionmaker(bind=engine)
session = None

with app.app_context():
    db.create_all()

migrate = Migrate(app, db)

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
@cross_origin()
def hello_world():
    if session:
        return 'Hello, World!'
    else:
        return "Unable to connect to database", 500

# THIS ENDPOINT CREATES A USER
@app.route('/create_user', methods=['POST', 'OPTIONS'])
@cross_origin()
def create_user():
    if request.method == 'OPTIONS':
        # Handle pre-flight request
        response = make_response()
        response.headers.add('Access-Control-Allow-Methods', 'POST')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response

    # Handle POST request as usual
    request_body_user = request.get_json()

    try:
        # Start a new database session
        session = Session()

        # Check if username or email already exist
        existing_user = session.query(User).filter_by(username=request_body_user['username']).first()
        existing_email = session.query(User).filter_by(email=request_body_user['email']).first()

        # If username or email already exist, return an error
        if existing_user or existing_email:
            response = make_response(jsonify({'message': 'Username or email already exists'}), 400)
            response.headers['Content-Type'] = 'application/json'
            response.headers.add('Access-Control-Allow-Methods', 'POST')
            response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
            response.headers.add('Access-Control-Allow-Origin', '*')
            return response

        # If username and email do not exist, create new user
        password_hash = generate_password_hash(request_body_user["password"])
        user_add = User(username=request_body_user["username"], email=request_body_user["email"], password_hash=password_hash, type=request_body_user["type"], logged_in=True)
        session.add(user_add)
        session.commit()

        # Create access token for the newly created user with a 1 hour expiration time
        access_token = create_access_token(identity={'id': user_add.id, 'type': user_add.type}, expires_delta=timedelta(hours=1))

        # Return the access token and user data in JSON format
        return jsonify({'access_token': access_token, 'user': user_add.serialize()}), 200

    except Exception as e:
        # If an error occurs, rollback the session and return an error response
        session.rollback()
        response = make_response(jsonify({'message': str(e)}), 500)
        response.headers['Content-Type'] = 'application/json'
        return response

    finally:
        # Close the session
        session.close()

# THIS ENDPOINT ALLOWS FOR A USER TO LOGIN
@app.route('/login', methods=['POST'])
@cross_origin()
def login():
    if request.method == 'OPTIONS':
        # Handle pre-flight request
        response = make_response()
        response.headers.add('Access-Control-Allow-Methods', 'POST')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response

    request_body_user = request.get_json()

    # Check if username exists
    existing_user = User.query.filter_by(username=request_body_user['username']).first()

    # If username does not exist, return an error
    if not existing_user:
        print("Error: Invalid username.")
        response = make_response(jsonify({'message': 'Invalid username or password'}), 401)
        response.headers['Content-Type'] = 'application/json'
        response.headers.add('Access-Control-Allow-Methods', 'POST')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response

    # Check if the user is already logged in
    if existing_user.logged_in:
        print("Error: User already logged in.")
        response = make_response(jsonify({'message': 'User has been logged in already'}), 401)
        response.headers['Content-Type'] = 'application/json'
        response.headers['WWW-Authenticate'] = 'Bearer error="already_logged_in", error_description="User has been logged in already"'
        response.headers.add('Access-Control-Allow-Methods', 'POST')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response

    # Check if the password is correct
    if not check_password_hash(existing_user.password_hash, request_body_user['password']):
        print("Error: Invalid password.")
        response = make_response(jsonify({'message': 'Invalid username or password'}), 401)
        response.headers['Content-Type'] = 'application/json'
        response.headers['WWW-Authenticate'] = 'Bearer error="invalid_credentials", error_description="Invalid username or password"'
        response.headers.add('Access-Control-Allow-Methods', 'POST')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response

    # Update user's logged_in status
    existing_user.logged_in = True
    db.session.commit()

    try:
        # Create access token for the logged in user with a 1 hour expiration time
        access_token = create_access_token(identity={'id': existing_user.id, 'type': existing_user.type},
                                           expires_delta=timedelta(hours=1))

        # Return the access token and user data in JSON format
        return jsonify({'access_token': access_token, 'user': existing_user.serialize()}), 200

    except ExpiredSignatureError:
        # If the token is expired, update the user's logged_in status to False
        existing_user.logged_in = False
        db.session.commit()

        response = make_response(jsonify({'message': 'Token expired. Please log in again.'}), 401)
        response.headers['Content-Type'] = 'application/json'
        response.headers.add('Access-Control-Allow-Methods', 'POST')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response

# Initialize JWT Manager
jwt = JWTManager(app)

# THIS ENDPOINT ALLOWS FOR A USER TO LOGOUT
@app.route('/logout', methods=['POST'])
@jwt_required()
def logout():
    current_user = get_jwt_identity()
    jti = get_jwt()['jti']

    # Check if the authenticated user exists
    if current_user is None:
        response = make_response(jsonify({'message': 'User not found'}), 404)
        response.headers['Content-Type'] = 'application/json'
        return response

    # Update user's logged_in status to False
    existing_user = User.query.filter_by(id=current_user['id']).first()
    existing_user.logged_in = False
    db.session.commit()

    try:
        # Revoke access token and refresh token
        revoked_token = RevokedToken(jti=jti)
        db.session.add(revoked_token)
        db.session.commit()

        response = make_response(jsonify({'message': 'Logged out successfully'}), 200)
        response.headers['Content-Type'] = 'application/json'
        return response

    except:
        response = make_response(jsonify({'message': 'Failed to logout. Please try again later.'}), 500)
        response.headers['Content-Type'] = 'application/json'
        return response

# THIS END POINT DELETES A USER AND ALL THEIR FAVORITES
@app.route('/users/<int:user_id>', methods=['DELETE'])
@jwt_required()
def delete_user(user_id):
    current_user = get_jwt_identity()

    # Check if the authenticated user exists
    if current_user is None:
        response = make_response(jsonify({'message': 'User not found'}), 404)
        response.headers['Content-Type'] = 'application/json'
        return response

    # Check if the authenticated user is an admin
    if current_user.get('type') == 'admin':
        # If the authenticated user is an admin, allow them to delete any user by ID
        user = session.query(User).filter_by(id=user_id).first()
        if not user:
            response = make_response(jsonify({'message': 'User not found'}), 404)
            response.headers['Content-Type'] = 'application/json'
            return response

        # Delete all the user's favorites
        favorites = session.query(Favorites).filter_by(user_id=user_id).all()
        for favorite in favorites:
            session.delete(favorite)

        # Delete the user
        session.delete(user)
        session.commit()

        # Return a response indicating success
        response = make_response(jsonify({'message': 'User deleted successfully'}), 200)
        response.headers['Content-Type'] = 'application/json'
        return response
    else:
        # If the authenticated user is not an admin, only allow them to delete their own account
        if str(current_user.get('id')) != str(user_id):
            response = make_response(jsonify({'message': 'You are not authorized to delete this user'}), 403)
            response.headers['Content-Type'] = 'application/json'
            return response

        # Delete all the user's favorites
        favorites = session.query(Favorites).filter_by(user_id=user_id).all()
        for favorite in favorites:
            session.delete(favorite)

        # Delete the user
        user = session.query(User).filter_by(id=user_id).first()
        session.delete(user)
        session.commit()

        # Return a response indicating success
        response = make_response(jsonify({'message': 'User deleted successfully'}), 200)
        response.headers['Content-Type'] = 'application/json'
        return response

# THIS ENDPOINT UPDATES A USER
@app.route('/users/<int:user_id>', methods=['PUT'])
@jwt_required()
def update_user(user_id):
    current_user = get_jwt_identity()

    # Check if the authenticated user exists
    if current_user is None:
        response = make_response(jsonify({'message': 'User not found'}), 404)
        response.headers['Content-Type'] = 'application/json'
        return response

    # Check if the authenticated user is trying to update their own account
    if current_user.get('id') != user_id:
        response = make_response(jsonify({'message': 'You are not authorized to update this user'}), 403)
        response.headers['Content-Type'] = 'application/json'
        return response

    # Get the user from the database
    user = session.query(User).filter_by(id=user_id).first()

    # Check if the user exists
    if user is None:
        response = make_response(jsonify({'message': 'User not found'}), 404)
        response.headers['Content-Type'] = 'application/json'
        return response

    # Get the updated user data from the request body
    request_body_user = request.get_json()

    # Check if the updated username or email already exist
    existing_user = session.query(User).filter(User.username == request_body_user.get('username'), User.id != user_id).first()
    existing_email = session.query(User).filter(User.email == request_body_user.get('email'), User.id != user_id).first()

    # If username or email already exist for another user, return an error
    if existing_user or existing_email:
        response = make_response(jsonify({'message': 'Username or email already exists for another user'}), 400)
        response.headers['Content-Type'] = 'application/json'
        return response

    # Update the user's data
    user.profile_pic = request_body_user.get('profile_pic', user.profile_pic)
    user.username = request_body_user.get('username', user.username)
    user.email = request_body_user.get('email', user.email)
    if request_body_user.get('password'):
        user.password_hash = generate_password_hash(request_body_user.get('password'), method='sha256')
    user.first_name = request_body_user.get('first_name', user.first_name)
    user.last_name = request_body_user.get('last_name', user.last_name)
    user.info = request_body_user.get('info', user.info)
    user.type = request_body_user.get('type', user.type)

    # Commit the changes to the database
    try:
        session.commit()
    except:
        session.rollback()
        response = make_response(jsonify({'message': 'Error: Could not update user. Please try again later.'}), 500)
        response.headers['Content-Type'] = 'application/json'
        return response

    # Return the updated user data
    serialized_user = user.serialize()
    return jsonify(serialized_user), 200

# get the absolute path from the .env file
absolute_path = os.getenv('ABSOLUTE_PATH')

#THIS ENDPOINT UPDATES PROFILE PHOTO
@app.route('/upload', methods=['POST'])
def upload():
    try:
        file = request.files['file']
        filename = request.form.get('filename')
        print(f"Received file: {file}")
        print(f"Filename: {filename}")
        file.save(os.path.join(absolute_path, filename))
        print(f"File saved to: {absolute_path}/{filename}")
        return 'File uploaded successfully.'
    except Exception as e:
        session.rollback()
        print(f"Error: {str(e)}")
        return str(e), 500
    
# THIS END POINT ADDS A CITY TO A USER'S FAVORITES
@app.route('/users/<int:user_id>/favorites/<int:city_id>', methods=['POST'])
@jwt_required()
def add_city_to_favorites(user_id, city_id):
    current_user = get_jwt_identity()

    # Check if the authenticated user exists
    if current_user is None:
        response = make_response(jsonify({'message': 'User not found'}), 404)
        response.headers['Content-Type'] = 'application/json'
        return response

    # Check if the authenticated user is adding a favorite to their own account of someone else's
    if current_user.get('id') != user_id:
        response = make_response(jsonify({'message': 'You are not authorized to add a favorite to this user'}), 403)
        response.headers['Content-Type'] = 'application/json'
        return response

    try:
        # Check if the user and city exist
        user = session.query(User).filter_by(id=user_id).first()
        city = session.query(CombinedCityData).filter_by(id=city_id).first()
        if not user:
            response = make_response(jsonify({'message': 'User not found'}), 404)
            response.headers['Content-Type'] = 'application/json'
            return response
        if not city:
            response = make_response(jsonify({'message': 'City not found'}), 404)
            response.headers['Content-Type'] = 'application/json'
            return response

        # Check if the city is already in the user's favorites
        favorite = session.query(Favorites).filter_by(user_id=user_id, city_id=city_id).first()
        if favorite:
            response = make_response(jsonify({'message': 'City already in favorites'}), 400)
            response.headers['Content-Type'] = 'application/json'
            return response

        # Add the city to the user's favorites
        favorite = Favorites(user_id=user_id, city_id=city_id)
        session.add(favorite)
        session.commit()

        # Return a response indicating success
        response = make_response(jsonify({'message': 'City added to favorites'}), 201)
        response.headers['Content-Type'] = 'application/json'
        return response

    except Exception as e:
        session.rollback()
        response = make_response(jsonify({'message': str(e)}), 500)
        response.headers['Content-Type'] = 'application/json'
        return response


# THIS END POINT REMOVES A CITY FROM A USER'S FAVORITES
@app.route('/users/<int:user_id>/favorites/<int:city_id>', methods=['DELETE'])
@jwt_required()
def remove_city_from_favorites(user_id, city_id):
    current_user = get_jwt_identity()

    if session:
        # Check if the user and city exist
        user = session.query(User).filter_by(id=user_id).first()
        city = session.query(CombinedCityData).filter_by(id=city_id).first()
        if not user:
            response = make_response(jsonify({'message': 'User not found'}), 404)
            response.headers['Content-Type'] = 'application/json'
            return response
        if not city:
            response = make_response(jsonify({'message': 'City not found'}), 404)
            response.headers['Content-Type'] = 'application/json'
            return response

        # Check if the authenticated user is deleting a favorite from their own account of someone else's
        if current_user.get('id') != user_id:
            response = make_response(jsonify({'message': 'You are not authorized to remove a favorite from this user'}), 403)
            response.headers['Content-Type'] = 'application/json'
            return response

        try:
            # Check if the city is in the user's favorites
            if city_id not in [favorite.city_id for favorite in user.favorites]:
                response = make_response(jsonify({'message': 'City not in favorites'}), 400)
                response.headers['Content-Type'] = 'application/json'
                return response

            # Remove the city from the user's favorites
            favorite = session.query(Favorites).filter_by(user_id=user_id, city_id=city_id).first()
            session.delete(favorite)
            session.commit()

            # Return a response indicating success
            response = make_response(jsonify({'message': 'City removed from favorites'}), 200)
            response.headers['Content-Type'] = 'application/json'
            return response

        except Exception as e:
            session.rollback()
            return "Failed to remove city from favorites. Error: {}".format(e), 500

    else:
        return "Unable to connect to database", 500

# THIS ENDPOINT SHOWS INFO OF ALL THE USERS (TO ADMINS ONLY)
@app.route('/users', methods=['GET'])
@jwt_required()
def get_users():
    current_user = get_jwt_identity()
    user_type = current_user.get('type')

    # Check if the authenticated user is an admin
    if user_type == 'admin':
        users = session.query(User).all()
        serialized_users = [user.serialize() for user in users]
        return jsonify(serialized_users), 200

    # If the user is not an admin, return an error
    response = make_response(jsonify({'message': 'You are not authorized to view all users'}), 403)
    response.headers['Content-Type'] = 'application/json'
    return response

# THIS ENDPOINT SHOWS INFO OF A SINGLE USER BY ID OF A USER ID
@app.route('/users/<int:user_id>', methods=['GET'])
@jwt_required()
def get_single_user(user_id):
    current_user = get_jwt_identity()

    # Check if the authenticated user exists
    if current_user is None:
        response = make_response(jsonify({'message': 'User not found'}), 404)
        response.headers['Content-Type'] = 'application/json'
        return response

    # Check if the authenticated user is an admin or the user being accessed
    if current_user.get('type') == 'admin' or str(current_user.get('id')) == str(user_id):
        # Allow admins or the user being accessed to view the user's information
        with Session() as session:
            user = session.query(User).filter_by(id=user_id).first()
            if user is None:
                response = make_response(jsonify({'message': 'User not found'}), 404)
                response.headers['Content-Type'] = 'application/json'
                return response
            else:
                serialized_user = user.serialize()
                return jsonify(serialized_user), 200
    else:
        # If the authenticated user is not an admin or the user being accessed, deny access
        response = make_response(jsonify({'message': 'You are not authorized to view this user'}), 403)
        response.headers['Content-Type'] = 'application/json'
        return response

    
# GET ALL FAVORITES FOR A USER
@app.route('/users/<int:user_id>/favorites', methods=['GET'])
@jwt_required()
def get_user_favorites(user_id):
    current_user = get_jwt_identity()

    try:
        # Check if the authenticated user exists
        if current_user is None:
            response = make_response(jsonify({'message': 'User not found'}), 404)
            response.headers['Content-Type'] = 'application/json'
            return response

        # Check if the authenticated user is an admin
        if current_user.get('type') == 'admin':
            # If the authenticated user is an admin, allow them to view any user's favorites by ID
            favorites = session.query(Favorites).filter_by(user_id=user_id).all()
            serialized_favorites = [favorite.serialize() for favorite in favorites]
            return jsonify(serialized_favorites), 200
        else:
            # If the authenticated user is not an admin, only allow them to view their own favorites
            if str(current_user.get('id')) != str(user_id):
                response = make_response(jsonify({'message': 'You are not authorized to view this user\'s favorites'}), 403)
                response.headers['Content-Type'] = 'application/json'
                return response

            # Get all the user's favorites
            favorites = session.query(Favorites).filter_by(user_id=user_id).all()

            # Serialize the favorites data and return it as JSON
            serialized_favorites = [favorite.serialize() for favorite in favorites]
            return jsonify(serialized_favorites), 200

    except Exception as e:
        session.rollback()
        return jsonify({'error': 'Something went wrong. Please try again later.'}), 500

    finally:
        session.close()

    
# GET A FAVORITE FOR A USER
@app.route('/users/<int:user_id>/favorites/<int:city_id>', methods=['GET'])
@jwt_required()
def get_user_favorite(user_id, city_id):
    current_user = get_jwt_identity()

    if session:
        try:
            # Check if the authenticated user exists
            if current_user is None:
                response = make_response(jsonify({'message': 'User not found'}), 404)
                response.headers['Content-Type'] = 'application/json'
                return response

            # Check if the authenticated user is an admin
            if current_user.get('type') == 'admin':
                # If the authenticated user is an admin, allow them to view any user's favorites by ID
                favorite = session.query(Favorites).filter_by(user_id=user_id, city_id=city_id).first()
                if favorite:
                    return jsonify(favorite.serialize()), 200
                else:
                    response = make_response(jsonify({'message': 'Favorite not found'}), 404)
                    response.headers['Content-Type'] = 'application/json'
                    return response
            else:
                # If the authenticated user is not an admin, only allow them to view their own favorites
                if str(current_user.get('id')) != str(user_id):
                    response = make_response(jsonify({'message': 'You are not authorized to view this user\'s favorites'}), 403)
                    response.headers['Content-Type'] = 'application/json'
                    return response

                # Get the user's favorite with the given city ID
                favorite = session.query(Favorites).filter_by(user_id=user_id, city_id=city_id).first()
                if favorite:
                    return jsonify(favorite.serialize()), 200
                else:
                    response = make_response(jsonify({'message': 'Favorite not found'}), 404)
                    response.headers['Content-Type'] = 'application/json'
                    return response
        except:
            session.rollback()
            raise
        finally:
            session.close()
    else:
        return "Unable to connect to database", 500
    
#THIS API END POINT GETS A CITY BY ID
@app.route('/city_data/<int:id>')
def get_city_data(id):
    city_data = CombinedCityData.query.filter_by(id=id).first()

    if not city_data:
        return jsonify({'error': 'City data not found.'}), 404

    return jsonify(city_data.serialize())

#THIS IS THE FILTER FOR THE DATABASE
@app.route('/filtered_city_data', methods=['GET'])
def get_filtered_city_data():
    if session:
        try:
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
            metro_aqi_min = request.args.get('metro_aqi_min', type=int)
            metro_aqi_max = request.args.get('metro_aqi_max', type=int)
            metro_aqi_null_is_ok = request.args.get('metro_aqi_null_is_ok', type=str, default='false')
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
                        (CombinedCityData.city_num_of_brews >= city_num_of_brews) | (CombinedCityData.city_num_of_brews.is_(None))
                    )
                else:
                    query = query.filter(
                        CombinedCityData.city_num_of_brews >= city_num_of_brews, 
                        CombinedCityData.city_num_of_brews.isnot(None)
                    )
            if city_is_startup:
                if city_is_startup.upper() == 'TRUE':
                    query = query.filter(CombinedCityData.city_is_startup == 'TRUE', CombinedCityData.city_is_startup.isnot(None))
            if city_is_foodie:
                if city_is_foodie.upper() == 'TRUE':
                    query = query.filter(CombinedCityData.city_is_foodie == 'TRUE', CombinedCityData.city_is_foodie.isnot(None))
            if metro_population_min:
                if metro_population_null_is_ok.lower() == 'true':
                    query = query.filter(
                        (CombinedCityData.metro_population.between(metro_population_min, metro_population_max)) | (CombinedCityData.metro_population.is_(None))
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
            if metro_aqi_min:
                if metro_aqi_null_is_ok.lower() == 'true':
                    query = query.filter(
                        (CombinedCityData.metro_aqi.between(metro_aqi_min, metro_aqi_max)) | (CombinedCityData.metro_aqi.is_(None))
                    )
                else:
                    query = query.filter(
                        CombinedCityData.metro_aqi.between(metro_aqi_min, metro_aqi_max),
                        CombinedCityData.metro_aqi.isnot(None)
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
    
        except Exception as e:
                session.rollback()
                return f"Error: {str(e)}", 500

    else:
        return "Unable to connect to database", 500
    
# HERE WE ARE GETTING THE COLUMN STATS
@app.route('/column_review', methods=['GET'])
def get_column_stats():
    try:
        if session:
            # Get the query parameters
            column_name = request.args.get('column_name')
            min_val = None
            max_val = None
            null_values_exist = None

            # Check if the column name is valid
            if hasattr(CombinedCityData, column_name):
                # Get the minimum value
                min_val = session.query(func.min(getattr(CombinedCityData, column_name))).scalar()

                # Get the maximum value
                max_val = session.query(func.max(getattr(CombinedCityData, column_name))).scalar()

                # Check if there are null values
                null_values_exist = session.query(CombinedCityData).filter(getattr(CombinedCityData, column_name) == None).count() > 0

            # Return the results
            result = {'column_name': column_name, 'min_value': min_val, 'max_value': max_val, 'null_values_exist': null_values_exist}
            session.commit()
            return jsonify(result), 200

        else:
            return "Unable to connect to database", 500
    except:
        session.rollback()
        return "Error occurred while retrieving column stats", 500
    
# Getting all of the values from a certain column
@app.route('/column_values', methods=['GET'])
def get_column_values():
    try:
        # Get the column name from the query parameter
        column_name = request.args.get('column_name')

        # Select distinct values from the column using SQLalchemy
        stmt = select(getattr(CombinedCityData, column_name)).distinct()
        results = session.execute(stmt).fetchall()

        # Convert results to a list of values
        values = [row[0] for row in results]

        # Return the values as a JSON response
        return jsonify(values=values), 200
    except:
        session.rollback()
        return "Error getting column values", 500

# THIS FUNCTION VERIFIES GOOGLE RECAPTCHA

@app.route('/verify-recaptcha', methods=['POST'])
def verify_recaptcha():
    token = request.json['token']
    try:
        idinfo = id_token.verify_oauth2_token(token, requests.Request(), 
                        os.environ.get('ENV_RECAPTCHA_SITE_KEY'))
        if idinfo['iss'] not in ['accounts.google.com', 'https://accounts.google.com']:
            raise ValueError('Wrong issuer.')
        # ID token is valid. Return success.
        return jsonify(success=True)
    except ValueError:
        # Invalid token
        return jsonify(success=False), 400

# THIS FUNCTION IS SENDING AN EMAIL

app.config['MAIL_USERNAME'] = os.environ.get('ENV_SENDER_EMAIL')
app.config['MAIL_PASSWORD'] = os.environ.get('ENV_SENDER_PASSWORD')
app.config['MAIL_PORT'] = os.environ.get('ENV_SMTP_PORT')
app.config['MAIL_SERVER'] = os.environ.get('ENV_SMTP_SERVER')
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True
app.config['USE_CREDENTIALS'] = True
app.config['VALIDATE_CERTS'] = True
app.config['MAIL_DEFAULT_SENDER'] = os.environ.get('ENV_SENDER_EMAIL')

mail = Mail(app)

async def send_email(name, email, message):
    body = f"Name: {name}\nEmail: {email}\nMessage: {message}"
    msg = Message(subject=os.environ.get('ENV_SUBJECT'), recipients=[os.environ.get('ENV_RECEIVER_EMAIL')])
    msg.body = body
    msg.reply_to = [email]
    await mail.send_message(msg)
    return {'message': 'Email sent successfully'}

@app.route('/contact', methods=['POST'])
async def contact():
    name = request.json.get('name')
    email = request.json.get('email')
    message = request.json.get('message')
    
    if not all([name, email, message]):
        return jsonify({'message': 'All fields are required'}), 400
    
    result = await send_email(name, email, message)
    
    return jsonify(result), 200

if __name__ == '__main__':
    app.run(debug=True) #running in debug to track changes