# REST API

## About The Project

A REST API using Express for a school database that contains information about users and courses. With this application you will be able to create new users and courses, and update/delete previous courses, with user authentication.

## Getting started

To get started with the project files you'll need to clone the repository and install the npm packages:
```sh
npm install
```

To create the database run:
```sh
npm run seed
```

Then run:
```sh
npm start
```

Then navigate, using an API testing software such as Postman, to:
```sh
localhost:5000
```

## Routes to test

- **/api/users GET** route that will return the currently authenticated user along with a 200 HTTP status code.
- **/api/users POST** route that will create a new user and return a 201 HTTP status code and no content.

- **/api/courses GET** route that will return a list of all courses including the User that owns each course and a 200 HTTP status code.
- **/api/courses/:id GET** route that will return the corresponding course along with the User that owns that course and a 200 HTTP status code.
- **/api/courses POST** route that will create a new course and return a 201 HTTP status code and no content.
- **/api/courses/:id PUT** route that will update the corresponding course and return a 204 HTTP status code and no content.
- **/api/courses/:id DELETE** route that will delete the corresponding course and return a 204 HTTP status code and no content.

## Technologies Used

- Express
- Node.js
- JavaScript
- Sequelize
- SQLite
- HTML
- CSS