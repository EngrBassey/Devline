from datetime import datetime
from backend import db
from sqlalchemy.orm import relationship
from sqlalchemy import Column, String, DateTime, Integer, ForeignKey, Text
# from backend.models.subjects import Subject
from backend.models.student import Student, Subject
from backend.models.mentor import Mentor


class Request(db.Model):
    """Defines the request class"""
    __tablename__ = 'requests'
    id = db.Column(db.Integer, primary_key=True)
    mentor_id = db.Column(db.Integer, db.ForeignKey(
        'mentors.id', ondelete='CASCADE'), nullable=False)
    student_id = db.Column(db.Integer, db.ForeignKey(
        'students.id', ondelete='CASCADE'), nullable=False)
    subject_id = db.Column(db.Integer, db.ForeignKey(
        'subjects.id', ondelete='CASCADE'), nullable=False)
    subjects = db.relationship('Subject',
                            back_populates='requests', cascade='all, delete')
    students = db.relationship(
        'Student', back_populates='requests', cascade='all, delete')
    reviews = db.relationship(
        'Review', back_populates='requests', cascade='all, delete')
    mentors = db.relationship('Mentor',
                           back_populates='requests')
    message = db.Column(db.Text, nullable=False)
    status = db.Column(db.String(50), nullable=False, default='pending')
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    def to_json(self):
        return {
            'id': self.id,
            'mentor': self.mentors.first_name +' ' +  self.mentors.surname,
            'student': self.students.username,
            'subject_id': self.subjects.name,
            'message': self.message,
            'status': self.status,
            'time': str(self.mentors.time_available),
            'created_at': str(self.created_at.strftime('%Y-%m-%d %H:%M:%S'))
        }