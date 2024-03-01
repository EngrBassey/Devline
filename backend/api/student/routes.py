"""Defines routes for students API"""
from uuid import uuid4
from flask import request, jsonify, make_response
from backend.api.student import student_api_blueprint
from backend.models.student import Student
from backend.models.request import Request
from backend.models.mentor import Mentor
from backend.models.subjects import Subject, Student_subjects
from backend import db, login_manager
from backend.utilis.retrieve_subjects import get_or_create_subject
from flask_login import current_user, login_required, login_user, logout_user


@login_manager.user_loader
def load_user(student_id):
    return Student.query.filter_by(id=student_id).first()


@login_manager.request_loader
def load_user_from_request(request):
    """Loads User from API"""
    api_key = request.headers.get('Authorization')
    if api_key:
        api_key = api_key.replace('Basic ', '', 1)
        student = Student.query.filter_by(api_key=api_key).first()
        if student:
            return student
    return None


@student_api_blueprint.route('/register', methods=['POST'])
def register_student():
    """Registers a new user as Student"""
    request_body = request.json

    # Extracts data from request
    email = request_body.get('email')
    username = request_body.get('username')
    password = request_body.get('password')
    subjects = request_body.get('subjects')

    # Validate required fields
    if not all(key in request_body for key in ('username', 'email',
                                               'password', 'subjects')):
        return jsonify({'success': False,
                        'message': 'Missing required fields'}), 400

    # Checks if username or email already exists
    existing_student = Student.query.filter((Student.email == email) |
                                            (Student.username ==
                                             username)).first()
    if existing_student:
        return jsonify({'success': False, 'message':
                        'Email or Username already exists'}), 409

    # Create a new student
    register_new(username, email, password, subjects)
    return jsonify({'success': True, 'message': 'Registered successfully'})


@student_api_blueprint.route('/login', methods=['POST'])
def login_student():
    """Logins in a student"""
    request_body = request.json

    # Extract email and password from the request
    email = request_body.get('email')
    password = request_body.get('password')

    # Validate required fields
    if not all(key in request_body for key in ('email', 'password')):
        return jsonify({'success': False, 'message':
                        'Missing required fields'}), 400

    # Query the database for the student
    student = Student.query.filter_by(email=email).first()

    # Check if student exists and password is correct
    if student and student.check_password(password):
        # Generate API key and update the database
        student.encode_api_key()
        db.session.commit()

        # Log in the user
        login_user(student)
        return jsonify({'success': True, 'message': 'Login successful'}), 200
    return jsonify({'success': False,
                    'message': 'Invalid email or password'}), 401


@student_api_blueprint.route('/logout')
@login_required
def logout_student():
    """Logout logged in user"""
    if current_user.is_authenticated:
        logout_user()
    return make_response(jsonify({'success': True,
                                  'message': 'You are now logged out'}))


def register_new(username, email, password, subjects):
    """Helper function to register new student"""
    new_student = Student()
    new_student.username = username,
    new_student.email = email
    new_student.set_password(password)
    print(new_student)

    subject_ids = [get_or_create_subject(subject_name)
                   for subject_name in subjects]
    for subject_id in subject_ids:
        subject = Subject.query.get(subject_id)
        if subject:
            new_student.subjects.append(subject)
    db.session.add(new_student)
    db.session.commit()
