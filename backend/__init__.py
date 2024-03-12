"""Initializes the application"""
import os
from backend import config
from flask import Flask
from flask_cors import CORS
from flask_login import LoginManager
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager

db = SQLAlchemy()
login_manager = LoginManager()


def create_app():
    """"Creates an instance of the app"""

    # Flask initialization and configuration setup
    app = Flask(__name__)
    environment_config = os.environ['ENVIRONMENT_CONFIGURATION']
    app.config.from_object(environment_config)

    db.init_app(app)
    login_manager.init_app(app)
    JWTManager(app)

    # global strict slashes
    app.url_map.strict_slashes = False

    # Cross-Origin Resource Sharing
    cors = CORS(app, resources={r"/*": {"origins": "0.0.0.0"}})

    with app.app_context():
        # Register blueprints
        from backend.api.student import student_api_blueprint, mentor_api_blueprint, subject_api_blueprint

        app.register_blueprint(student_api_blueprint)
        app.register_blueprint(mentor_api_blueprint)
        app.register_blueprint(subject_api_blueprint)
        return app
