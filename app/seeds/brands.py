from app.models import db, Brand, environment, SCHEMA
from flask import url_for


def seed_brands():

    nike = Brand(
        poster_url="https://lh3.googleusercontent.com/pw/AMWts8BIZLat4RYuIvkvWoZrwA46ntsO5Wfq8nKbBq2miEAAvfZfuCmjmcGngTAk1N3Ufqx0FhL9mmoOfnqjlujEYecWvDrLqsCdbuFXsLUoU76lnbZ2fQInQp8p9ElKxCUdlA_tRFnhUGaQNG-Z9pmYZu8=w564-h846-no?authuser=0", name='nike', description="The world's largest athletic apparel company, Nike is best known for its footwear, apparel, and equipment. Founded in 1964 as Blue Ribbon Sports, the company became Nike in 1971 after the Greek goddess of victory. One of the most valuable brands among sport businesses, Nike employs over 76,000 people worldwide.", url="https://static.nike.com/a/images/f_jpg,q_auto:eco/61b4738b-e1e1-4786-8f6c-26aa0008e80b/swoosh-logo-black.png", user_id=4)
    jordan = Brand(
        poster_url="https://lh3.googleusercontent.com/pw/AMWts8Bd0cjC0zW6ErvnDOt1d2pWrgfTqF4uxf_QVunNELRUUzaFYeizo97UUKStdOxxzjXn4NVTt1Rx8NROin2KmnPzLqyR2HtCc01cZ1xnNLNLATUShZjUilMeNxKKJBP6bXTyBeqByz8nLtcr88Tolas=w503-h682-no?authuser=0",name='jordan', description="Air Jordan is a line of basketball shoes and athletic apparel produced by American corporation Nike, Inc. The first Air Jordan shoe was produced for Hall of Fame former basketball player Michael Jordan during his time with the Chicago Bulls in late 1984 and released to the public on April 1, 1985. The shoes were designed for Nike by Peter Moore, Tinker Hatfield, and Bruce Kilgore.",url="https://www.freepnglogos.com/uploads/michael-jordan-air-jordan-jumpman-basketball-logo-19.jpg", user_id=5)
    adidas = Brand(
        poster_url="https://lh3.googleusercontent.com/pw/AMWts8DWXgWsl4eNCpA3-KRVFe6dTwXrvz-104dlRlBSl9VtsO55glMmrA9GKaAlALOZMm3xAHb9NDrrPSx2wyXZeNTOfb_M93TeKwbeEMVLMNq8Srhi6Cqnkk3-D6sm7NBvebiD8Oykj3Ptjh61nF-DC9s=w546-h723-no?authuser=0",name='adidas', description="adidas AG (adidas) designs, manufactures and markets athletic and sports lifestyle products. The company's product portfolio includes footwear, apparel and accessories such as bags, sun glasses, fitness equipment, and balls.", url="https://www.freepnglogos.com/uploads/adidas-logo-photo-png-3.png", user_id=6)
    new_balance = Brand(
        poster_url="https://lh3.googleusercontent.com/pw/AMWts8AhNfkIqPTogPG_jYChWv8G96MtzkCuNAjpakgYxxiZs7ouHhvZuazz1dzRpdqlUS0aTV9k6Kf0433Y3QEc8YL9g8gcgvlq3wweoPt-ugqwMstvPyoyWnktHUMDf_54vkOvaYXAdlShzxKpBJFC_HE=w564-h748-no?authuser=0",name='new balance', description="New Balance Athletics, Inc. (NB), best known as simply New Balance, is one of the world's major sports footwear and apparel manufacturers. Based in Boston, Massachusetts, the multinational corporation was founded in 1906 as the New Balance Arch Support Company.", url="https://logos-world.net/wp-content/uploads/2020/09/New-Balance-Logo-1972-2006.png", user_id=7)
    converse = Brand(
        poster_url="https://lh3.googleusercontent.com/pw/AMWts8CHqyxsyqjBOcEz_WOHy3NRoHfxvlFIT3ws1SP8Qm3o5NIL67zyoPb_NK0jcgdNBGXoPVxY7zh_9SyT26-TlRnURdO2m6C3kSza9Q-3WVpBumuYZFHZF8rXEADd5J_vFdULHpyMlVGh3SS3tLGHUso=w564-h747-no?authuser=0",name='converse', description="Converse is an American lifestyle brand that markets, distributes, and licenses footwear, apparel, and accessories. Founded in 1908 as the Converse Rubber Shoe Company, it has been acquired by several companies before becoming a subsidiary of Nike, Inc. in 2003.", url="https://upload.wikimedia.org/wikipedia/commons/e/eb/Converse_shoe_company_logo.png",user_id=8)
    vans = Brand(
        poster_url="https://lh3.googleusercontent.com/pw/AMWts8DfGJcTp6F73i59xI4G4SnXmU9jKnojBRvZRjUWEUeGYjoBqP3ZIQhUAOWJXA2irMf67S-wIB9Z8k55e5yjhoVVzgT9Km6kAhS5ch7uRut5owQNgqBBvFe82I7c3nsrP4xD40-qX4ILy7h-cEsF_Tc=w564-h749-no?authuser=0",name='vans', description="Vans is the original action sports footwear company rooted in authenticity and creativity. Founded in 1966, Vans has thrived on a legacy of impacting our greater community through Vans' four pillars: action sports, music, art and street culture.", url='https://www.freepnglogos.com/uploads/vans-logo-png/stasp-streets-sports-vans-black-logo-1.png', user_id=9)
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
