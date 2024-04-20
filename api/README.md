# API for pets shops

## Introduction
This is an API for a pet store company that deals with many different companies such as pharmaceutical companies, food companies, and other companies that sell pet supplies.

## Database Seed

- create an admin user in the database

## Install

Some basic Git commands are:

```
$ git clone https://github.com/MahamdSirafi/Pet.git
$ cd Pet
$ cd api
$ npm install
```

## Start development

```
$ npm start
```

## Languages & tools

- [Node](https://nodejs.org/en/)

- [Express](https://expressjs.com/)

- [Mongoose](https://mongoosejs.com/)

## API Endpoints

### user Endpoints

- `GET /users`: Get a list of all users.
- `GET /users/:id`: Get details of a specific users identified by `id`.
- `POST /users`: Create new user with role.
- `PATCH /users/:id`: Update details of a specific users identified by `id`.
- `DELETE /users/:id`: Delete a specific users identified by `id`.
- `POST /signup`: Create a new users.
- `POST /login`: Log in to an account.
- `POST /forgotPassword`: Request to forget your password.
- `PATCH /resetPassword/:token`: Reset password.
- `PATCH /activeMe`: Activate the account.
- `DELETE /deleteMe`: Deactivate the account.
- `GET /me`: Get my profile.
- `GET /users/:id`: Get details of a specific users identified by `id`.
- `POST /users`: Create new user with role.
- `PATCH /updateMyPassword`: Update Password of a me .
- `PATCH /updateMeAndUpload/`: Update my profile with Upload imges.
- `PATCH /updateMe`: Update my profile.


Please refer to the API documentation for more details on request and response formats.

## Setting Up .env File

This guide explains how to set up an `.env` file to configure environment variables.

### Steps

1. Create a new file and name it `.env` in your project directory.

2. Open the `.env` file using any text editor.

3. Add the environment variables and their values to the file. Write each variable on a separate line in the following format:

Here are some examples:

 NODE_ENV=development
 
 PORT=7000
 
 DATABASE_LOCAL=mongodb://127.0.0.1:27017/DatabasePet
 
 JWT_SECRET=asjdhgjed2187yhdkjawh
 
 JWT_EXPIRES_IN=90d
 
 JWT_COOKIE_EXPIRES_IN=90
 
 SERVICE_EMIL=Sendgrid
 
 EMAIL_HOST=sandbox.smtp.mailtrap.io
 
 EMAIL_PORT=222
 
 EMAIL_USERNAME=sjhajd
 
 EMAIL_PASSWORD=askbhfajs
 
 EMAIL_FROM=test@gmail.com
 
 GMAIL_USERNAME=
 
 GMAIL_PASSWORD=
 
 SENDGRID_USERNAME=
 
 SENDGRID_PASSWORD=
 

## Technologies Used
- Node.js: JavaScript runtime environment
- Express.js: Web application framework for Node.js
- Passport.js: Authentication middleware for Node.js
- JSON Web Tokens (JWT): Token-based authentication mechanism
- MongoDB: NoSQL database for data storage

## License

This project is licensed under the [MIT License](LICENSE).

Feel free to modify the code according to your specific project requirements.

