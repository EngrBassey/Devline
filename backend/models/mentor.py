from sqlalchemy import Column, Integer, String
from backend import db
# from backend.models.mentor import Mentor


class Mentor(db.Model):
    """Mentor class"""
    __tablename__ = 'mentors'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(60), nullable=False)
    requests = db.relationship('Request', back_populates='mentors', lazy=True)
