from flask import request, jsonify, make_response
from backend.models.mentors_db import Mentor
from backend.api.student import mentor_api_blueprint
from werkzeug.security import generate_password_hash
#from passlib.hash import sha256_crypt
from backend.models.student import Student
from backend import db
from werkzeug.security import check_password_hash
from flask_jwt_extended import create_access_token, create_refresh_token
import validators

#@app.route('/register', methods=['POST'])
@mentor_api_blueprint.route('/register', methods=['POST'])
def register_mentor():
    # Extract data from request
    data = request.json
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')
    first_name = data.get('first_name')
    surname = data.get('surname')
    other_names = data.get('other_names')
    years_of_experience = data.get('years_of_experience')

    #hash password
    pwd_hash = generate_password_hash(password)
    # Create a new Mentor instance
    mentor = Mentor(
        username = username,
        email = email,
        password = pwd_hash,
        #password = pwd_hash,
        first_name = first_name,
        surname = surname,
        other_names = other_names,
        years_of_experience = years_of_experience
    )
    full_name = mentor.mentors_fullname()
    #validate names
    if not mentor.valid_names():
        return jsonify({'error': ('First name, surname and other' 
                        'names must be alphabets and without whitespaces')
                        }), 400
        #validate username
    if not mentor.valid_username(username):
        return
    jsonify({
        'error': ('username must be more than three characters '
                  'and must contain letters and alphabet')
    }), 400

    #check for valid email
    if not validators.email(email):
        return jsonify({'error': 'email is not valid'}), 400
    
    #check if email already exist in the database
    if mentor.query.filter_by(email=email).first() is not None:
        return jsonify({'error': 'email already exists'}), 409
    
    if mentor.query.filter_by(username=username).first() is not None:
        return jsonify({'error': 'username already exists'}), 409
    
    #years of experience must be a positive number
    if years_of_experience is None\
    or not years_of_experience.isdigit()\
    or int(years_of_experience) < 0:
        return jsonify({'error': 'years of experience must be a positive number'}), 400


    # Save the new mentor instance
    db.session.add(mentor)
    db.session.commit()

    # Return success response
    return jsonify({
        'message': 'mentor created',
        'mentor': {
            'username': username,
            'fullname': full_name,
            'email': email
        }
    }), 201
    
@mentor_api_blueprint.route('/login', methods=['POST'])
def login_mentor():
    email = request.json.get('email', '')
    password = request.json.get('password')
    username = request.json.get('username', '')
    
    mentor_mail = Mentor.query.filter_by(email=email).first()
    mentor_username = Mentor.query.filter_by(username=username).first()
    
    # Check if mentor exists and password is correct
    if mentor_mail and check_password_hash(mentor_mail.password, password):
        refresh = create_refresh_token(identity=mentor_mail.id)
        access = create_access_token(identity=mentor_mail.id)
        return jsonify({
            'Mentor': {
                'refresh token': refresh,
                'access token': access,
                'username': mentor_mail.username,
                'email': mentor_mail.email
            }
        }), 200
    elif mentor_username and check_password_hash(mentor_username.password, password):
        refresh = create_refresh_token(identity=mentor_username.id)
        access = create_access_token(identity=mentor_username.id)
        return jsonify({
            'Mentor': {
                'refresh token': refresh,
                'access token': access,
                'username': mentor_username.username,
                'email': mentor_username.email
            }
        }), 200
    else:
        return jsonify({'error': 'wrong credentials'}), 401
