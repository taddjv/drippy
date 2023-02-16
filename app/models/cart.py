from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func

class Cart(db.Model):
    __tablename__ = "carts"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer,db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    dateCreated = db.Column(db.DateTime(timezone=True), server_default=func.now())

    user = db.relationship("User", back_populates="cart")
    cart_items = db.relationship(("CartItem"), back_populates="cart",cascade="all, delete-orphan")
