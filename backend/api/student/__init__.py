""""Defines Student API blueprint"""
from flask import Blueprint, session
from flask_login import LoginManager
from backend import login_manager
from backend.models.student import Student

login_manager = LoginManager()
student_api_blueprint = Blueprint('student', __name__,
                                  url_prefix='/api/student')
@student_api_blueprint.record_once
def on_load(state):
    login_manager.init_app(state.app)
@login_manager.user_loader
def load_user(id):
    type = session.get('type')
    if type == 'student':
        return Student.query.filter_by(id=id).first()
    else:
        return None


@login_manager.request_loader
def load_user_from_request(request):
    """Loads User from Request"""

    api_key = request.headers.get('Authorization')
    if api_key:
        # student_id = api_key.replace('Basic ', '', 1)
        student = Student.query.filter_by(id=api_key).first()
        if student:
            return student
        return None

from backend.api.student import routes
