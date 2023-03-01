from flask_wtf import FlaskForm
from wtforms import StringField,IntegerField, DecimalField
from wtforms.validators import DataRequired
from app.models import CartItem


class CartItemForm(FlaskForm):
    shoe_id = StringField('shoe_id', validators=[DataRequired()])
    quantity = IntegerField('quantity', validators=[DataRequired()])
    shoe_size =  DecimalField('shoe_size', validators=[DataRequired()])
