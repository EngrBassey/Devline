""""Defines Mnetor API blueprint"""
from flask import Blueprint, session
from backend import db, login_manager
from backend.models.mentor import Mentor


subject_api_blueprint = Blueprint('subject_m', __name__,
                                  url_prefix='/api/mentor')

mentor_api_blueprint = Blueprint('mentor', __name__,
                                  url_prefix='/api/mentor')

@mentor_api_blueprint.record_once
def on_load(state):
    login_manager.init_app(state.app)
@login_manager.user_loader
def load_user(id):
    type = session.get('type')
    if type != 'student':
        return Mentor.query.filter_by(id=id).first()
    else:
        return None

@login_manager.request_loader
def load_user_from_request(request):
    """Loads User from Request"""
    mentor_id = request.headers.get('Authorization')
    if mentor_id:
        mentor = Mentor.query.filter_by(id=mentor_id).first()
        if mentor:
            return mentor
        return None

from backend.api.mentor import mentor_auth, subject_t_route
