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


def cart_item_formatter(cart_item):
    final =  object_as_dict(cart_item)
    final["shoe"] = object_as_dict(cart_item.shoe)

    return final

@cart_routes.route("/<int:id>", methods=["GET"])
@login_required
def get_cart_items_cart(id):
    cart = Cart.query.get(id)
    if (cart.user_id == current_user.id):
        final = object_as_dict(cart)
        final["cart_items"] = [cart_item_formatter(item) for item in cart.cart_items  ]
        return final

    else:
        return {"message": "you do not own this cart"}


@cart_routes.route("/<int:id>", methods=["POST"])
@login_required
def post_cart_item(id):
    form = CartItemForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    cart_item_size = db.session.query(CartItem).filter(CartItem.shoe_size.like(str(form.data['shoe_size'])))
    cart_item_id = db.session.query(CartItem).filter(CartItem.shoe_id.like(form.data['shoe_id']))

    for item in cart_item_size:
        for cart_item in cart_item_id:
            if (item.id == cart_item.id):
                raise ValueError('A very specific bad thing happened.')


    if form.validate_on_submit():
        cart_item = CartItem(
            shoe_id=form.data['shoe_id'],quantity=form.data['quantity'],shoe_size=form.data['shoe_size'],cart_id=id,user_id=current_user.id)
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
