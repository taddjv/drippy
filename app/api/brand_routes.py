from flask import Blueprint, request
from app.models import Brand, db
from app.forms import BrandForm
from sqlalchemy import inspect
from flask_login import current_user, login_required

brand_routes = Blueprint("brands", __name__)

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

@brand_routes.route("/<int:id>", methods=["GET"])
def get_brand(id):
    brand = Brand.query.get(id)
    return object_as_dict(brand)

@brand_routes.route("/<int:id>", methods=["PUT"])
@login_required
def edit_brand(id):
    form = BrandForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        brand = Brand.query.get(id)
        if brand.user_id == current_user.id:
            brand.name = form.data["name"]
            brand.url = form.data["url"]
            brand.description = form.data["description"]
            db.session.commit()
            return object_as_dict(brand)
        else:
            return {"message": "You are not allowed to edit this brand"}
    return {'errors': validation_errors_to_error_messages(form.errors)}

@brand_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_brand(id):
    brand = Brand.query.get(id)
    if brand.user_id == current_user.id:
        db.session.delete(brand)
        db.session.commit()
        return {"message": "brand successfully deleted"}
    else:
        return {"message": "you are not the owner of the brand"}

@brand_routes.route("/", methods=["GET"])
def get_all_brands():
    brands = db.session.query(Brand).all()
    for brand in brands:
        print(brand.shoes)
    final = {"brands":[object_as_dict(brand) for brand in brands]}
    return final

@brand_routes.route("/top", methods=["GET"])
def get_all_brands_top():
    brands = db.session.query(Brand).all()
    def shoe_count(brnd):
        final_brand = object_as_dict(brnd)
        final_brand["shoe_count"] = len(brnd.shoes)
        return final_brand

    final = {"brands":[shoe_count(brand) for brand in brands]}
    return final

@brand_routes.route("/", methods=["POST"])
@login_required
def post_brand():
    form = BrandForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        brand = Brand(
            name=form.data['name'], url=form.data['url'], description=form.data["description"], user_id=current_user.id)
        db.session.add(brand)
        db.session.commit()
        return object_as_dict(brand)
    return {'errors': validation_errors_to_error_messages(form.errors)}
