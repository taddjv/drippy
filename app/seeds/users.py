from app.models import db, User, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password')
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password')
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password')
    nike = User(
        username='nike', email='nike@gmail.com', password='password')
    jordan = User(
        username='jordan', email='jordan@gmail.com', password='password')
    adidas = User(
        username='adidas', email='adidas@gmail.com', password='password')
    new_balance = User(
        username='new_balance', email='new_balance@gmail.com', password='password')
    converse = User(
        username='converse', email='converse@gmail.com', password='password')
    vans = User(
        username='vans', email='vans@gmail.com', password='password')

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(nike)
    db.session.add(jordan)
    db.session.add(adidas)
    db.session.add(new_balance)
    db.session.add(converse)
    db.session.add(vans)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")

    db.session.commit()
