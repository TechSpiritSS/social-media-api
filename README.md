# Node.js API - Banao

Node.js API for Banao, a platform for sharing posts and experiences.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Requirements](#requirements)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Database](#database)
- [Authentication](#authentication)
- [Error Handling](#error-handling)
- [Sample User Routes](#sample-user-routes)

## Introduction

This Node.js API serves as the backend for the Banao platform. It allows users to register, login, create, and manage posts. Additionally, it provides features like liking posts, adding comments, and resetting passwords.

## Features

- User registration and authentication
- Post creation, retrieval, and management
- Like and unlike posts
- Add and delete comments on posts
- Forgot password functionality with email confirmation

## Requirements

- Node.js
- MongoDB
- NPM (Node Package Manager)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/your-repo.git
   ```

2. Install the dependencies:

   ```bash
   cd your-repo
   npm install
   ```

3. Create a `.env` file in the root directory of the project and add the following:

   ```env
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/your-database
   JWT_SECRET=your-secret-key
   EMAIL=your-email@gmail.com
   PASSWORD=your-email-password
   ```

4. Run the application:

   ```bash
   npm start
   ```

## Usage

The API can be accessed at `http://localhost:3000/`.

## API Endpoints

### User Routes

| Endpoint              | Method | Description            |
| --------------------- | ------ | ---------------------- |
| `/api/users/register` | POST   | Register a new user    |
| `/api/users/login`    | POST   | Login an existing user |
| `/api/users/profile`  | GET    | Get user profile       |

### Post Routes

| Endpoint                | Method | Description                                 |
| ----------------------- | ------ | ------------------------------------------- |
| `/api/posts/create`     | POST   | Create a new post                           |
| `/api/posts/all`        | GET    | Get all posts                               |
| `/api/posts/:id`        | GET    | Get a specific post by ID                   |
| `/api/posts/mine`       | GET    | Get posts created by the authenticated user |
| `/api/posts/:id/update` | PUT    | Update a post by ID                         |
| `/api/posts/:id/delete` | DELETE | Delete a post by ID                         |

### Like Routes

| Endpoint            | Method | Description           |
| ------------------- | ------ | --------------------- |
| `/api/likes/toggle` | POST   | Toggle like on a post |

### Comment Routes

| Endpoint               | Method | Description                |
| ---------------------- | ------ | -------------------------- |
| `/api/comments/add`    | POST   | Add a comment to a post    |
| `/api/comments/delete` | DELETE | Delete a comment on a post |
| `/api/comments/update` | PUT    | Update a comment on a post |

### Password Reset Routes

| Endpoint                | Method | Description                                     |
| ----------------------- | ------ | ----------------------------------------------- |
| `/api/forgot-password`  | POST   | Request a password reset                        |
| `/api/set-new-password` | POST   | Set a new password after receiving a reset code |

## Database

This project uses MongoDB as the database. Make sure to have a MongoDB server running and update the `MONGO_URI` in the `.env` file.

## Authentication

Authentication is done using JSON Web Tokens (JWT). The JWT secret is stored in the `.env` file. The JWT is generated when a user logs in or registers. The JWT is then used to authenticate the user for protected routes.

## Error Handling

Errors are handled using a custom error handler middleware. Detailed error messages are provided in development mode.

## Sample User Routes

### Register User

#### Request

```http
POST /api/users/register
```

```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "username": "johndoe",
  "password": "securepassword"
}
```

#### Response

```json
{
  "success": "User registered",
  "username": "johndoe",
  "token": "eyJhbGciOiJIUzI1NiIsIn..."
}
```

### Login User

#### Request

```http
POST /api/users/login
```

```json
{
  "email": "john.doe@example.com",
  "password": "securepassword"
}
```

#### Response

```json
{
  "success": "Logged in",
  "username": "johndoe",
  "token": "eyJhbGciOiJIUzI1NiIsIn..."
}
```

### Get User Profile

#### Request

```http
GET /api/users/profile
```

#### Response

```json
{
  "success": "User details fetched",
  "name": "John Doe",
  "username": "johndoe"
}
```

## Post Routes

### Create Post

#### Request

```http
POST /api/posts/create
```

```json
{
  "title": "My First Post",
  "category": "Travel",
  "description": "This is the content of my first post."
}
```

#### Response

```json
{
  "_id": "609d77e4f5275422a056ea0a",
  "user": {
    "name": "John Doe",
    "username": "johndoe"
  },
  "title": "My First Post",
  "category": "Travel",
  "description": "This is the content of my first post.",
  "likes": { "_id": "609d77e4f5275422a056ea0b", "like": [] },
  "comments": { "_id": "609d77e4f5275422a056ea0c", "comment": [] },
  "createdAt": "2021-05-13T14:17:00.628Z",
  "updatedAt": "2021-05-13T14:17:00.628Z",
  "__v": 0
}
```

### Get All Posts

#### Request

```http
GET /api/posts/all
```

#### Response

```json
[
  {
    "_id": "609d77e4f5275422a056ea0a",
    "user": {
      "name": "John Doe",
      "username": "johndoe"
    },
    "title": "My First Post",
    "category": "Travel",
    "description": "This is the content of my first post.",
    "likes": { "_id": "609d77e4f5275422a056ea0b", "like": [] },
    "comments": { "_id": "609d77e4f5275422a056ea0c", "comment": [] },
    "createdAt": "2021-05-13T14:17:00.628Z",
    "updatedAt": "2021-05-13T14:17:00.628Z",
    "__v": 0
  }
  // ... more posts
]
```

### Get Post by ID

#### Request

```http
GET /api/posts/:id
```

#### Response

```json
{
  "_id": "609d77e4f5275422a056ea0a",
  "user": {
    "name": "John Doe",
    "username": "johndoe"
  },
  "title": "My First Post",
  "category": "Travel",
  "description": "This is the content of my first post.",
  "likes": { "_id": "609d77e4f5275422a056ea0b", "like": [] },
  "comments": { "_id": "609d77e4f5275422a056ea0c", "comment": [] },
  "createdAt": "2021-05-13T14:17:00.628Z",
  "updatedAt": "2021-05-13T14:17:00.628Z",
  "__v": 0
}
```

### Get User's Posts

#### Request

```http
GET /api/posts/mine
```

#### Response

```json
[
  {
    "_id": "609d77e4f5275422a056ea0a",
    "user": {
      "name": "John Doe",
      "username": "johndoe"
    },
    "title": "My First Post",
    "category": "Travel",
    "description": "This is the content of my first post.",
    "likes": { "_id": "609d77e4f5275422a056ea0b", "like": [] },
    "comments": { "_id": "609d77e4f5275422a056ea0c", "comment": [] },
    "createdAt": "2021-05-13T14:17:00.628Z",
    "updatedAt": "2021-05-13T14:17:00.628Z",
    "__v": 0
  }
  // ... more posts
]
```

### Update Post by ID

#### Request

```http
PUT /api/posts/:id/update
```

```json
{
  "title": "Updated Post Title",
  "category": "Life Advice",
  "description": "This is the updated content of my post."
}
```

#### Response

```json
{
  "_id": "609d77e4f

5275422a056ea0a",
  "user": {
    "name": "John Doe",
    "username": "johndoe"
  },
  "title": "Updated Post Title",
  "category": "Life Advice",
  "description": "This is the updated content of my post.",
  "likes": { "_id": "609d77e4f5275422a056ea0b", "like": [] },
  "comments": { "_id": "609d77e4f5275422a056ea0c", "comment": [] },
  "createdAt": "2021-05-13T14:17:00.628Z",
  "updatedAt": "2021-05-14T08:30:00.000Z",
  "__v": 0
}
```

### Delete Post by ID

#### Request

```http
DELETE /api/posts/:id/delete
```

#### Response

```json
{
  "success": true
}
```

## Like Routes

### Toggle Like

#### Request

```http
POST /api/likes/toggle
```

```json
{
  "postId": "609d77e4f5275422a056ea0a"
}
```

#### Response

```json
{
  "message": "The post has been unliked",
  "Number of likes on this post": 0
}
```

## Comment Routes

### Add Comment

#### Request

```http
POST /api/comments/add
```

```json
{
  "postId": "609d77e4f5275422a056ea0a",
  "comment": "Great post!"
}
```

#### Response

```json
{
  "_id": "609d77e4f5275422a056ea0a",
  "comment": [
    {
      "user": "609d77e4f5275422a056ea0d",
      "comment": "Great post!",
      "_id": "609d77e4f5275422a056ea0e"
    }
  ]
}
```

### Delete Comment

#### Request

```http
DELETE /api/comments/delete
```

```json
{
  "postId": "609d77e4f5275422a056ea0a",
  "commentId": "609d77e4f5275422a056ea0e"
}
```

#### Response

```json
{
  "success": "Comment deleted"
}
```

### Update Comment

#### Request

```http
PUT /api/comments/update
```

```json
{
  "postId": "609d77e4f5275422a056ea0a",
  "commentId": "609d77e4f5275422a056ea0e",
  "comment": "Updated comment!"
}
```

#### Response

```json
{
  "success": "Comment updated",
  "allCommentsOnThisPost": {
    "_id": "609d77e4f5275422a056ea0a",
    "comment": [
      {
        "user": "609d77e4f5275422a056ea0d",
        "comment": "Updated comment!",
        "_id": "609d77e4f5275422a056ea0e"
      }
    ]
  }
}
```

## Password Reset Routes

### Request Password Reset

#### Request

```http
POST /api/forgot-password
```

```json
{
  "email": "john.doe@example.com"
}
```

#### Response

```json
{
  "success": "A code has been sent to your email. Please check and use it."
}
```

### Set New Password

#### Request

```http
POST /api/set-new-password
```

```json
{
  "email": "john.doe@example.com",
  "newPassword": "newsecurepassword",
  "code": 1234
}
```

#### Response

```json
{
  "success": "Password updated successfully!"
}
```

Feel free to reach out if you have any questions or need further clarification on any of the API routes.
