# Tripleten Web Project API Full

## Project Description

This project is a web application that allows users to register, authenticate, and interact with cards. Users can create, view, and delete cards, as well as update their profiles and avatars. The application is designed with a strong focus on security, ensuring that only authorized users can perform specific actions.

## Features

- User registration with email and password;
- User authentication with a JWT token valid for 7 days;
- Create, view, and delete cards for authenticated users;
- Update profile and avatar;
- Route protection to ensure only authorized users can access specific functionalities;

## Technologies Used

- Node.js
- Express
- MongoDB
- Mongoose
- JWT (JSON Web Token)
- Authentication and authorization middleware
- Data validation with specialized libraries
- Centralized error handling
- Logging of requests and errors

## Code Style Requirements

Consistent and proper code formatting, following best practices for indentation and nesting.
Clear and descriptive variable names that accurately represent the stored data.
Use of plural naming conventions for collections (e.g., lists of items).

## Error Handling

The application returns the following status codes for errors:

- 400: Invalid data provided when creating a card/user or updating profile/avatar;
- 403: Attempt to delete another user's card;
- 404: User or resource not found;
- 409: Email already registered during signup;
- 500: Internal server error;

Error messages are clear and correspond to the type of error encountered.

## Authorization & Authentication

- The server correctly handles multiple simultaneous requests;
- There are no linting errors in the code;
- The user schema includes the required "email" and "password" fields, with email being unique and properly validated;
- In the createUser controller, the email and password hash are stored in the database;
- The login controller verifies credentials and generates a JWT token valid for 7 days if correct;
- The /signin and /signup routes are implemented in the app.js file;
- The authentication middleware validates the JWT token and protects all routes except /signin and /signup;
- Users cannot delete cards they did not create;
- The API never returns the password hash in any response;

## Setup & Deployment

- Implementation of centralized error handling using a dedicated middleware;
- Validation of request bodies and parameters according to predefined schemas, ensuring invalid requests are not processed;
- Logging of all requests and responses in the request.log file, and errors in the error.log file, using libraries like Winston for log management;
