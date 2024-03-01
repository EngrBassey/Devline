""""Defines Student API blueprint"""
from flask import Blueprint


student_api_blueprint = Blueprint('student', __name__,
                                  url_prefix='/api/student')
from backend.api.student import routes
