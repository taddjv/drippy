from app.models import db,Shoe, environment, SCHEMA
import random


def seed_shoes():
    jordan1 =Shoe(
        year=1985,colors="red,white",count=random.randint(1,10) ,price=9200, name='Air Jordan 1 (I) High', url="https://images.solecollector.com/complex/image/upload/c_fill,f_auto,fl_lossy,q_auto,w_1100/air-jordan-1-retro-og-hero_xf8joi.jpg", user_id=5 ,brand_id=2)
    jordan1wc =Shoe(
        year=2023,colors="grey,white",count=random.randint(1,10) ,price=2900, name='Air Jordan 1 "White Cement"', url="https://images.solecollector.com/complex/image/upload/c_fill,f_auto,fl_lossy,q_auto,w_1100/uys5iho9m4wsjk3rqdug.jpg", user_id=5 ,brand_id=2)
    jordan1ts =Shoe(
        year=2021,colors="blue,white",count=random.randint(1,10) ,price=9200, name="Fragment X Travis Scott X Air Jordan 1 High OG Sail/Black-Military Blue-Shy Pink", url="https://images.solecollector.com/complex/image/upload/c_fill,f_auto,fl_lossy,q_auto,w_1100/hywonp4yrtmcp3cfyoyf.jpg", user_id=5 ,brand_id=2)
    jordan4og =Shoe(
        year=2023,colors="green,white",count=random.randint(1,10) ,price=200, name="Air Jordan 4 Women's 'Oil Green'", url="https://images.solecollector.com/complex/image/upload/c_fill,f_auto,fl_lossy,q_auto,w_1100/t74tf7b1s6boimlxr7rh.jpg", user_id=5 ,brand_id=2)
    jordan4amm =Shoe(
        year=2022, colors="brown",count=random.randint(1,10) ,price=2700, name="A Ma Maniére X Air Jordan 4", url="https://images.solecollector.com/complex/image/upload/c_fill,f_auto,fl_lossy,q_auto,w_1100/iyeamprm5bmljscqnhft.jpg", user_id=5 ,brand_id=2)
    jordan4rv =Shoe(
        year=2023,colors="black",count=random.randint(1,10) ,price=2200, name="Air Jordan 4 Retro SE GG 'Rush Violet'", url="https://images.solecollector.com/complex/image/upload/c_fill,f_auto,fl_lossy,q_auto,w_1100/qls8td18ugghyn56jqvk.jpg", user_id=5 ,brand_id=2)

    nikeaf =Shoe(
        year=1982,colors="white",count=random.randint(1,10) ,price=200, name="Nike Air Force 1 Low", url="https://images.solecollector.com/complex/image/upload/c_fill,f_auto,fl_lossy,q_auto,w_1100/nike-air-force-1-low_xg89xu.jpg", user_id=4 ,brand_id=1)
    nikeam =Shoe(
        year=1987,colors="grey,red",count=random.randint(1,10) ,price=2700, name="Nike Air Max 1", url="https://images.solecollector.com/complex/image/upload/c_fill,f_auto,fl_lossy,q_auto,w_1100/nike-air-max-1-model-image_kx3ybw.jpg", user_id=4 ,brand_id=1)
    nikepba =Shoe(
        year=2013,colors="black",count=random.randint(1,10) ,price=2200, name="Nike SB Project BA", url="https://images.solecollector.com/complex/image/upload/c_fill,f_auto,fl_lossy,q_auto,w_1100/iacjndzhv6gfmocfhldi.jpg", user_id=4 ,brand_id=1)

    adidasf =Shoe(
        year=2023,colors="white", count=random.randint(1,10) ,price=200, name="Adidas Futurepacer", url="https://images.solecollector.com/complex/image/upload/c_fill,f_auto,fl_lossy,q_auto,w_1100/cd8nkimuvaa3dgmis4o0.jpg", user_id=6 ,brand_id=3)
    adidasfl =Shoe(
        year=1984,colors="white,blue", count=random.randint(1,10) ,price=2700, name="Adidas Forum Low", url="https://images.solecollector.com/complex/image/upload/c_fill,f_auto,fl_lossy,q_auto,w_1100/oxnvunoponicvmjx4ecr.jpg", user_id=6 ,brand_id=3)
    adidasss =Shoe(
        year=2019,colors="blue", count=random.randint(1,10) ,price=2200, name="Adidas Silverbirch SPZL", url="https://images.solecollector.com/complex/image/upload/c_fill,f_auto,fl_lossy,q_auto,w_1100/hydxm47ergd4rd7m4wgs.jpg", user_id=6 ,brand_id=3)

    nbdd =Shoe(
        year=1989,colors="red,white",count=random.randint(1,10) ,price=200, name="New Balance BB550", url="https://images.solecollector.com/complex/image/upload/c_fill,f_auto,fl_lossy,q_auto,w_1100/ud65qx1rc5wctapk4kmg.jpg", user_id=7 ,brand_id=4)
    nbp =Shoe(
        year=2014,colors="white,purple",count=random.randint(1,10) ,price=2700, name="New Balance P740", url="https://images.solecollector.com/complex/image/upload/c_fill,f_auto,fl_lossy,q_auto,w_1100/sdbik6xqfaqyh99zg8fm.jpg", user_id=7 ,brand_id=4)
    nb1 =Shoe(
        year=1989,colors="blue",count=random.randint(1,10) ,price=2200, name="New Balance 1500", url="https://images.solecollector.com/complex/image/upload/c_fill,f_auto,fl_lossy,q_auto,w_1100/sszbfvkj7qhsjandqjaj.jpg", user_id=7 ,brand_id=4)

    converseasp =Shoe(
        year=2019,colors="white",count=random.randint(1,10) ,price=200, name="Converse All Star Pro BB", url="https://images.solecollector.com/complex/image/upload/c_fill,f_auto,fl_lossy,q_auto,w_1100/tzifcjbeoufgr09qyfox.jpg", user_id=8 ,brand_id=5)
    conversect =Shoe(
        year=1917,colors="white",count=random.randint(1,10) ,price=2700, name="Converse Chuck Taylor All-Star", url="https://images.solecollector.com/complex/image/upload/c_fill,f_auto,fl_lossy,q_auto,w_1100/converse-chuck-taylor-all-star_snq5uw.jpg", user_id=8 ,brand_id=5)
    conversespp =Shoe(
        year=2014,colors="white",count=random.randint(1,10) ,price=2200, name="Converse Star Player Plus", url="https://images.solecollector.com/complex/image/upload/c_fill,f_auto,fl_lossy,q_auto,w_1100/lsl8enp6fmroswaq2ivg.jpg", user_id=8 ,brand_id=5)

    vansa =Shoe(
        year=1966,colors="blue",count=random.randint(1,10) ,price=200, name="Vans Authentic", url="https://images.solecollector.com/complex/image/upload/c_fill,f_auto,fl_lossy,q_auto,w_1100/bvewbsonhcoshytlcfgr.jpg", user_id=9 ,brand_id=6)
    vanse =Shoe(
        year=1975,colors="black",count=random.randint(1,10) ,price=2700, name="Vans Era", url="https://images.solecollector.com/complex/image/upload/c_fill,f_auto,fl_lossy,q_auto,w_1100/z8msoaqnovmp8isgtyil.jpg", user_id=9 ,brand_id=6)
    vans =Shoe(
        year=1976,colors="black",count=random.randint(1,10) ,price=2200, name="Vans Old Skool", url="https://images.solecollector.com/complex/image/upload/c_fill,f_auto,fl_lossy,q_auto,w_1100/vans-old-skool-model_dgzrqc.jpg", user_id=9 ,brand_id=6)


    db.session.add(jordan1)
    db.session.add(jordan1wc)
    db.session.add(jordan1ts)
    db.session.add(jordan4og)
    db.session.add(jordan4amm)
    db.session.add(jordan4rv)
    db.session.add(nikeaf)
    db.session.add(nikeam)
    db.session.add(nikepba)
    db.session.add(adidasf)
    db.session.add(adidasfl)
    db.session.add(adidasss)
    db.session.add(nbdd)
    db.session.add(nb1)
    db.session.add(nbp)
    db.session.add(converseasp)
    db.session.add(conversect)
    db.session.add(conversespp)
    db.session.add(vansa)
    db.session.add(vans)
    db.session.add(vanse)


    db.session.commit()


def undo_shoes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.shoes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM shoes")

    db.session.commit()
