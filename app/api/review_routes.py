from flask import Blueprint, request
from app.models import Review, db
from app.forms import ReviewForm
from sqlalchemy import inspect
from sqlalchemy.orm import joinedload
from flask_login import current_user, login_required


review_routes = Blueprint("reviews", __name__)


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



@review_routes.route("/shoes/<int:id>", methods=["GET"])
def get_reviews_shoe(id):
    reviews = db.session.query(Review).filter(Review.shoe_id.like(id))

    return {"reviews": [object_as_dict(review) for review in reviews]}


@review_routes.route("/shoes/<int:id>", methods=["POST"])
@login_required
def post_review(id):
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        review = Review(
            description=form.data['description'], stars=form.data['stars'], shoe_id=id, user_id=current_user.id)
        db.session.add(review)
        db.session.commit()
        return object_as_dict(review)
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400

@review_routes.route("/<int:id>", methods=["PUT"])
@login_required
def edit_review(id):
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        review = Review.query.get(id)
        if review.user_id == current_user.id:
            review.description = form.data["description"]
            review.stars = form.data["stars"]
            db.session.commit()
            return object_as_dict(review)
        else:
            return {"message": "You are not allowed to edit this review"}
    return {'errors': validation_errors_to_error_messages(form.errors)}

@review_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_review(id):
    review = Review.query.get(id)
    if review.user_id == current_user.id:
        db.session.delete(review)
        db.session.commit()
        return {"message": "review successfully deleted"}
    else:
        return {"message": "you are not the owner of the review"}
