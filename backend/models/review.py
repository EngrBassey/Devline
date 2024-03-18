# Import necessary modules
from datetime import datetime
from sqlalchemy import CheckConstraint, Column, Integer, \
                        String, Text, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from backend import db

# Define the Review model


class Review(db.Model):
    """Defines the Review class"""
    __tablename__ = 'reviews'
    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey(
        'students.id', ondelete='CASCADE'), nullable=False)
    mentor_id = db.Column(db.Integer, ForeignKey(
        'mentors.id', ondelete='CASCADE'), nullable=False)
    request_id = db.Column(db.Integer, ForeignKey(
        'requests.id', ondelete='CASCADE'), nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    review_text = db.Column(db.Text, nullable=True)
    created_at = db.Column(db.DateTime, nullable=False,
                           default=datetime.utcnow)

    __table_args__ = (
        db.CheckConstraint('rating >= 1 AND rating <= 5', name='check_rating'),
    )
    # Define relationships
    students = db.relationship('Student', back_populates='reviews',
                               cascade='all, delete', lazy=True)
    mentors = db.relationship('Mentor', back_populates='reviews',
                              cascade='all, delete', lazy=True)
    requests = db.relationship('Request', back_populates='reviews',
                               cascade='all, delete', lazy=True)

    def __repr__(self):
        return "Review(student_id={},mentor_id={}, rating={}"\
            .format(self.student_id, self.mentor_id, self.rating)
