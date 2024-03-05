from datetime import datetime
from backend import db
from sqlalchemy.orm import relationship
from sqlalchemy import Column, String, DateTime, Integer, ForeignKey, Text
from backend.models.subjects import Subject
from backend.models.student import Student
from backend.models.mentor import Mentor


class Request(db.Model):
    """Defines the request class"""
    __tablename__ = 'requests'
    id = Column(Integer, primary_key=True)
    mentor_id = Column(Integer, ForeignKey('mentors.id'), nullable=False)
    student_id = Column(String(60), ForeignKey('students.id'), nullable=False)
    subject_id = Column(Integer, ForeignKey('subjects.id'), nullable=False)
    subjects = relationship('Subject',
                            back_populates='requests')
    students = relationship('Student', back_populates='requests')
    mentors = relationship('Mentor',
                            back_populates='requests')
    message = Column(Text, nullable=False)
    status = Column(String(50), nullable=False, default='pending')
    created_at = Column(DateTime, nullable=False, default=datetime.utcnow)
