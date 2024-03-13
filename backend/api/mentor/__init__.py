""""Defines Mnetor API blueprint"""
from flask import Blueprint


mentor_api_blueprint = Blueprint('mentor', __name__,
                                  url_prefix='/api/mentor')
subject_api_blueprint = Blueprint('subject_m', __name__,
                                  url_prefix='/api/mentor')
from backend.api.mentor import mentor_auth, subject_t_route
