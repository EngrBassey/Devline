from flask import request, jsonify, make_response
from backend.models.mentor import Mentor
from backend.api.mentor import mentor_api_blueprint
from werkzeug.security import generate_password_hash
from backend import db, login_manager
from werkzeug.security import check_password_hash
# from flask_jwt_extended import create_access_token, create_refresh_token
import validators
from flask_login import current_user, login_required, login_user, logout_user
from backend.models.subjects import Student_subjects, Subject
from backend.utilis.save_image import save_image
from backend.models.request import Request

from backend.utilis.retrieve_subjects import get_or_create_subject


@login_manager.user_loader
def load_user(mentor_id):
    return Mentor.query.filter_by(id=mentor_id).first()


@login_manager.request_loader
def load_user_from_request(request):
    """Loads User from API"""
    api_key = request.headers.get('Authorization')
    if api_key:
        api_key = api_key.replace('Basic ', '', 1)
        mentor = Mentor.query.filter_by(api_key=api_key).first()
        if mentor:
            return mentor
    return None


@mentor_api_blueprint.route('/register', methods=['POST'])
def register_mentor():
    """Registers a new User as Mentor"""
    # Extract data from request

    data = request.json
    if not all(key in data for key in ('username', 'email',
                                       'password', 'first_name',
                                       'surname', 'years_of_experience',
                                       'time_available', 'subjects')):
        return jsonify({'success': False,
                        'message': 'Missing required fields'}), 400

    username = data.get('username')
    email = data.get('email')
    password = data.get('password')
    first_name = data.get('first_name')
    surname = data.get('surname')
    years_of_experience = data.get('years_of_experience')
    time_available = data.get('time_available')
    subjects = data.get('subjects')

    pwd_hash = generate_password_hash(password)
    if 'file' not in request.files:
        # No file uploaded, use default image
        image_path = 'default.jpg'
    else:
        image_path = request.files['file']
    image = save_image(image_path)

    # Create a new Mentor instance
    mentor = Mentor()

    # check if email already exist in the database
    existing_mentor = Mentor.query.filter((Mentor.email == email) |
                                          (Mentor.username ==
                                           username)).first()
    if existing_mentor:
        return jsonify({'success': False, 'message':
                        'Email or Username already exists'}), 409

    # try:
    mentor.username = username,
    mentor.email = email,
    mentor.password = pwd_hash,
    mentor.first_name = first_name,
    mentor.surname = surname,
    mentor.years_of_experience = years_of_experience,
    mentor.time_available = time_available
    mentor.image = image
    # mentor.subjects = subjects

    subject_ids = [get_or_create_subject(subject_name)
                   for subject_name in subjects]
    for subject_id in subject_ids:
        subject = Subject.query.get(subject_id)
        if subject:
            mentor.subjects.append(subject)

    # Save the new mentor instance
    db.session.add(mentor)
    db.session.commit()

    # Return success response
    return jsonify({'success': True, 'message': 'Mentor has been registered successfully'}), 201
    # except Exception as e:
    #     return make_response(jsonify({'success': False, 'message': e}))


@mentor_api_blueprint.route('/login', methods=['POST'])
def login_mentor():
    """Logins in a Mentor"""
    data = request.json
    # Extract email and password from the request
    username = data.get('username')
    password = data.get('password')

    # Validate required fields
    if not all(key in data for key in ('username', 'password')):
        return jsonify({'success': False, 'message':
                        'Missing required fields'}), 400

    # Query the database for the mentor
    mentor = Mentor.query.filter_by(username=username).first()

    # Check if mentor exists and password is correct
    if mentor and check_password_hash(mentor.password, password):
        # Generate API key and update the database
        mentor.encode_api_key()
        db.session.commit()

        # Log in the user
        login_user(mentor)
        return jsonify({'success': True, 'message': 'Login successful',
                        'api_key': mentor.api_key}), 200
    return jsonify({'success': False,
                    'message': 'Invalid email or password'}), 401


