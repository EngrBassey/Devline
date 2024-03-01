"""Defines Project Configuration"""
import os
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, scoped_session

# Get .env path
env_path = os.path.join(os.path.dirname(__file__), '.env')

# Load .env if it exists
if os.path.exists(env_path):
    load_dotenv(env_path)


class Config():
    """Base configuration class"""
    SECRET_KEY = os.getenv('SECRET_KEY', 'your_default_secret_key')
    SQLALCHEMY_TRACK_MODIFICATION = False
    MAIL_SERVER = ''
    MAIL_PORT = 587
    MAIL_USE_TLS = False
    MAIL_USERNAME = 'mail@example.com'
    MAIL_PASSWORD = ''
    MAIL_DEFAULT_SENDER = 'mail@example.com'


class DevConfig(Config):
    """Configuration for Development Environment"""
    ENV = 'Development'
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = os.getenv('DEV_DATABASE_URL')


class TestConfig(Config):
    """Configuration for Testing Environment"""
    ENV = 'Testing'
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = os.getenv('TEST_DATABASE_URL')


class ProdConfig(Config):
    """Configuration for Production Environment"""
    ENV = 'Production'
    DEBUG = False
    SQLALCHEMY_DATABASE_URI = os.getenv('PROD_DATABASE_URL')
