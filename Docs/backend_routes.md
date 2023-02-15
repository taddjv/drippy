# API-Routes (backend routes)

This web app uses the following API routes to dynamically update the page to create a single-page-app-like feel for the user for specific features.

## Shoes

- A logged in user may delete, edit or create their own shoe, however every user can view all shoes or a specific shoe, logged in or not.

  - `GET /api/shoes/:id`
  - `GET /api/shoes`
  - `POST /api/shoes`
  - `PUT /api/shoes/:id`
  - `DELETE /api/shoes/:id`

## Cart

- A logged in user may delete, edit or add shoes in their cart

  - `GET /api/cart/:id`
  - `POST /api/cart`
  - `PUT /api/cart/:id`
  - `DELETE /api/cart/:id`

## Search

- A logged in user may search for shoes through a search bar with the use of pythons '.like', users can search for shoes in database with keywords from the search bar. Shoes whose title or body match the included the keywords will return the shoes' I.D and render all the question results on browser.

- `GET /api/shoes/search`

## Brands

- A logged in user may create their own brand, however every user can view all brands or a specific brand, logged in or not.

  - `GET /api/brands/:id`
  - `GET /api/brands`
  - `POST /api/brands`

## Reviews

- A logged in user may delete, edit or create their own review, however every user can view all reviews or a specific review, logged in or not.

  - `GET /api/reviews/:id`
  - `GET /api/reviews`
  - `POST /api/reviews`
  - `PUT /api/reviews/:id`
  - `DELETE /api/reviews/:id`
