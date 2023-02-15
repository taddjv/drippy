from flask import Blueprint, request
from app.models import Shoe, db
from app.forms import AnswerForm
from sqlalchemy import inspect
from flask_login import current_user,login_required

shoe_routes = Blueprint("shoes", __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


def object_as_dict(obj):
    return {c.key: getattr(obj, c.key)
            for c in inspect(obj).mapper.column_attrs}

@shoe_routes.route("/<int:id>", methods=["GET"])
def get_shoe(id):
    shoe = Shoe.query.get(id)
    return object_as_dict(shoe)
