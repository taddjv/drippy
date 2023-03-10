from flask import Blueprint, request
from app.models import Shoe, db
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
    final = object_as_dict(shoe)
    final["reviews"] = shoe.average_reviews()
    final["brand"] = object_as_dict(shoe.brand)

    return final


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

@shoe_routes.route("/top", methods=["GET"])
def get_fav_shoes():
    shoe1 = Shoe.query.get(1)
    shoe2 = Shoe.query.get(108)
    shoe3 = Shoe.query.get(89)
    return {"shoe1":object_as_dict(shoe1),"shoe2":object_as_dict(shoe2),"shoe3":object_as_dict(shoe3)}


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

@shoe_routes.route("/", methods=["GET"])
def get_all_shoes():
    shoes = db.session.query(Shoe).all()
    final = {"shoes":[]}
    for shoe in shoes:
        final_shoe = object_as_dict(shoe)
        final_shoe["reviews"] = shoe.average_reviews()
        final["shoes"].append(final_shoe)
    return final

@shoe_routes.route("<string:sort>/search/<string:search>/", methods=["GET"])
def search_all_shoes(sort,search):
    searchQuery = None
    if (search == "All"):
        searchQuery = ""
    else:
        searchQuery = search
    price_args = request.args.get("price")
    color_args = request.args.get("color")
    year_args = request.args.get("year")

    search_query = Shoe.name.contains((searchQuery))
    order_query = None

    if sort == "reviews":
        order_query = Shoe.review_count.desc()
    if sort == "expensive":
        order_query = Shoe.price.desc()
    if sort == "cheapest":
        order_query = Shoe.price

    shoes = db.session.query(Shoe).filter(search_query).order_by(order_query)

    if price_args:
        shoes = shoes.filter(Shoe.price.between(price_args.split(",")[0],price_args.split(",")[1]))
    if color_args:
        shoes = shoes.filter(Shoe.colors.contains(color_args))
    if year_args:
        shoes = shoes.filter(Shoe.year == (year_args))

    # shoes = db.session.query(Shoe).filter(search_query,filter_query).order_by(order_query)
    # print(color_args.split(",")[0],"============================")


    # if filter_query:
    # else:
    #     shoes = db.session.query(Shoe).filter(search_query).order_by(order_query)



    final = {"shoes":[]}
    for shoe in shoes:
        final_shoe = object_as_dict(shoe)
        final_shoe["reviews"] = shoe.average_reviews()
        final["shoes"].append(final_shoe)
    return final
