# Storefront Backend Project
This is a storefront backend app for online store .It has many apis to add functionality to the store 

## First
- cloning this repo
- run < yarn install>

#### Requirements
##### PreStart 
- you should have a postgres to databases and remember configurations to its 
- add file called <.env> and assign your attributes to it  like this
  - NODE_ENV=dev      < node env>
  - SERVER_PORT=4003    < server port >
  -  PG_HOST=localhost   < host ip for postgres database>
  -  PG_PORT=3333    < database port>
  -  DATABASE_NAME=store    < first database name for development you remember??>
  -  DATABASE_NAME_TEST=store_test  < second database name for testing you remember??>
  -  DATABASE_USER=postgres   < database user>
  -  DATABASE_PASSWORD=shn   < password for database>
  -  
  -  
  -  BCRYPT_SALT=shno   < used in password encryption>
  -  SALT_ROUNDS=5    < used in password encryption>
  -  
  -  JWT_SECRET=shn-is-here    < used for token>
##### Then
- for database < yarn run db-up  > and this is very important
- for formating < yarn run format >
- for linting < yarn run lint >
- for testing < yarn run test >
### And finally to run the app
- yarn run start


## API Endpoints
#### Products
-  index                             'store/products' [GET]   {"id","first_name","last_name"}
-  show                              'store/products/:id<product_id>' [GET]
-  create           [token required] 'store/products' [POST] body{"name":"<product_name>","price":"<product_price>""category":"<product_name>"}
-  top                               'store/products/top/5' [GET]
-  category                          'store/products/in/category?category=q' [GET]  =>  
-  update           [token required] 'store/products/update/:id<product_id>' [PUT]  =>body{" name":"<product_name_new >""price":"<product_price_new>","category":"<product_category_new>"}
-  delete           [token required] 'store/products/delete/:id<product_id>' [DELETE] 


#### Users
-  index            [token required] 'store/users' [GET]
-  show             [token required] 'store/users/:id<user_id>' [GET]
- create                            'store/users' [POST]  => body{"first_name":"<user_first_name >""last_name":"<user_last_name>" "password":"<user_password>"}
-  update           [token required] 'store/users/update/:id<user_id>' [PUT]  =>body{"first_name":"<user_first_name_new >",  "last_name":"<user_last_name_new>","password":"<user_password_new>"}
-  delete           [token required] 'store/users/delete/:id<user_id>' [DELETE] 

#### Orders
-  Current                   [token required] 'store/orders/:id<user_id>/active' [GET]
-  Completed                 [token required] 'store/orders/:id<user_id>/completed' [GET]
-  index                     [token required] 'store/orders' [GET]
-  show                      [token required] 'store/orders/:id<order_id>' [GET] 
-  start_order               [token required] 'store/orders/users/:id<user_id>' [PUT]
-  done                      [token required] 'store/orders/:id<order_id>' [PUT]
-  add_product_to_order      [token required] 'store/orders ' [post]  => body{"order_id":"<order_id >""product_id":"<product_id>""quantity":"<quantity>"}
-  romove_product_from_order [token required] 'store/orders/:id<order_id> ' [delete]  => body{"product_id":"<product_id>"}

## DataBase Shapes
#### product
-  id =>(Primary Key)
- name
- price
- category
- => CREATE TABLE products (id SERIAL PRIMARY KEY ,name VARCHAR(100) NOT NULL UNIQUE, price INTEGER NOT NULL,category VARCHAR(50) NOT NULL);



#### user
- id =>(Primary Key)
- firstName
- lastName
- password
-  =>CREATE TABLE users (id SERIAL PRIMARY KEY ,first_name VARCHAR(100) UNIQUE NOT NULL, last_name VARCHAR(100) NOT NULL, password VARCHAR(255) UNIQUE NOT NULL);


#### orders
- id =>(Primary Key)
- user_id =>(Foreign Key)
- status of order =>(active or complete)
-  =>CREATE TABLE orders (id SERIAL PRIMARY KEY ,user_id INTEGER  REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE, status VARCHAR(50) NOT NULL);


#### orders_products
- id   =>(Primary Key)
- order_id   =>(Foreign Key)
- product_id   =>(Foreign Key)
- user_id
- quantity =>(of each product in the order)
-  =>CREATE TABLE orders_products (id SERIAL PRIMARY KEY ,order_id INTEGER  REFERENCES orders(id)ON DELETE CASCADE ON UPDATE CASCADE,product_id INTEGER  REFERENCES products(id)ON DELETE CASCADE ON UPDATE CASCADE,quantity integer NOT NULL);
