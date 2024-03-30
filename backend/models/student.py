"""Student Model"""
from datetime import datetime

from flask_login import UserMixin
from backend import db
import uuid
from sqlalchemy.orm import relationship
from sqlalchemy import Column, DateTime, ForeignKey, String, Table
from backend.models.subjects import Subject, Student_subjects
from passlib.hash import sha256_crypt


class Student(UserMixin, db.Model):
    """Student class """
    __tablename__ = 'students'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    subjects = db.relationship('Subject', secondary=Student_subjects,
                               back_populates='students',
                               cascade='all, delete')
    requests = db.relationship('Request', back_populates='students',
                               cascade='all, delete', lazy=True)
    reviews = db.relationship('Review', back_populates='students',
                              cascade='all, delete', lazy=True)
    authenticated = db.Column(db.Boolean, default=False)
    api_key = db.Column(db.String(120), unique=True, nullable=True)
    created_at = db.Column(db.DateTime, nullable=False,
                           default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False,
                           default=datetime.utcnow,
                           onupdate=datetime.utcnow)

    def __init__(self):
        """Initializes Student class"""
        # self.id = str(uuid.uuid4())

    def encode_api_key(self):
        """Encodes student's api key"""
        self.api_key = sha256_crypt.hash(self.username + str(datetime.utcnow))

    def set_password(self, password):
        """Encrypts and sets students password"""
        self.password = sha256_crypt.hash(password)

    def check_password(self, password):
        """Verifies students password"""
        return sha256_crypt.verify(password, self.password)

    def to_json(self):
        """Returns user's details in J
        son format"""
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'subjects': [subject.name for subject in self.subjects],
            'subjects_id':[subject.id for subject in self.subjects],
            'api_key': self.api_key,
            'is_active': True
        }
