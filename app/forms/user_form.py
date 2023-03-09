from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User
from flask_login import current_user
from sqlalchemy import inspect
def object_as_dict(obj):
    return {c.key: getattr(obj, c.key)
            for c in inspect(obj).mapper.column_attrs}


def is_email(form, field):
    email=field.data
    if "@" in email  :
        return
    else:
        raise ValidationError('Not a valid email.')


def valid_username(form,field):
    username=field.data
    if len(username) > 20 or len(username) < 4:
        raise ValidationError('Username must be between 4 and 20 characters.')

def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if current_user.email == email:
        return
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use

    username = field.data
    user = User.query.filter(User.username == username).first()

    if current_user.username == username:
        return
    if user:
        raise ValidationError('Username is already in use.')

class UserForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(), username_exists,valid_username])
    email = StringField('email', validators=[DataRequired(), user_exists,is_email])
    contact_info = StringField('contact_info', validators=[DataRequired()])
    address = StringField('address', validators=[DataRequired()])
    card = StringField('card', validators=[DataRequired()])
    credit = StringField('credit', validators=[DataRequired()])
