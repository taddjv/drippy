from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func

class Review(db.Model):
    __tablename__ = "reviews"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String(1000), nullable=False)
    stars = db.Column(db.Integer, nullable=False)
    shoe_id = db.Column(db.Integer,db.ForeignKey(add_prefix_for_prod("shoes.id")), nullable=False)
    user_id = db.Column(db.Integer,db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    dateCreated = db.Column(db.DateTime(timezone=True), server_default=func.now())

    shoe = db.relationship("Shoe", back_populates="reviews")
    user = db.relationship("User", back_populates="reviews")
