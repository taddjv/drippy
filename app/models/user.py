from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    contact_info = db.Column(db.String(255),server_default="*,*,*")
    address = db.Column(db.String(255),server_default="*,*,*,*,*,*")
    credit = db.Column(db.Integer, server_default="5000")
    card = db.Column(db.String(255),server_default="*,*,*")

    shoes = db.relationship("Shoe", back_populates="user",cascade="all, delete-orphan")
    brands = db.relationship("Brand", back_populates="user",cascade="all, delete-orphan")
    cart = db.relationship("Cart", back_populates="user")
    cart_items = db.relationship("CartItem", back_populates="user",cascade="all, delete-orphan")
    reviews = db.relationship("Review", back_populates="user",cascade="all, delete-orphan")



    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email
        }
