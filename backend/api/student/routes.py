"""Defines routes for students API"""
from uuid import uuid4
from flask import request, jsonify, make_response, session
from backend.api.student import load_user_from_request, student_api_blueprint
from backend.models.review import Review
from backend.models.student import Student, Subject, Student_subjects
from backend.models.request import Request
# from backend.models.subjects import Subject, Student_subjects
from backend import db, login_manager
from backend.utilis.retrieve_subjects import get_or_create_subject
from backend.utilis.password_reset import send_password_reset_message, \
                                          generate_reset_token
from flask_login import current_user, login_required, login_user, logout_user
import secrets
from flask_mail import Mail, Message
from itsdangerous import TimedSerializer


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
    data = request.json
    # Extract email and password from the request
    username = data.get('username')
    password = data.get('password')

    # Validate required fields
    if not all(key in data for key in ('username', 'password')):
        return jsonify({'success': False, 'message':
                        'Missing required fields'}), 400

    # Query the database for the student
    student = Student.query.filter_by(username=username).first()

    # Check if student exists and password is correct
    if student and student.check_password(password):
        # Generate API key and update the database
        student.encode_api_key()
        db.session.commit()
        # student.authenticated = True
        # db.session.commit()

        # Log in the user
        session.permanent = True
        session['type'] = 'student'
        login_user(student, remember=True)
        return jsonify({'success': True, 'message': 'Login successful',
                        'api_key': student.api_key, 'id': student.id, 'username': student.username}), 200
    return jsonify({'success': False,
                    'message': 'Invalid email or password'}), 401


@student_api_blueprint.route('/logout')

def logout_student():
    """Logout logged in user"""
    if current_user.is_authenticated:
        logout_user()
    return make_response(jsonify({'success': True,
                                  'message': 'You are now logged out'}))



@student_api_blueprint.route('/profile/')
def get_student_profile():
    """Retrieves student's profile Information"""
    current_user = load_user_from_request(request)
    if current_user:
        return make_response(jsonify({'success':True, 'result': current_user.to_json()}))
    return make_response(jsonify({'success': False,
                                  'message': 'You are not logged in'})), 401


@student_api_blueprint.route('/profile', methods=['PUT'])

def update_student_profile():
    """Updates the student profile"""
    request_body = request.json
    student=load_user_from_request(request)
    if student.id:
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
def delete_student():
    """Delete the a student's account"""
    db.session.delete(current_user)
    db.session.commit()
    logout_user()
    return jsonify({'success': True,
                    'message': 'Your Account has been deleted successfully'})


@student_api_blueprint.route('/search/mentors', methods=['POST'])
def search_mentor():
    """Searches for mentors based on specified criteria."""
    from backend.models.mentor import Mentor
    try:
        request_body = request.json
        subject = request_body.get('subject')

        if not subject:
            return jsonify({'success': False,
                            'message': 'Subject name required'}), 400

        mentors = Mentor.query.filter(Mentor.subjects.any(name=subject)).all()

        if mentors:
            mentors_json = [mentor.to_json() for mentor in mentors]
            return jsonify({'success': True, 'mentors':mentors_json, 'message':'Success'}), 200
        else:
            return make_response(jsonify({'success': True, 'message': []}))
    except Exception as e:
        return jsonify({'success': False,
                        'message': 'An error occurred: {}'.format(e)}), 500


@student_api_blueprint.route('/request', methods=['POST'])
def send_mentorship_request():
    """Sends a mentorship request from a student to a mentor."""
    from backend.models.mentor import Mentor
    request_body = request.json
    mentor_id = request_body.get('mentor_id')
    subject = request_body.get('subject')
    message = request_body.get('message')
    # load_user()
    student_id=load_user_from_request(request).id

    if student_id:
        subject = Subject.query.filter_by(name=subject).first()
        if subject:
            subject_id = subject.id

        try:
            new_request = Request()
            new_request.student_id = student_id
            new_request.mentor_id = mentor_id
            new_request.subject_id = subject_id
            new_request.message = message
            # Check if the mentor exists and is qualified for the subject
            mentor = Mentor.query.filter_by(id=mentor_id).first()
            if mentor is None:
                return jsonify({'success': False, 'message': 'Mentor not found'}), 404
            if not any(subject.id == subject_id for subject in mentor.subjects):
                return jsonify({'success': False,
                                'message': 'Mentor is not qualified for the specified subject'}), 400
            db.session.add(new_request)
            db.session.commit()
            return jsonify({'success': True,
                            'message': 'Mentorship request to sent \
                                        Mentor {} sent successfully'.
                            format(new_request.mentors.username)}), 200

        except Exception as e:
            db.session.rollback()
            return jsonify({'success': False, 'message':
                            'An error occurred: {}'.
                            format(e)}), 500
    return make_response(jsonify({'success': False, 'message':
                                  'You are not logged in'}), 401)

