# User Stories

## Users

### Sign Up

- As an unregistered and unauthorized user, I want to be able to sign up for the website via a sign-up form.
  - When I'm on any page:
    - I would like to have access to a pop-up modal that appears when I click on the sign-up button in the navbar
    - I would like to be able to enter my email, username, and preferred password on a clearly laid out form.
    - I would like the website to log me in upon successful completion of the sign-up form.
      - So that I can seamlessly access the site's functionality
  - When I enter invalid data on the sign-up form:
    - I would like the website to inform me of the validations I failed to pass, and repopulate the form with my valid entries (except my password).
    - So that I can try again without needing to refill forms I entered valid data into.

### Log in

- As a registered and unauthorized user, I want to be able to log in to the website via a log-in form.
  - When I'm on any page:
    - I would like to have access to a pop-up modal that appears when I click on the log-in button in the navbar
    - I would like to be able to enter my email and password on a clearly laid out form.
    - I would like the website to log me in upon successful completion of the log-in form.
  - So that I can seamlessly access the site's functionality
  - When I enter invalid data on the log-up form:
    - I would like the website to inform me of the validations I failed to pass, and repopulate the form with my valid entries (except my password).
    - So that I can try again without needing to refill forms I entered valid data into.

### Demo User

- As an unregistered and unauthorized user, I would like an easy to find and clear button on the navbar to allow me to visit the site as a guest without signing up or logging in.
  - In the navbar:
    - I can click on a Demo User button to log me in and allow me access as a normal user.
      - So that I can test the site's features and functionality without needing to stop and enter credentials.

### Log Out

- As a logged in user, I want to log out via an easy to find log out button on the navbar.
  - While on any page of the site:
    - I can log out of my account and be redirected to a page displaying recent FauxTweets.
      - So that I can easily log out to keep my information secure.

## Shoes

### Create Shoes

- As a logged in user, I want to be able to post new Shoes.
  - When I'm on the `/new-shoe` page:
    - I can write and submit a new Shoe.
      - So that I can sell my shoe.

### Viewing Shoes

- As a logged in _or_ logged out user, I want to be able to view a selection of the most recent shoes.

  - When I'm on the `/shoes` page:
    - I can view all recently posted Shoes.
      - So that I can look at the shoe catalogue.

- As a logged in _or_ logged out user, I want to be able to view a specific Shoe and its associated Reviews and Brand.
  - When I'm on the `/shoes/:name` page:
    - I can view the content of the Shoe, as well as the associated Reviews and Brand.
      - So that I can add a review or add the shoe to my cart.

### Updating Shoes

- As a logged in user, I want to be able to edit my Shoes by clicking an Edit button associated with the Shoe anywhere that Shoe appears.
  - When I'm on the `/shoes/:name` page:
    - I can click "Edit" to make permanent changes to Shoe I have posted.
      - So that I can fix any errors I make in my Shoes.

### Deleting Shoes

- As a logged in user, I want to be able to delete my Shoes by clicking a Delete button associated with the Shoe anywhere that Shoe appears.
  - When I'm on the`/shoes/:name` page:
    - I can click "Delete" to permanently delete a Shoe I have posted.
      - So that when I realize I shouldn't have publicly offered a shoe for sale.

## Brands

### Create Brands

- As a logged in user, I want to be able to post new Brands.
  - When I'm on the `/new-brand` page:
    - I can write and submit a new Brand.
      - So that I can make a category for my shoes.

### Viewing Brands

- As a logged in _or_ logged out user, I want to be able to view a selection of all brands.

  - When I'm on the `/` page:
    - I can view all Brands.
      - So that I can look at the brands this website has.

- As a logged in _or_ logged out user, I want to be able to view a specific
  Brand and its associated Shoes .
  - When I'm on the `/brand/:name` page:
    - I can view the the Shoes of the brand
      - So that I can look at all the shoes this brand offers.

## Carts

### Create Carts

- As a logged in user, I have access to a cart.
  - When I'm on the `/shoes/:name` page:
    - I can add the Shoe to my cart
      - So that I can buy the shoe.

### Viewing Carts

- As a logged in _or_ logged out user, I want to be able to view my cart.

  - When I'm on the `/my-cart` page:
    - I can view all recently added CartItems to my Cart.
      - So that I can make a purchase.

## CartItems

### Create CartItems

- As a logged in user, I want to be able to post new CartItems.
  - When I'm on the `/shoes/:name` page:
    - I can submit a new CartItem.
      - So that I can add the shoe to my cart.

### Viewing CartItems

- As a logged in _or_ logged out user, I want to be able to view a selection of my CartItems.

  - When I'm on the `/my-cart` page:
    - I can view all recently added CartItems to my Cart.
      - So that I can make a purchase.

### Updating CartItems

- As a logged in user, I want to be able to edit my CartItems by changing the quantity with a select input.
  - When I'm on the `/my-cart` page:
    - I can click on the select in put to make permanent changes to the
      CartItem I have posted.
      - So that I can fix any errors I make in my CartItems.

### Deleting CartItems

- As a logged in user, I want to be able to delete my CartItems by clicking a Delete button associated with the CartItem
  - When I'm on the`/my-cart` page:
    - I can click "Delete" to permanently delete a CartItem I have posted.
      - So that when I realize I don't want to buy the shoe.

## Reviews

### Create Reviews

- As a logged in user, I want to be able to post new Review for a Shoe.
  - When I'm on the `/shoes/:name` page:
    - I can write and submit a new Review.
      - So that I can add my take on the shoe.

### Viewing Reviews

- As a logged in _or_ logged out user, I want to be able to view all the reviews under a Shoe
  - When I'm on the `/shoes/:name` page:
    - I can view all recently posted Reviews.
      - So that I can look at the reviews.

### Updating Reviews

- As a logged in user, I want to be able to edit my Reviews by clicking an Edit button associated with the Shoe anywhere that Shoe appears.
  - When I'm on the `/shoes/:name` page:
    - I can click "Edit" to make permanent changes to Review I have posted.
      - So that I can fix any errors I make in my Review.

### Deleting Reviews

- As a logged in user, I want to be able to delete my Reviews by clicking a Delete button associated with the Shoe anywhere that Shoe appears.
  - When I'm on the`/shoes/:name` page:
    - I can click "Delete" to permanently delete a Review I have posted.
      - So that when I realize I shouldn't have publicly offered my take on the shoe.
