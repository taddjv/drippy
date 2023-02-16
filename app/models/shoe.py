from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship, sessionmaker

from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func
import os

# Base = declarative_base()

class Shoe(db.Model):
    __tablename__ = "shoes"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(1000), nullable=False)
    url = db.Column(db.String(1000), nullable=False)
    price = db.Column(db.Integer, nullable=False)
    user_id = db.Column(db.Integer,db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    brand_id = db.Column(db.Integer,db.ForeignKey(add_prefix_for_prod("brands.id")), nullable=False)
    dateCreated = db.Column(db.DateTime(timezone=True), server_default=func.now())

    brand = db.relationship("Brand", back_populates="shoes")
    user = db.relationship("User", back_populates="shoes")
    reviews = db.relationship("Review", back_populates="shoe",cascade="all, delete-orphan")
    cart_item = db.relationship("CartItem", back_populates="shoe")


    def average_reviews(self):
        final = {"star_count":0,
        }
        total_stars = 0
        for review in self.reviews:
            final["star_count"] = final["star_count"] + 1
            total_stars = total_stars + review.stars
        if total_stars > 0:
            final["total_stars"] = total_stars / final["star_count"]
            return final
        else:
            return {
                "star_count": 0,
                "total_stars": 0
            }
