from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func

class Shoe(db.Model):
    __tablename__ = "shoes"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(1000), nullable=False)
    description = db.Column(db.String(1000), nullable=False)
    user_id = db.Column(db.Integer,db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    brand_id = db.Column(db.Integer,db.ForeignKey(add_prefix_for_prod("brands.id")), nullable=False)
    dateCreated = db.Column(db.DateTime(timezone=True), server_default=func.now())

    brand = db.relationship("Brand", back_populates="shoes")
    user = db.relationship("User", back_populates="shoes")
    reviews = db.relationship("Review", back_populates="shoe")
    cart_item = db.relationship("CartItem", back_populates="shoe")
