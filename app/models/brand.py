from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func

class Brand(db.Model):
    __tablename__ = "brands"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(1000), nullable=False)
    description = db.Column(db.String(1000), nullable=False)
    user_id = db.Column(db.Integer,db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    dateCreated = db.Column(db.DateTime(timezone=True), server_default=func.now())

    user = db.relationship("User", back_populates="brands")
    shoes = db.relationship("Shoe", back_populates="brand")
