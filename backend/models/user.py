from datetime import datetime
from flask_login import UserMixin
from passlib.hash import sha256_crypt
from backend import db

# Define association tables
student_subjects_association = db.Table('student_subjects',
    db.Column('student_id', db.Integer, db.ForeignKey('students.id')),
    db.Column('subject_id', db.Integer, db.ForeignKey('subjects.id'))
)

mentor_subjects_association = db.Table('mentor_subjects',
    db.Column('mentor_id', db.Integer, db.ForeignKey('mentors.id')),
    db.Column('subject_id', db.Integer, db.ForeignKey('subjects.id'))
)

class BaseMixin:
    """Base mixin with common attributes and methods"""
    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)

class Subject(BaseMixin, db.Model):
    """Subject model"""
    __tablename__ = 'subjects'
    name = db.Column(db.String(50), nullable=False)

class User(BaseMixin, UserMixin, db.Model):
    """User mixin for common user attributes and methods"""
    __abstract__ = True
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(300), nullable=False)
    authenticated = db.Column(db.Boolean, default=False)
    api_key = db.Column(db.String(120), unique=True, nullable=True)

    def encode_api_key(self):
        """Encodes user's API key"""
        self.api_key = sha256_crypt.hash(self.username + str(datetime.utcnow))

    def set_password(self, password):
        """Encrypts and sets user's password"""
        self.password = sha256_crypt.hash(password)

    def check_password(self, password):
        """Verifies user's password"""
        return sha256_crypt.verify(password, self.password)

class Mentor(User):
    """Mentor model"""
    __tablename__ = 'mentors'
    first_name = db.Column(db.String(60), nullable=False)
    surname = db.Column(db.String(60), nullable=False)
    years_of_experience = db.Column(db.Integer, nullable=False)
    time_available = db.Column(db.Time)
    image = db.Column(db.String(255), nullable=True)
    subjects = db.relationship('Subject', secondary=mentor_subjects_association, backref='mentors', cascade='all, delete')

    def mentors_fullname(self):
        """Return mentor's full name"""
        return f"{self.first_name} {self.surname}"

class Student(User):
    """Student model"""
    __tablename__ = 'students'
    subjects = db.relationship('Subject', secondary=student_subjects_association, backref='students', cascade='all, delete')

    def __init__(self, *args, **kwargs):
        """Initialize Student instance"""
        super().__init__(*args, **kwargs)
