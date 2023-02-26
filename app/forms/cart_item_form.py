from flask_wtf import FlaskForm
from wtforms import StringField,IntegerField
from wtforms.validators import DataRequired
from app.models import CartItem


class CartItemForm(FlaskForm):
    shoe_id = StringField('shoe_id', validators=[DataRequired()])
    quantity = IntegerField('quantity', validators=[DataRequired()])
    shoe_size = IntegerField('shoe_size', validators=[DataRequired()])
