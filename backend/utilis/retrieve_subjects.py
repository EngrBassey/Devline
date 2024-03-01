"""Helper function to create or get
    subject when registering students/mentors"""
from backend.models.subjects import Subject
from backend import db


def get_or_create_subject(subject_name):
    """When registering a new User (student or mentor),
       we need to save the subject the user is interested
       and associate it with the user. This function retrieves the subject ID"""
    subject = Subject.query.filter_by(name=subject_name).first()
    if subject:
        return subject.id
    else:
        new_subject = Subject(name=subject_name)
        db.session.add(new_subject)
        db.session.flush()
        return new_subject.id
