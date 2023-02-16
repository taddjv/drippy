from app.models import db, Brand, environment, SCHEMA


def seed_brands():

    nike = Brand(
        name='nike', description="The world's largest athletic apparel company, Nike is best known for its footwear, apparel, and equipment. Founded in 1964 as Blue Ribbon Sports, the company became Nike in 1971 after the Greek goddess of victory. One of the most valuable brands among sport businesses, Nike employs over 76,000 people worldwide.", url="https://static.nike.com/a/images/f_jpg,q_auto:eco/61b4738b-e1e1-4786-8f6c-26aa0008e80b/swoosh-logo-black.png", user_id=4)
    jordan = Brand(
        name='jordan', description="Air Jordan is a line of basketball shoes and athletic apparel produced by American corporation Nike, Inc. The first Air Jordan shoe was produced for Hall of Fame former basketball player Michael Jordan during his time with the Chicago Bulls in late 1984 and released to the public on April 1, 1985. The shoes were designed for Nike by Peter Moore, Tinker Hatfield, and Bruce Kilgore.",url="https://assets.stickpng.com/images/584292c4a6515b1e0ad75aca.png", user_id=5)
    adidas = Brand(
        name='adidas', description="adidas AG (adidas) designs, manufactures and markets athletic and sports lifestyle products. The company's product portfolio includes footwear, apparel and accessories such as bags, sun glasses, fitness equipment, and balls.", url="https://www.freepnglogos.com/uploads/adidas-logo-photo-png-3.png", user_id=6)
    new_balance = Brand(
        name='new_balance', description="New Balance Athletics, Inc. (NB), best known as simply New Balance, is one of the world's major sports footwear and apparel manufacturers. Based in Boston, Massachusetts, the multinational corporation was founded in 1906 as the New Balance Arch Support Company.", url="https://logos-world.net/wp-content/uploads/2020/09/New-Balance-Logo-1972-2006.png", user_id=7)
    converse = Brand(
        name='converse', description="Converse is an American lifestyle brand that markets, distributes, and licenses footwear, apparel, and accessories. Founded in 1908 as the Converse Rubber Shoe Company, it has been acquired by several companies before becoming a subsidiary of Nike, Inc. in 2003.", url="https://upload.wikimedia.org/wikipedia/commons/e/eb/Converse_shoe_company_logo.png",user_id=8)
    vans = Brand(
        name='vans', description="Vans is the original action sports footwear company rooted in authenticity and creativity. Founded in 1966, Vans has thrived on a legacy of impacting our greater community through Vans' four pillars: action sports, music, art and street culture.", url="https://assets.stickpng.com/images/5842f005a6515b1e0ad75b0f.png", user_id=9)


    db.session.add(nike)
    db.session.add(jordan)
    db.session.add(adidas)
    db.session.add(new_balance)
    db.session.add(converse)
    db.session.add(vans)
    db.session.commit()


def undo_brands():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.brands RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM brands")

    db.session.commit()
