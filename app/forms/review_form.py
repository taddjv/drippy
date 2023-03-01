from flask_wtf import FlaskForm
from wtforms import StringField,IntegerField
from wtforms.validators import DataRequired, ValidationError
from app.models import Review

def valid_rating(form,field):
    stars = field.data
    if (stars > 5):
        raise ValidationError("You can only give up to 5 stars.")
    if (stars < 1):
        raise ValidationError("You can't give less than one star.")


class ReviewForm(FlaskForm):
    description = StringField('description', validators=[DataRequired("You must add a description")])
    stars = IntegerField("stars", validators=[DataRequired("You can't give 0 stars"),valid_rating])
