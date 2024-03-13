from flask_login import UserMixin
from backend import db
from datetime import datetime
from sqlalchemy.orm import relationship
from sqlalchemy import Column, DateTime, ForeignKey, String
from passlib.hash import sha256_crypt
# from backend.models.request import Request
from backend.models.subjects import Subject, Mentors_subjects


class Mentor(db.Model, UserMixin):
    """Defines mentors table"""
    __tablename__ = 'mentors'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    first_name = db.Column(db.String(60), nullable=False)
    surname = db.Column(db.String(60), nullable=False)
    # other_names = db.Column(db.String(60), nullable=True)
    password = db.Column(db.String(300), nullable=False)
    authenticated = db.Column(db.Boolean, default=False)
    subjects = db.relationship('Subject', secondary=Mentors_subjects,
                               back_populates='mentors', cascade='all, delete')
    created_at = db.Column(db.DateTime, nullable=False,
                           default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False,
                           default=datetime.utcnow,
                           onupdate=datetime.utcnow)
    requests = db.relationship(
        'Request', back_populates='mentors', cascade='all, delete', lazy=True)
    reviews = db.relationship('Review',
                              back_populates='mentors', cascade='all, delete')
    years_of_experience = db.Column(db.Integer, nullable=False)
    time_available = db.Column(db.Time)
    api_key = db.Column(db.String(120), unique=True, nullable=True)
    image = db.Column(db.String(255), nullable=True)

    def encode_api_key(self):
        """Encodes mentor's api key"""
        self.api_key = sha256_crypt.hash(self.username + str(datetime.utcnow))

    def valid_username(self, username):
        '''checks if username is alphanumeric and without whitespaces'''
        if not isinstance(username, str):
            return None
        if len(username) < 3:
            return None
        elif not username.replace(' ', '').isalnum() or ' ' in username:
            return None
        return username

    def mentors_fullname(self):
        '''mentor's fullname'''
        first_name = self.first_name
        surname = self.surname
        return f"{first_name} {surname}"

    def valid_names(self, firstname, surname):
        """Checks if first_name, surname, and other_names are valid."""

        # Check if firstname and surname are not None before calling isalpha()
        if firstname is not None and surname is not None:
            return firstname.isalpha() and surname.isalpha()
        else:
            return False

    def to_json(self):
        """Returns mentor's details in J
        son format"""
        fullname = self.mentors_fullname()
        return {
            'fullname': fullname,
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'subjects': [subject.name for subject in self.subjects],
            'is_active': True,
            'years_of_experience': self.years_of_experience,
            'api_key': self.api_key
        }

    def __repr__(self):
        '''string representation of mentor's username'''
        return f'Mentor>>> {self.username}'
