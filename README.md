# The Peoples Review Backend

The Peoples Review is a full-stack web application that allows users to post and make reviews on items they purchase from any website.

This project is built using the ==MERN stack== (MongoDB, Express.js, React, and Node.js).

[Fontend in seperate repo:] https://github.com/JerrySpann1970/the-peoples-review-front-end.git

# **MVP Features**
---
- JWT-based user registration and login
- Post products for review
- Edit and Delete product for review
- Add personal reviews

 # **Tech Stack**

- Frontend: React (Vite)
- Backend: Node.js, Express
- Database: MongoDB (hosted on MongoDB Atlas)
- Authentication: JSON Web Tokens (JWT)

# Express JWT Auth Template

## About

This repo is an Express JWT Auth template meant to be paired with a front-end app utilizing JWT tokens.

## Getting started

Fork and clone this repository to your local machine.

After moving into the cloned directory, run `npm i` to download the dependencies.

Create a `.env` file in the root of the project:

```bash
touch .env
```

and add your MongoDB URI and a secret JWT string to it. Your MongoDB URI will look something like the first entry, but with your username and password:

```plaintext
MONGODB_URI=mongodb+srv://<username>:<password>@sei.azure.mongodb.net/myApp?retryWrites=true
JWT_SECRET=supersecret
```

Start the app in your terminal with:

``` sh
npm run dev
```

