from flask import Blueprint, request
from app.models import User,db
from app.forms import UserForm
from sqlalchemy import inspect
from flask_login import current_user, login_user, logout_user, login_required

user_routes = Blueprint('users', __name__)


def object_as_dict(obj):
    return {c.key: getattr(obj, c.key)
            for c in inspect(obj).mapper.column_attrs}


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>', methods=["PUT"])
@login_required
def edit_user(id):
    form = UserForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        user = User.query.get(id)
        user.username = form.data["username"]
        user.email = form.data["email"]
        user.contact_info = form.data["contact_info"]
        user.address = form.data["address"]
        user.card = form.data["card"]
        user.credit = form.data["credit"]
        db.session.commit()
        final_user = object_as_dict(user)
        del final_user["hashed_password"]
        return final_user
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()
