"""Subject Model"""
from sqlalchemy import String, Table, Column, Integer, ForeignKey
from backend import db
from sqlalchemy.orm import relationship


Student_subjects = Table('student_subjects', db.Model.metadata,
                         db.Column('student_id', db.Integer,
                                   db.ForeignKey('students.id',
                                                 ondelete='CASCADE')),
                         db.Column('subject_id', db.Integer,
                                   db.ForeignKey('subjects.id',
                                                 ondelete='CASCADE')))

Mentors_subjects = Table('mentor_subjects', db.Model.metadata,
                         db.Column('mentor_id', db.Integer,
                                   db.ForeignKey('mentors.id',
                                                 ondelete='CASCADE')),
                         db.Column('subject_id', db.Integer,
                                   db.ForeignKey('subjects.id',
                                                 ondelete='CASCADE')))


class Subject(db.Model):
    """Defines the students table"""
    __tablename__ = 'subjects'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    students = db.relationship('Student', secondary=Student_subjects,
                               back_populates='subjects',
                               cascade='all, delete')
    mentors = db.relationship('Mentor', secondary=Mentors_subjects,
                              back_populates='subjects', cascade='all, delete')
    requests = db.relationship('Request', back_populates='subjects', lazy=True)
