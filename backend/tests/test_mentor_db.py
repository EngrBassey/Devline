# test_mentor.py

from ..models.mentors_db import Mentor
from backend import db
import pytest

@pytest.fixture
def new_mentor():
    """Create a new Mentor instance for testing"""
    return Mentor(
        username='john_doe',
        email='john@example.com',
        first_name='John',
        surname='Doe',
        other_names='Michael',
        password='password123',
        authenticated=True,
        api_key='api_key_123',
        years_of_experience=5
    )

@pytest.fixture
def in_valid_mentor():
    return Mentor(
        username='john_doe',
        email='john@example.com',
        first_name="John",
        surname="Doe",
        other_names="S mith",
        password='password123',
        authenticated=True,
        api_key='api_key_123',
        years_of_experience=5
    )
    
def test_invalid_names(in_valid_mentor):
    '''test invalid mentor'''
    assert in_valid_mentor.valid_names() == False
    
def test_valid_names(new_mentor):
    '''test valid mentor'''
    assert new_mentor.valid_names() == True

def test_mentors_fullname(new_mentor):
    """Test the mentors_fullname method"""
    assert new_mentor.mentors_fullname() == 'John Michael Doe'

def test_to_json(new_mentor):
    """Test the to_json method"""
    mentor_json = new_mentor.to_json()
    assert mentor_json['username'] == 'john_doe'
    assert mentor_json['email'] == 'john@example.com'
    assert mentor_json['fullname'] == 'John Michael Doe'
    assert mentor_json['api_key'] == 'api_key_123'
    assert mentor_json['is_active'] == True

def test_string_representation(new_mentor):
    """Test the string representation (__repr__) method"""
    assert repr(new_mentor) == "Mentor>>> john_doe"

def test_valid_username(new_mentor):
    '''Test the valid_username method'''
    assert new_mentor.valid_username("validusername") == "validusername"
    assert new_mentor.valid_username(123) is None
    assert new_mentor.valid_username("invalid username") is None

