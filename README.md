# 🚄 Express.js

A simple API built with **Express.js**, **Mongoose (MongoDB)**, and **JWT** authentication.

## Features

- User authentication (JWT)
- CRUD operations for books
- TypeScript for type safety

## Setup

1. Install dependencies:
   ```sh
   npm install
   ```
2. Create a `.env` file:
   ```env
   MONGODB_URL=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   PORT=5000
   ```
3. Start the server:
   ```sh
   npm run dev
   ```

## Endpoints

- **GET** `/books` – Get all the books
- **GET** `/books/:id` – Get a book by ID
- **POST** `/books` – Add a book
- **PUT** `/books/:id` – Update a book by ID
- **DELETE** `/books/:id` – Delete a book by ID
- **POST** `/auth/register` – Register as a user
- **POST** `/auth/login` – Login as a user to get the token

Check `TODO.md` for planned improvements.
