from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func

class CartItem(db.Model):
    __tablename__ = "cartItems"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    quantity = db.Column(db.Integer, nullable=False)
    shoe_size = db.Column(db.Numeric(2,1), nullable=False)
    shoe_id = db.Column(db.Integer,db.ForeignKey(add_prefix_for_prod("shoes.id")), nullable=False)
    cart_id = db.Column(db.Integer,db.ForeignKey(add_prefix_for_prod("carts.id")), nullable=False)
    user_id = db.Column(db.Integer,db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    dateCreated = db.Column(db.DateTime(timezone=True), server_default=func.now())

    shoe = db.relationship("Shoe", back_populates="cart_item")
    cart = db.relationship("Cart", back_populates="cart_items")
    user = db.relationship("User", back_populates="cart_items")


    def duplicate_item(self,cart_items):
        for shoe in cart_items:
            if str(shoe.shoe_id) == str(self.shoe_id):
                if float(self.shoe_size) == shoe.shoe_size:
                    return True

        return False
