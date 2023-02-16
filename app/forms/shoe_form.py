from flask_wtf import FlaskForm
from wtforms import StringField,IntegerField
from wtforms.validators import DataRequired, ValidationError
from app.models import Shoe


class ShoeForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    url = StringField('url', validators=[DataRequired()])
    price = IntegerField("price",validators=[DataRequired()] )
    brand_id = IntegerField("brand_id",validators=[DataRequired()] )
