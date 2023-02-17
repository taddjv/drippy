from flask import Blueprint, request
from app.models import Cart,CartItem, db
from app.forms import CartItemForm
from sqlalchemy import inspect
from sqlalchemy.orm import joinedload
from flask_login import current_user, login_required


cart_routes = Blueprint("carts", __name__)


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

def cart_formatter(rows):
    final = {"cart_items":[]}
    for row in rows:
        finalRow = object_as_dict(row)
        finalRow["shoe"] = object_as_dict(row.shoe)
        final["cart_items"].append(finalRow)
    return final

def duplicate_items(id,shoe_id):
    cart = Cart.query.get(id)
    for cart_item in cart.cart_items:
        if str(cart_item.shoe.id) == str(shoe_id):
            print(str(cart_item.shoe.id) == str(shoe_id))
            return False
    return True

@cart_routes.route("/<int:id>", methods=["GET"])
@login_required
def get_cart_items_cart(id):
    cart = Cart.query.get(id)
    if (cart.user_id == current_user.id):
        cart_items = db.session.query(CartItem).filter(CartItem.cart_id.like(id))
        return cart_formatter(cart_items)
    else:
        return {"message": "you do not own this cart"}


@cart_routes.route("/<int:id>", methods=["POST"])
@login_required
def post_cart_item(id):
    form = CartItemForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if (duplicate_items(id,form.data['shoe_id']) == False):
        return {"message": "item already in cart"}

    if form.validate_on_submit():
        cart_item = CartItem(
            shoe_id=form.data['shoe_id'],quantity=form.data['quantity'],cart_id=id,user_id=current_user.id)
        db.session.add(cart_item)
        db.session.commit()
        final = object_as_dict(cart_item)
        final["shoe"] = object_as_dict(cart_item.shoe)
        return final
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400


@cart_routes.route("/cart-item/<int:id>", methods=["PUT"])
@login_required
def put_cart_item(id):
    form = CartItemForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        cart_item = CartItem.query.get(id)
        if cart_item.user_id == current_user.id:
            cart_item.quantity = form.data["quantity"]
            db.session.commit()
            final = object_as_dict(cart_item)
            final["shoe"] = object_as_dict(cart_item.shoe)
            return final
        else:
            return {"message": "You are not allowed to edit this review"}

    return {'errors': validation_errors_to_error_messages(form.errors)}, 400


@cart_routes.route("/cart-item/<int:id>", methods=["DELETE"])
@login_required
def delete_cart_item(id):
    cart_item = CartItem.query.get(id)
    if cart_item.user_id == current_user.id:
        db.session.delete(cart_item)
        db.session.commit()
        return {"message": "cart_item successfully deleted"}
    else:
        return {"message": "you are not the owner of the cart_item"}


@cart_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def clear_cart(id):
    cart = Cart.query.get(id)
    if cart.user_id == current_user.id:
        for cart_item in cart.cart_items:
            db.session.delete(cart_item)
        db.session.commit()
        return {"message": "cart successfully cleared"}
    else:
        return {"message": "you are not the owner of the cart"}
