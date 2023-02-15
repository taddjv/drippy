# **Database Schema**

## `users`

| column name | data type | details                   |
| ----------- | --------- | ------------------------- |
| id          | integer   | not null, primary key     |
| username    | string    | not null,                 |
| email       | string    | not null, indexed, unique |
| created_at  | datetime  | not null                  |

## `shoes`

| column name | data type | details               |
| ----------- | --------- | --------------------- |
| id          | integer   | not null, primary key |
| name        | string    | not null              |
| description | string    | not null              |
| brand_id    | integer   | not null, foreign key |
| user_id     | integer   | not null, foreign key |
| created_at  | datetime  | not null              |

- `owner` references `users` table
- `brand` references `brands` table

## `brands`

| column name | data type | details               |
| ----------- | --------- | --------------------- |
| id          | integer   | not null, primary key |
| name        | string    | not null              |
| description | string    | not null              |
| owner       | integer   | not null, foreign key |
| created_at  | datetime  | not null              |

- `owner` references `users` table

## `carts`

| column name | data type | details               |
| ----------- | --------- | --------------------- |
| id          | integer   | not null, primary key |
| user_id     | integer   | not null, foreign key |
| created_at  | datetime  | not null              |

- `owner` references `users` table

## `cartItems`

| column name | data type | details               |
| ----------- | --------- | --------------------- |
| id          | integer   | not null, primary key |
| shoe_id     | integer   | not null, primary key |
| cart_id     | integer   | not null, foreign key |
| user_id     | integer   | not null, foreign key |
| created_at  | datetime  | not null              |

- `cart_id` references `carts` table
- `shoe_id` references `shoes` table
- `user_id` references `users` table

## `reviews`

| column name | data type | details               |
| ----------- | --------- | --------------------- |
| id          | integer   | not null, primary key |
| description | string    | not null              |
| stars       | integer   | not null              |
| shoe_id     | integer   | not null, primary key |
| user_id     | integer   | not null, foreign key |
| created_at  | datetime  | not null              |

- `shoe_id` references `shoes` table
- `user_id` references `users` table
