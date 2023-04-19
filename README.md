# JAM Backend API

This is an API for an ecommerce app that uses Node/Express and pgSQL.

The app uses pgSQL service from https://neon.tech/

You can use anyother service or setup your own pgSQL DB. The config details are in `db.config.ts` file.

## How to install on localhost

Clone the repo on your computer and then run the following commands. Ensure you are in the project folder. The below command will install all the dependencies.
Install `yarn` globally before running the below command.

```sh
yarn
```

## How to use on localhost

To test the API, you can set up a local server via follwong commands.

```sh
yarn dev
```

The above command will start a local node server on PORT 3001 and you can check the API on http://localhost:3001 or http://127.0.0.1:3001
Once the dev server is running, you can also use POSTMAN to send GET and POST requests to the API. While using POSTMAN to send requests, you can send along the parameters via `raw` option available in the `body` tab of the POSTMAN desktop native client.

## User guide

This API has 4 endpoints as explained below. The API returns success and error messages as JSON data.

- Signup

This endpoint has 4 required arguments `username`, `email`, `password`, `roles`.

`roles` will be an array of strings and the values you can use are `admin` and `user` `["user", "admin"]`.
```sh
POST http://127.0.0.1:3001/api/auth/signup
```
```sh
{
    "username": "danish_admin_4",
    "email": "danish_admin_4@yopmail.com",
    "password": "Danish@mmmddd",
    "roles": ["admin"]
}
```


- SignIn

This endpoint has 2 required arguments `username`, `password`.

```sh
POST http://127.0.0.1:3001/api/auth/signin
```
```sh
{
    "username": "danish_admin_4",
    "password": "Danish@123"
}
```


- Create Product

This endpoint has 2 required arguments `name`, `description`, `price`, `quantity`.

The `price` field is a `float` and `quantity` is an `integer`.

```sh
POST http://127.0.0.1:3001/api/product/create
```
```sh
{
    "name": "iPhone 14 pro",
    "description": "Description for iPhone 14 pro",
    "price": 44.13,
    "quantity": 100
}
```

- Get ALL Products

This endpoint needs no arguments.

```sh
GET http://127.0.0.1:3001/api/product/all
```

- Get Product By ID

This endpoint needs no arguments. Though you need to add the `product ID` in the API route.

```sh
POST http://127.0.0.1:3001/api/product/3
```


## Support
For support or questions, you can contact me on
- Twitter https://twitter.com/danziqbal
- LinkedIn https://www.linkedin.com/in/sheikh-danish-iqbal-444196108/

