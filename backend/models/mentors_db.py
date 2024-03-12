from backend import db
#import uuid
from sqlalchemy import Table
from datetime import datetime
from sqlalchemy.orm import relationship
from sqlalchemy import Column, DateTime, ForeignKey, String
from flask_sqlalchemy import SQLAlchemy
#from backend.models.request import Request
#from backend.models.subjects import Subject, Student_subjects

mentors_subjects = Table('mentor_subjects', db.Model.metadata,
                         db.Column('mentor_id', db.Integer,
                                   db.ForeignKey('mentor.id')),
                         db.Column('subject_id', db.Integer,
                                   db.ForeignKey('Subject_mentor.id')))

class Mentor(db.Model):
    """Defines mentors table"""
    __tablename__ = 'mentor'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    first_name = db.Column(db.String(60), nullable=False)
    surname = db.Column(db.String(60), nullable=False)
    other_names = db.Column(db.String(60), nullable=True)
    password = db.Column(db.String(300), nullable=False)
    authenticated = db.Column(db.Boolean, default=False)
    subjects = db.relationship('Subject_m', secondary=mentors_subjects,
                               back_populates='mentors')
    created_at = db.Column(db.DateTime, nullable=False,
                           default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False,
                           default=datetime.utcnow,
                           onupdate=datetime.utcnow)
    requests = db.relationship('Request', back_populates='mentors', lazy=True)
    years_of_experience = db.Column(db.Integer, nullable=False)
    api_key = db.Column(db.String(120), unique=True, nullable=True)
    
    
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
        other_names = self.other_names or ''
        return f"{first_name} {other_names} {surname}"

    def valid_names(self):
        """Checks if first_name, surname, and other_names are valid."""
        othernames = self.other_names
        firstname = self.first_name
        surname = self.surname

        # Check if firstname and surname are not None before calling isalpha()
        if firstname is not None and surname is not None:
            valid_names = firstname.isalpha() and surname.isalpha()
        else:
            valid_names = False

        if not othernames and valid_names:
            return True
        elif othernames is not None and othernames.isalpha() and valid_names:
            return True
        return False
        
            
    def to_json(self):
        """Returns mentor's details in J
        son format"""
        if not self.valid_names():
            return {}
        
        else:
            fullname = self.mentors_fullname()
            return {
                'fullname': fullname,
                'id': self.id,
                'username': self.username,
                'email': self.email,
                'subjects': self.subjects,
                'is_active': True,
                'years_of_experience': self.years_of_experience,
                'api_key': self.api_key
            }

    def __repr__(self):
        '''string representation of mentor's username'''
        return f'Mentor>>> {self.username}'
    
    
class Subject_m(db.Model):
    """Defines mentors' subject table"""
    __tablename__ = 'Subject_mentor'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    mentors = db.relationship('Mentor', secondary=mentors_subjects,
                                back_populates='subjects')