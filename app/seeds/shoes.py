from app.models import db,Shoe, environment, SCHEMA
import random
from .shoes_data import *


def seed_shoes():
    for shoe in jordan_1:
        release_year = random.randint(1985,2023)
        newShoe=Shoe(
        year=release_year,colors=shoe["colors"],count=random.randint(1,10) ,price=random.randint(1,999)*10, name=shoe["name"], url=shoe["url"], user_id=5 ,brand_id=2)
        db.session.add(newShoe)
    for shoe in jordan_4:
        release_year = random.randint(1988,2023)
        newShoe=Shoe(
        year=release_year,colors=shoe["colors"],count=random.randint(1,10) ,price=random.randint(1,555)*10, name=shoe["name"], url=shoe["url"], user_id=5 ,brand_id=2)
        db.session.add(newShoe)
    for shoe in jordan_11:
        release_year = random.randint(1996,2023)
        newShoe=Shoe(
        year=release_year,colors=shoe["colors"],count=random.randint(1,10) ,price=random.randint(1,222)*10, name=shoe["name"], url=shoe["url"], user_id=5 ,brand_id=2)
        db.session.add(newShoe)

    nikeaf =Shoe(
        year=1982,colors="white",count=random.randint(1,10) ,price=200, name="Nike Air Force 1 Low", url="https://images.solecollector.com/complex/image/upload/c_fill,f_auto,fl_lossy,q_auto,w_1100/nike-air-force-1-low_xg89xu.jpg", user_id=4 ,brand_id=1)
    nikepba =Shoe(
        year=2013,colors="black",count=random.randint(1,10) ,price=2200, name="Nike SB Project BA", url="https://images.solecollector.com/complex/image/upload/c_fill,f_auto,fl_lossy,q_auto,w_1100/iacjndzhv6gfmocfhldi.jpg", user_id=4 ,brand_id=1)
    for shoe in nike_am:
        release_year = random.randint(1987,2023)
        newShoe=Shoe(
        year=release_year,colors=shoe["colors"],count=random.randint(1,10) ,price=random.randint(1,99)*10, name=shoe["name"], url=shoe["url"], user_id=4 ,brand_id=1)
        db.session.add(newShoe)
    for shoe in nike_sb:
        release_year = random.randint(2002,2023)
        newShoe=Shoe(
        year=release_year,colors=shoe["colors"],count=random.randint(1,10) ,price=random.randint(1,99)*10, name=shoe["name"], url=shoe["url"], user_id=4 ,brand_id=1)
        db.session.add(newShoe)
    adidasf =Shoe(
        year=2023,colors="white", count=random.randint(1,10) ,price=200, name="Adidas Futurepacer", url="https://images.solecollector.com/complex/image/upload/c_fill,f_auto,fl_lossy,q_auto,w_1100/cd8nkimuvaa3dgmis4o0.jpg", user_id=6 ,brand_id=3)
    adidasfl =Shoe(
        year=1984,colors="white,blue", count=random.randint(1,10) ,price=2700, name="Adidas Forum Low", url="https://images.solecollector.com/complex/image/upload/c_fill,f_auto,fl_lossy,q_auto,w_1100/oxnvunoponicvmjx4ecr.jpg", user_id=6 ,brand_id=3)
    adidasss =Shoe(
        year=2019,colors="blue", count=random.randint(1,10) ,price=2200, name="Adidas Silverbirch SPZL", url="https://images.solecollector.com/complex/image/upload/c_fill,f_auto,fl_lossy,q_auto,w_1100/hydxm47ergd4rd7m4wgs.jpg", user_id=6 ,brand_id=3)
    for shoe in adidas_campus:
        newShoe=Shoe(
        year=random.randint(1980,2023),colors=shoe["colors"],count=random.randint(1,10) ,price=random.randint(1,99)*10, name=shoe["name"], url=shoe["url"], user_id=6 ,brand_id=3)
        db.session.add(newShoe)
    for shoe in adidas_nmd:
        newShoe=Shoe(
        year=random.randint(2015,2023),colors=shoe["colors"],count=random.randint(1,10) ,price=random.randint(1,99)*10, name=shoe["name"], url=shoe["url"], user_id=6 ,brand_id=3)
        db.session.add(newShoe)
    for shoe in adidas_yeezy:
        newShoe=Shoe(
        year=random.randint(2015,2023),colors=shoe["colors"],count=random.randint(1,10) ,price=random.randint(1,222)*10, name=shoe["name"], url=shoe["url"], user_id=6 ,brand_id=3)
        db.session.add(newShoe)
    for shoe in adidas_boost:
        newShoe=Shoe(
        year=random.randint(2017,2023),colors=shoe["colors"],count=random.randint(1,10) ,price=random.randint(1,222)*10, name=shoe["name"], url=shoe["url"], user_id=6 ,brand_id=3)
        db.session.add(newShoe)
    converseasp =Shoe(
        year=2019,colors="white",count=random.randint(1,10) ,price=200, name="Converse All Star Pro BB", url="https://images.solecollector.com/complex/image/upload/c_fill,f_auto,fl_lossy,q_auto,w_1100/tzifcjbeoufgr09qyfox.jpg", user_id=8 ,brand_id=5)
    conversespp =Shoe(
        year=2014,colors="white",count=random.randint(1,10) ,price=2200, name="Converse Star Player Plus", url="https://images.solecollector.com/complex/image/upload/c_fill,f_auto,fl_lossy,q_auto,w_1100/lsl8enp6fmroswaq2ivg.jpg", user_id=8 ,brand_id=5)
    for shoe in chuck:
        newShoe=Shoe(
        year=random.randint(1917,2023),colors=shoe["colors"],count=random.randint(1,10) ,price=random.randint(1,50)*10, name=shoe["name"], url=shoe["url"], user_id=8 ,brand_id=5)
        db.session.add(newShoe)
    nbdd =Shoe(
        year=1989,colors="red,white",count=random.randint(1,10) ,price=200, name="New Balance BB550", url="https://images.solecollector.com/complex/image/upload/c_fill,f_auto,fl_lossy,q_auto,w_1100/ud65qx1rc5wctapk4kmg.jpg", user_id=7 ,brand_id=4)
    nbp =Shoe(
        year=2014,colors="white,purple",count=random.randint(1,10) ,price=2700, name="New Balance P740", url="https://images.solecollector.com/complex/image/upload/c_fill,f_auto,fl_lossy,q_auto,w_1100/sdbik6xqfaqyh99zg8fm.jpg", user_id=7 ,brand_id=4)
    for shoe in nb_550:
        newShoe=Shoe(
        year=random.randint(1989,2023),colors=shoe["colors"],count=random.randint(1,10) ,price=random.randint(1,50)*10, name=shoe["name"], url=shoe["url"], user_id=7 ,brand_id=4)
        db.session.add(newShoe)
    for shoe in vans_authentic:
        newShoe=Shoe(
        year=random.randint(1966,2023),colors=shoe["colors"],count=random.randint(1,10) ,price=random.randint(1,50)*10, name=shoe["name"], url=shoe["url"], user_id=9 ,brand_id=6)
        db.session.add(newShoe)
    for shoe in vans_old_skool:
        newShoe=Shoe(
        year=random.randint(1977,2023),colors=shoe["colors"],count=random.randint(1,10) ,price=random.randint(1,50)*10, name=shoe["name"], url=shoe["url"], user_id=9 ,brand_id=6)
        db.session.add(newShoe)
    for shoe in vans_sk8_hi:
        newShoe=Shoe(
        year=random.randint(1978,2023),colors=shoe["colors"],count=random.randint(1,10) ,price=random.randint(1,50)*10, name=shoe["name"], url=shoe["url"], user_id=9 ,brand_id=6)
        db.session.add(newShoe)


    db.session.add(nikeaf)
    db.session.add(nikepba)
    db.session.add(adidasf)
    db.session.add(adidasfl)
    db.session.add(adidasss)
    db.session.add(nbdd)
    db.session.add(nbp)
    db.session.add(converseasp)
    db.session.add(conversespp)


    db.session.commit()


def undo_shoes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.shoes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM shoes")

    db.session.commit()
