from flask_wtf import FlaskForm
from wtforms import StringField,IntegerField, DecimalField
from wtforms.validators import DataRequired
from flask_login import current_user
from sqlalchemy import inspect
from app.models import CartItem,Cart,User

def object_as_dict(obj):
    return {c.key: getattr(obj, c.key)
            for c in inspect(obj).mapper.column_attrs}


class CartItemForm(FlaskForm):
    shoe_id = StringField('shoe_id', validators=[DataRequired()])
    quantity = IntegerField('quantity', validators=[DataRequired()])
    shoe_size =  DecimalField('shoe_size', validators=[DataRequired()])
