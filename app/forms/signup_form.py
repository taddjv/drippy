from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def is_email(form, field):
    email=field.data
    if "@" in email and email.endswith(".com") :
        return
    else:
        raise ValidationError('Not a valid email.')


def valid_username(form,field):
    username=field.data
    if len(username) > 20 or len(username) < 4:
        raise ValidationError('Username must be between 4 and 20 characters.')


def valid_password(form,field):
    password=field.data
    if len(password) < 5:
        raise ValidationError('Password must be at least 6 characters long.')


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')


class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(), username_exists,valid_username])
    email = StringField('email', validators=[DataRequired(), user_exists,is_email])
    password = StringField('password', validators=[DataRequired(),valid_password])
