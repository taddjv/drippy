# User-facing routes (frontend routes)

## `/`

### Homepage

This page displays the most popular brands and shoes, as well as a navigation bar with login/signup or logout buttons. The navigation bar also includes a cart button as well as a shoes button.

--Navbar--

- `GET /`
- `GET /my-cart`
- `GET /shoes`
- `GET /brands`

--Body--

- `GET /brand/:name`
- `GET /shoes/:name`

## `/shoes`

### All shoes

This page displays all the shoes with associated review count, as well as a navigation bar with the previous buttons. Users will also be able to filter shoes by brand and sort them by reviews, date or price.

--Navbar--

- `GET /`
- `GET /my-cart`
- `GET /shoes`
- `GET /brands`

--Body--

- `GET /shoes`

## `/shoes/:name`

### Individual shoe

This page displays individual the shoe with associated reviews , as well as a navigation bar with the previous buttons. If the logged in user owns the shoe, this page also displays an update and delete button. Logged in users can review or add the shoe to their cart.

--Navbar--

- `GET /`
- `GET /my-cart`
- `GET /shoes`
- `GET /brands`

--Body--

- `GET /shoes/:name`
- `PUT /shoes/:name`
- `DELETE /shoes/:name`
- `POST /shoes/:name/reviews`
- `POST /cart`

- `GET /shoes/`

## `/brand/:name`

### Individual brand

This page displays the individual brand with associated shoes , as well as a navigation bar with the previous buttons.

--Navbar--

- `GET /`
- `GET /my-cart`
- `GET /shoes`
- `GET /brands`

--Body--

- `GET /band/:name`
- `GET /shoes/:name`

## `/new-shoe`

### New shoe

This page displays a form only a logged in user can access. Here they can add their own shoe to sell, as well as a navigation bar with the previous buttons.

--Navbar--

- `GET /`
- `GET /my-cart`
- `GET /shoes`
- `GET /brands`

--Body--

- `POST /shoes`

## `/new-brand`

### New brand

This page displays a form only a logged in user can access. Here they can add their own brand to sell, as well as a navigation bar with the previous buttons.

--Navbar--

- `GET /`
- `GET /my-cart`
- `GET /shoes`
- `GET /brands`

--Body--

- `POST /brands`

## `/shoes/search/:query`

### search

- A logged in user may search for shoes through a search bar with the use of pythons '.like', users can search for shoes in database with keywords from the search bar. Shoes whose title or body match the included the keywords will return the shoes' I.D and render all the question results on browser.

- `GET /shoes/search/:query`

## `/my-cart`

### my Cart

This page displays a cart with all the users shoes added to it. Here they can make a purchase to buy the items in the cart.

--Navbar--

- `GET /`
- `GET /my-cart`
- `GET /shoes`
- `GET /brands`

--Body--

- `*no routes*`

## `/shoes/search/:query`
