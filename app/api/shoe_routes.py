from flask import Blueprint, request
from app.models import Shoe, db ,Review
from app.forms import ShoeForm
from sqlalchemy import inspect
from sqlalchemy.orm import joinedload
from flask_login import current_user, login_required


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


@shoe_routes.route("/<int:id>", methods=["PUT"])
@login_required
def edit_shoe(id):
    form = ShoeForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        shoe = Shoe.query.get(id)
        if shoe.user_id == current_user.id:
            shoe.name = form.data["name"]
            shoe.url = form.data["url"]
            shoe.price = form.data["price"]
            shoe.brand_id = form.data["brand_id"]
            db.session.commit()
            return object_as_dict(shoe)
        else:
            return {"message": "You are not allowed to edit this shoe"}
    return {'errors': validation_errors_to_error_messages(form.errors)}

@shoe_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_shoe(id):
    shoe = Shoe.query.get(id)
    if shoe.user_id == current_user.id:
        db.session.delete(shoe)
        db.session.commit()
        return {"message": "shoe successfully deleted"}
    else:
        return {"message": "you are not the owner of the shoe"}

@shoe_routes.route("/", methods=["GET"])
def get_all_shoes():
    shoes = db.session.query(Shoe).all()
    final = {"shoes":[]}
    for shoe in shoes:
        final_shoe = object_as_dict(shoe)
        final_shoe["reviews"] = shoe.average_reviews()
        final["shoes"].append(final_shoe)
    return final

@shoe_routes.route("/", methods=["POST"])
@login_required
def post_shoe():
    form = ShoeForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        shoe = Shoe(
            name=form.data['name'], url=form.data['url'], price=form.data["price"], user_id=current_user.id,brand_id=form.data["brand_id"])
        db.session.add(shoe)
        db.session.commit()
        return object_as_dict(shoe)
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400