@student_api_blueprint.route('/requests')
def get_requests():
    """Retrieves all mentorship requests sent by the student."""
    student=load_user_from_request(request)
    student_id = student.id
    if student_id:
        requests = Request.query.filter_by(student_id=student_id).all()
        if requests:
            return jsonify({'success': True, 'requests': [re.to_json() for re in requests]})
        else:
            return jsonify({'success': True, 'requests': [], 'message': 'No mentorship requests found'})
    else:
        return jsonify({'success': False, 'message': 'You are not logged in'})

def register_new(username, email, password):
    """Helper function to register new student"""
    new_student = Student()
    new_student.username = username,
    new_student.email = email
    new_student.set_password(password)

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
        return jsonify({'success': False,
                        'message': 'Missing email field'}), 404
    student = Student.query.filter_by(email=request_body.get('email')).first()

    if not student:
        return jsonify({'success': False,
                        'message': 'No user found with this email address'}), \
                        404
    secret_key_for_reset_token = secrets.token_hex(32)
    serializer = TimedSerializer(secret_key_for_reset_token)
    reset_token = generate_reset_token(serializer, student.id)
    reset_link = '/reset_password?token={}'.format(reset_token)
    return send_password_reset_message(student, reset_link)


@student_api_blueprint.route('/request/complete', methods=['POST'])
def request_completed():
    """To mark the request completed"""
    request_body = request.json
    request_id = request_body.get('request_id')
    student_id = load_user_from_request(request)
    if student_id:
        if not request_id:
            return jsonify({'success': False, 'message':
                            'Missing required field: request_id'}), \
                             400

        request_ = Request.query.get(request_id)
        if not request_:
            return jsonify({'success': False,
                            'message': 'Request not found'}), 404
        if student_id == request_.student_id:
            request_.status = 'completed'
            db.session.commit()
            return jsonify({'success': True,
                            'message': 'Request marked as completed'}), 200
        else:
            return jsonify({'success': False, 'message':
                            'You are not authorized \
                            to access this Request'}), 403
    else:
        return make_response(jsonify({'success': False, 'message':
                                      'You are not logged in'}), 401)


@student_api_blueprint.route('/review/mentor', methods=['POST'])

def review_mentor():
    data = request.json
    request_id = data.get('request_id')
    rating = data.get('rating')
    review_text = data.get('review_text')
    student = load_user_from_request(request)
    student_id = student.id
    if student_id:
        if not request_id or not rating or not review_text:
            return jsonify({'success': False,
                            'message': 'Missing required fields'}), 400

        # Retrieve the request associated with the request_id
        request_ = Request.query.filter_by(id=request_id).first()

        # Check if the request exists and its status is "completed"
        if request_ and request_.status == 'completed':
            if student_id == request_.student_id:
                # Create a new review
                review = Review()
                review.student_id = student_id,
                review.mentor_id = request_.mentor_id,
                review.request_id = request_id,
                review.rating = rating,
                review.review_text = review_text
                db.session.add(review)
                db.session.commit()

                return jsonify({'success': True, 'message':
                                'Review submitted successfully'}), 200
            else:
                return jsonify({'success': False, 'message':
                                'You are not authorized \
                                to review this mentor'}), 403
        else:
            return jsonify({'success': False, 'message':
                            'The request does not exist or is not completed'}), \
                            404
    else:
        return make_response(jsonify({'success': False, 'message':
                                      'You are not logged in'}), 401)
