"""Defines routes for students API"""
from uuid import uuid4
from flask import request, jsonify, make_response
from backend.api.student import student_api_blueprint
from backend.models.student import Student, Subject, Student_subjects
from backend.models.request import Request
from backend.models.mentors_db import Mentor
#from backend.models.subjects import Subject, Student_subjects
from backend import db, login_manager
from backend.utilis.retrieve_subjects import get_or_create_subject
from backend.utilis.password_reset import send_password_reset_message, generate_reset_token
from flask_login import current_user, login_required, login_user, logout_user
import secrets
from flask_mail import Mail, Message
from itsdangerous import TimedSerializer

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
    # subjects = request_body.get('subjects')

    # Validate required fields
    if not all(key in request_body for key in ('username', 'email',
                                               'password')):
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
    register_new(username, email, password)
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


@login_required
@student_api_blueprint.route('/profile/')
def get_student_profile():
    """Retrieves student's profile Information"""
    if current_user.is_authenticated:
        student_subjects = [subject.name for subject in current_user.subjects]
        student_profile = {
            'username': current_user.username,
            'email': current_user.email,
            'subjects of interest': student_subjects,
            'date_joined': current_user.created_at
        }
        return make_response(jsonify({'result': student_profile}))
    return make_response(jsonify({'success': False,
                                  'message': 'You are not logged in'}))


@student_api_blueprint.route('/profile/', methods=['PUT'])
@login_required
def update_student_profile():
    """Updates the student profile"""
    request_body = request.json
    if current_user.is_authenticated:
        if request_body.get('username'):
            current_user.username = request_body.get('username')
        if request_body.get('email'):
            current_user.email = request_body.get('email')
        db.session.commit()
        return jsonify({'success': True, 'message':
                        'Your Profile has been updated successfully'}), 200
    return make_response(jsonify({'success': False, 'message':
                         'You are not logged in'}))


@student_api_blueprint.route('/delete', methods=['DELETE'])
@login_required
def delete_student():
    """Delete the a student's account"""
    db.session.delete(current_user)
    db.session.commit()
    logout_user()
    return jsonify({'success': True,
                    'message': 'Your Account has been deleted successfully'})


@student_api_blueprint.route('/search/mentors')
def search_mentor():
    """Searches for mentors based on specified criteria."""
    try:
        request_body = request.json
        subject = request_body.get('subject')

        if subject:
            mentors = Mentor.query.filter(Mentor.subjects.contains([subject]))
            mentors_json = [{
                "mentorId": mentor.id,
                "username": mentor.username,
                "subjects": mentor.subjects,
                "time_available": mentor.time_available
            } for mentor in mentors]

            return jsonify(mentors_json), 200
        else:
            return make_response(jsonify({'success': False, 'message':[]}))
    except Exception as e:
        return jsonify({'success': False,
                        'message': 'An error occurred: {}'.format(e)}), 500


@student_api_blueprint.route('/request', methods=['POST'])
@login_required
def send_mentorship_request():
    """Sends a mentorship request from a student to a mentor."""
    if current_user.is_authenticated:
        try:
            request_body = request.json
            new_request = Request()
            new_request.student_id = current_user.id
            new_request.mentor_id = request_body.get('mentor_id')
            new_request.subject_id = request_body.get('subject_id')
            new_request.message = request_body.get('message')

            db.session.add(new_request)
            db.session.commit()
            return jsonify({'success': True,
                            'message': 'Mentorship request to sent Mentor {} sent successfully'.
                            format(new_request.mentors.username)}), 200

        except Exception as e:
            db.session.rollback()
            return jsonify({'success': False, 'message':
                            'An error occurred: {}'.
                            format(e)}), 500
    return make_response(jsonify({'success': False, 'message':
                                  'You are not logged in'}))


def register_new(username, email, password):
    """Helper function to register new student"""
    new_student = Student()
    new_student.username = username,
    new_student.email = email
    new_student.set_password(password)
    print(new_student)

    # subject_ids = [get_or_create_subject(subject_name)
    #                for subject_name in subjects]
    # for subject_id in subject_ids:
    #     subject = Subject.query.get(subject_id)
    #     if subject:
    #         new_student.subjects.append(subject)
    db.session.add(new_student)
    db.session.commit()


@student_api_blueprint.route('/reset-password-message', methods=['POST'])
def initialize_password_reset():
    """Initiates password reset for a student."""
    request_body = request.json

    if 'email' not in request_body:
        return jsonify({'success': False, 'message': 'Missing email field'}), 404
    student = Student.query.filter_by(email=request_body.get('email')).first()

    if not student:
        return jsonify({'success': False, 'message': 'No user found with this email address'}), 404
    secret_key_for_reset_token = secrets.token_hex(32)
    serializer = TimedSerializer(secret_key_for_reset_token)
    reset_token = generate_reset_token(serializer, student.id)
    reset_link = '/reset_password?token={}'.format(reset_token)
    return send_password_reset_message(student, reset_link)