@mentor_api_blueprint.route('/logout')
@login_required
def logout_mentor():
    """Logout logged in user"""
    if current_user.is_authenticated:
        logout_user()
    return make_response(jsonify({'success': True,
                                  'message': 'You are now logged out'}))


@mentor_api_blueprint.route('/delete', methods=['DELETE'])
@login_required
def delete_mentor():
    """Delete the a mentor's account"""
    db.session.delete(current_user)
    db.session.commit()
    logout_user()
    return jsonify({'success': True,
                    'message': 'Your Account has been deleted successfully'})

@mentor_api_blueprint.route('/mentors')
def get_mentors():
    """Returns a list of all available mentors"""
    mentors = Mentor.query.all()
    mentors_json = [mentor.to_json() for mentor in mentors]
    return make_response(jsonify(mentors_json))


@mentor_api_blueprint.route('/requests')
@login_required
def get_requests():
    """Retrieves all mentorship requests received by the mentor."""
    if current_user.is_authenticated:
        mentor_id = current_user.id
        requests = Request.query.filter_by(mentor_id=mentor_id).all()
        if requests:
            return make_response(jsonify({'requests':[re.to_json() for re in requests]}))
        return make_response(jsonify([]))
    else:
        return make_response(jsonify({'success': False, 'message': 'You are not logged in'}))


@mentor_api_blueprint.route('/request', methods=['POST'])
@login_required
def get_request():
    """Retrieves detailed information about a specific mentorship request"""
    data = request.json
    print(data)
    request_id = data.get('request_id')
    if not request_id:
        return jsonify({'success': False,
                        'message': 'Missing required fields'}), 400
    if current_user.is_authenticated:
        mentor_id = current_user.id
        request_data = Request.query.filter_by(
            mentor_id=mentor_id, id=request_id).first()
        if request_data:
            return make_response(jsonify({'success': True, 'message': request_data.to_json()}))
        return make_response(jsonify({'success': False, 'message': 'Request does not exist'}))
    else:
        return make_response(jsonify({'success': False, 'message': 'You are not logged in'}))


@mentor_api_blueprint.route('/accept', methods=['POST'])
def accept_request():
    data = request.json
    request_id = data.get('request_id')
    if not request_id:
        return jsonify({'success': False,
                        'message': 'Missing required fields'}), 400
    if current_user.is_authenticated:
        mentor_id = current_user.id
        mentor = Mentor.query.filter_by(id=mentor_id).first()
        request_ = Request.query.filter_by(
            mentor_id=mentor_id, id=request_id).first()
        request_.status = 'active'
        db.session.commit()
        if request_:
            # send_message(request.student_id.email)
            subject_id = request_.subject_id
            student_id = request_.student_id
            student_subject = Student_subjects.insert().values(student_id=student_id, subject_id=subject_id)
            db.session.execute(student_subject)
            db.session.commit()

            return make_response(jsonify({'success': True,
                                        'message': 'You have accepted {} request with {} by {} tomorrow.\
                                        You can reach to {} to reschedule if you are unable at the said time. Thank you'.format(request_.subjects.name, request_.students.username,
                                                                                                                    mentor.time_available, request_.students.username,)}))
        return make_response(jsonify({'success': False, 'message': 'Request does not exist'})), 404
    else:
        return make_response(jsonify({'success': False, 'message': 'You are not logged in'})), 401

@mentor_api_blueprint.route('/request/complete', methods=['POST'])
@login_required
def request_completed():
    """To mark the request completed"""
    request_body = request.json
    request_id = request_body.get('request_id')
    if current_user.is_authenticated:
        if not request_id:
            return jsonify({'success': False, 'message': 'Missing required field: request_id'}), 400

        request_ = Request.query.get(request_id)
        if not request_:
            return jsonify({'success': False, 'message': 'Request not found'}), 404
        if current_user.id == request_.mentor_id:
            request.status = 'completed'
            db.session.commit()
            return jsonify({'success': True, 'message': 'Request marked as completed'}), 200
        else:
                return jsonify({'success': False, 'message': 'You are not authorized to access this Request'}), 403
    else:
        return make_response(jsonify({'success': False, 'message':
                                  'You are not logged in'}), 401)