from app.models import db, Review, environment, SCHEMA
import random


# Adds a demo user, you can add other users here if you want
def seed_reviews():
    reviews = ["these are greaT", "they're cool", "they're ok to me", "i don't like it but wtv"]

    for x in range(21):
        number_of_reviews = random.randint(1, 4)
        for review_number in range(number_of_reviews):
            random_user = random.randint(1,3)
            random_stars = random.randint(1,5)
            review = Review(description=reviews[review_number - 1], stars=random_stars, shoe_id=(x + 1),user_id=random_user)
            db.session.add(review)

    db.session.commit()



def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM reviews")

    db.session.commit()
