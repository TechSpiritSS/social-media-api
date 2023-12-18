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
   git clone https://github.com/username/repo.git
   ```

2. Install the dependencies:

   ```bash
   cd your-repo
   npm install
   ```

3. Create a `.env` file in the root directory of the project and add the following:

   ```env
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/
   JWT_SECRET=secret-key
   EMAIL=email@gmail.com
   PASSWORD=email-password
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
| `/api/posts/new`        | POST   | Create a new post                           |
| `/api/posts/all`        | GET    | Get all posts                               |
| `/api/posts/me`         | GET    | Get posts created by the authenticated user |
| `/api/posts/me/:postId` | GET    | Get a specific post by ID                   |
| `/api/posts/me/:postId` | PUT    | Update a post by ID                         |
| `/api/posts/me/:postId` | DELETE | Delete a post by ID                         |

### Like Routes

| Endpoint          | Method | Description           |
| ----------------- | ------ | --------------------- |
| `/api/posts/like` | POST   | Toggle like on a post |

### Comment Routes

| Endpoint              | Method | Description                |
| --------------------- | ------ | -------------------------- |
| `/api/posts/comment`  | POST   | Add a comment to a post    |
| `/api/posts/comment/` | DELETE | Delete a comment on a post |
| `/api/posts/comment`  | PUT    | Update a comment on a post |

### Password Reset Routes

| Endpoint                      | Method | Description                                     |
| ----------------------------- | ------ | ----------------------------------------------- |
| `/api/users/forgot-password`  | POST   | Request a password reset                        |
| `/api/users/set-new-password` | POST   | Set a new password after receiving a reset code |

## Database

This project uses MongoDB as the database. Make sure to have a MongoDB server running and update the `MONGO_URI` in the `.env` file.

## Authentication

Authentication is done using JSON Web Tokens (JWT). The JWT secret is stored in the `.env` file. The JWT is generated when a user logs in or registers. The JWT is then used to authenticate the user for protected routes.

## Error Handling

Errors are handled using a custom error handler middleware. Detailed error messages are provided in development mode.

## Sample User Routes

### Register User

#### Create a New User

Create a new user account.

**URL**: `POST /api/users/register`

**Headers**:

- `Content-Type: application/json`

**Authorization**:

- Bearer Token (Not required for registration)

**Body**:

```json
{
  "name": "Sidharth Sethi",
  "email": "sidharth.sherry@gmail.com",
  "username": "techspiritss",
  "password": "securepassword"
}
```

#### Example Request (HTTPS JS API)

```javascript
const requestOptions = {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Sidharth Sethi',
    email: 'sidharth.sherry@gmail.com',
    username: 'techspiritss',
    password: 'securepassword',
  }),
};

fetch('https://localhost:3000/api/users', requestOptions)
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error('Error:', error));
```

#### Example Response

```json
{
  "success": "User registered",
  "username": "techspiritss",
  "token": "eyJhbGciOiJIUzI1NiIsIn..."
}
```

### Login User

#### User Login

Log in with a registered user account.

**URL**: `POST /api/users/login`

**Headers**:

- `Content-Type: application/json`

**Authorization**:

- Bearer Token (Not required for login)

**Body**:

```json
{
  "email": "sidharth.sherry@gmail.com",
  "password": "securepassword"
}
```

#### Example Request (HTTPS JS API)

```javascript
const requestOptions = {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'sidharth.sherry@gmail.com',
    password: 'securepassword',
  }),
};

fetch('https://localhost:3000/api/users/login', requestOptions)
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error('Error:', error));
```

#### Example Response

```json
{
  "success": "Logged in",
  "username": "techspiritss",
  "token": "eyJhbGciOiJIUzI1NiIsIn..."
}
```

### Forgot Password

#### Request Password Reset

Initiate the password reset process.

**URL**: `POST /api/users/forgot-password`

**Headers**:

- `Content-Type: application/json`

**Authorization**:

- Bearer Token (Not required for password reset)

**Body**:

```json
{
  "email": "sidharth.sherry@gmail.com"
}
```

#### Example Request (HTTPS JS API)

```javascript
const requestOptions = {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'sidharth.sherry@gmail.com',
  }),
};

fetch('https://localhost:3000/api/users/forgot-password', requestOptions)
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error('Error:', error));
```

#### Example Response

```json
{
  "success": "A code has been sent to your email. Please check and use it."
}
```

### Set New Password

#### Set New Password

Set a new password after the password reset process.

**URL**: `POST /api/users/set-new-password`

**Headers**:

- `Content-Type: application/json`

**Authorization**:

- Bearer Token (Not required for setting a new password)

**Body**:

```json
{
  "email": "sidharth.sherry@gmail.com",
  "newPassword": "newsecurepassword",
  "code": 1234
}
```

#### Example Request (HTTPS JS API)

```javascript
const requestOptions = {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'sidharth.sherry@gmail.com',
    newPassword: 'newsecurepassword',
    code: 1234,
  }),
};

fetch('https://localhost:3000/api/users/set-new-password', requestOptions)
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error('Error:', error));
```

#### Example Response

```json
{
  "success": "Password updated successfully!"
}
```

## Post Routes

### Get All Posts

Get all the posts from all users.

**URL**: `GET /api/posts/all`

**Headers**:

- `Authorization`: Bearer Token

#### Example Request (HTTPS JS API)

```javascript
const requestOptions = {
  method: 'GET',
  headers: {
    Authorization: 'Bearer YOUR_TOKEN',
  },
};

fetch('https://localhost:3000/api/posts/all', requestOptions)
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error('Error:', error));
```

#### Example Response

```json
[
  {
    "_id": "6580bd1c6a007fbc371a0996",
    "user": {
      "_id": "6580bc636a007fbc371a0993",
      "name": "Sidharth Sethi",
      "username": "sidharth_sethi"
    },
    "title": "Amazing Travel Adventure",
    "category": "Travel",
    "description": "I recently had an incredible travel adventure to a beautiful destination. The landscapes were breathtaking, and I can't wait to share my experience with you!",
    "createdAt": "2023-12-18T21:43:56.574Z",
    "updatedAt": "2023-12-18T21:43:56.798Z",
    "__v": 0,
    "comments": {
      "_id": "6580bd1c6a007fbc371a099a",
      "comment": [
        {
          "user": "6580bc636a007fbc371a0993",
          "comment": " I had a great adventure there too!!!",
          "_id": "6580be206a007fbc371a0a26"
        },...
      ]
    },
    "likes": {
      "_id": "6580bd1c6a007fbc371a0998",
      "like": [
        {
          "user": "6580bc636a007fbc371a0993",
          "_id": "6580d0d92c6ca9d992cd320e"
        }...
      ]
    }...
  },
```

### Get My Posts

Get all of the logged-in user's posts.

**URL**: `GET /api/posts/me`

**Headers**:

- `Authorization`: Bearer Token

#### Example Request (HTTPS JS API)

```javascript
const requestOptions = {
  method: 'GET',
  headers: {
    Authorization: 'Bearer YOUR_TOKEN',
  },
};

fetch('https://localhost:3000/api/posts/me', requestOptions)
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error('Error:', error));
```

#### Example Response

```json
[
  {
    "_id": "6580bd1c6a007fbc371a0996",
    "user": {
      "_id": "6580bc636a007fbc371a0993",
      "name": "Sidharth Sethi",
      "username": "sidharth_sethi"
    },
    "title": "Amazing Travel Adventure",
    "category": "Travel",
    "description": "I recently had an incredible travel adventure to a beautiful destination. The landscapes were breathtaking, and I can't wait to share my experience with you!",
    "createdAt": "2023-12-18T21:43:56.574Z",
    "updatedAt": "2023-12-18T21:43:56.798Z",
    "__v": 0,
    "comments": {
      "_id": "6580bd1c6a007fbc371a099a",
      "comment": [
        {
          "user": "6580bc636a007fbc371a0993",
          "comment": " I had a great adventure there too!!!",
          "_id": "6580be206a007fbc371a0a26"
        },...
      ]
    },
    "likes": {
      "_id": "6580bd1c6a007fbc371a0998",
      "like": [
        {
          "user": "6580bc636a007fbc371a0993",
          "_id": "6580d0d92c6ca9d992cd320e"
        }...
      ]
    }...
  },
```

### Get My Post By Id

Gets the user's posts and then looks for the entered id.

**URL**: `GET /api/posts/me/:postId`

**Headers**:

- `Authorization`: Bearer Token

#### Example Request (HTTPS JS API)

```javascript
const requestOptions = {
  method: 'GET',
  headers: {
    Authorization: 'Bearer YOUR_TOKEN',
  },
};

fetch(
  'https://localhost:3000/api/posts/me/6580bd1c6a007fbc371a0996',
  requestOptions
)
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error('Error:', error));
```

#### Example Response

```json
[
  {
    "_id": "6580bd1c6a007fbc371a0996",
    "user": {
      "_id": "6580bc636a007fbc371a0993",
      "name": "Sidharth Sethi",
      "username": "sidharth_sethi"
    },
    "title": "Amazing Travel Adventure",
    "category": "Travel",
    "description": "I recently had an incredible travel adventure to a beautiful destination. The landscapes were breathtaking, and I can't wait to share my experience with you!",
    "createdAt": "2023-12-18T21:43:56.574Z",
    "updatedAt": "2023-12-18T21:43:56.798Z",
    "__v": 0,
    "comments": {
      "_id": "6580bd1c6a007fbc371a099a",
      "comment": [
        {
          "user": "6580bc636a007fbc371a0993",
          "comment": " I had a great adventure there too!!!",
          "_id": "6580be206a007fbc371a0a26"
        },
        {
          "user": "6580bc636a007fbc371a0993",
          "comment": "HOHOHOHOHOOHOHOHO",
          "_id": "6580be2f6a007fbc371a0a2a"
        },
        {
          "user": "6580bc636a007fbc371a0993",
          "comment": "Best!!!!!!!!",
          "_id": "6580be436a007fbc371a0a31"
        },
        {
          "user": "6580bc636a007fbc371a0993",
          "comment": "Best!!!!!!!!",
          "_id": "6580c9239511002753257e04"
        },
        {
          "user": "6580bc636a007fbc371a0993",
          "comment": "Niceeee",
          "_id": "6580d1272c6ca9d992cd3213"
        }
      ]
    },
    "likes": {
      "_id": "6580bd1c6a007fbc371a0998",
      "like": [
        {
          "user": "6580bc636a007fbc371a0993",
          "_id": "6580d0d92c6ca9d992cd320e"
        }
      ]
    }
  }
]
```

#### Get a Single Post

Gets a post based on the id entered in the URL.

**URL**: `GET /api/posts/all/:postId`

**Headers**:

- `Authorization`: Bearer Token

#### Example Request (HTTPS JS API)

```javascript
const requestOptions = {
  method: 'GET',
  headers: {
    Authorization: 'Bearer YOUR_TOKEN',
  },
};

fetch(
  'https://localhost:3000/api/posts/all/6580bd1c6a007fbc371a0996',
  requestOptions
)
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error('Error:', error));
```

#### Example Response

```json
{
  "_id": "6580bd1c6a007fbc371a0996",
  "user": {
    "_id": "6580bc636a007fbc371a0993",
    "name": "Sidharth Sethi",
    "username": "sidharth_sethi"
  },
  "title": "Amazing Travel Adventure",
  "category": "Travel",
  "description": "I recently had an incredible travel adventure to a beautiful destination. The landscapes were breathtaking, and I can't wait to share my experience with you!",
  "createdAt": "2023-12-18T21:43:56.574Z",
  "updatedAt": "2023-12-18T21:43:56.798Z",
  "__v": 0,
  "comments": {
    "_id": "6580bd1c6a007fbc371a099a",
    "comment": [
      {
        "user": "6580bc636a007fbc371a0993",
        "comment": " I had a great adventure there too!!!",
        "_id": "6580be206a007fbc371a0a26"
      },
      {
        "user": "6580bc636a007fbc371a0993",
        "comment": "HOHOHOHOHOOHOHOHO",
        "_id": "6580be2f6a007fbc371a0a2a"
      },
      {
        "user": "6580bc636a007fbc371a0993",
        "comment": "Best!!!!!!!!",
        "_id": "6580be436a007fbc371a0a31"
      },
      {
        "user": "6580bc636a007fbc371a0993",
        "comment": "Best!!!!!!!!",
        "_id": "6580c9239511002753257e04"
      },
      {
        "user": "6580bc636a007fbc371a0993",
        "comment": "Niceeee",
        "_id": "6580d1272c6ca9d992cd3213"
      }
    ]
  },
  "likes": {
    "_id": "6580bd1c6a007fbc371a0998",
    "like": [
      {
        "user": "6580bc636a007fbc371a0993",
        "_id": "6580d0d92c6ca9d992cd320e"
      }
    ]
  }
}
```

### POST

#### Create a Post

Logged-in user can create a new post.

**URL**: `POST /api/posts/new`

**Headers**:

- `Content-Type`: application/json
- `Authorization`: Bearer Token

#### Example Request (HTTPS JS API)

```javascript
const requestOptions = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Bearer YOUR_TOKEN',
  },
  body: JSON.stringify({
    title: 'Maldives Adventure',
    category: 'Travel',
    description: 'This was the most wonderful adventure I have been on.',
  }),
};

fetch('https://localhost:3000/api/posts/new', requestOptions)
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error('Error:', error));
```

#### Example Response

```json
{
  "_id": "6580d71c2c6ca9d992cd3236",
  "user": {
    "_id": "6580bc636a007fbc371a0993",
    "name": "Sidharth Sethi",
    "username": "sidharth_sethi"
  },
  "title": "Fitness Journey Begins",
  "category": "Life Advice",
  "description": "Embarking on a fitness journey to prioritize health and well-being. Small steps lead to significant transformations.",
  "createdAt": "2023-12-18T23:34:52.957Z",
  "updatedAt": "2023-12-18T23:34:53.097Z",
  "__v": 0,
  "comments": {
    "_id": "6580d71d2c6ca9d992cd323a",
    "comment": []
  },
  "likes": {
    "_id": "6580d71d2c6ca9d992cd3238",
    "like": []
  }
}
```

### PUT

#### Edit a Post

Logged-in user can update his post.

**URL**: `PUT /api/posts/me/:postId`

**Headers**:

- `Content-Type`: application/json
- `Authorization`: Bearer Token

#### Example Request (HTTPS JS API)

```javascript
const requestOptions = {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Bearer YOUR_TOKEN',
  },
  body: JSON.stringify({
    title: 'Mumbai Adventures',
  }),
};

fetch(
  'https://localhost:3000/api/posts/me/6580bd1c6a007fbc371a0996',
  requestOptions
)
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error('Error:', error));
```

#### Example Response

```json
{
  "_id": "6580bd1c6a007fbc371a0996",
  "user": {
    "_id": "6580bc636a007fbc371a0993",
    "name": "Sidharth Sethi",
    "username": "sidharth_sethi"
  },
  "title": "Fitness Journey Begins",
  "category": "Life Advice",
  "description": "Embarking on a fitness journey to prioritize health and well-being. Small steps lead to significant transformations.",
  "createdAt": "2023-12-18T21:43:56.574Z",
  "updatedAt": "2023-12-18T23:35:56.782Z",
  "__v": 0,
  "comments": {
    "_id": "6580bd1c6a007fbc371a099a",
    "comment": [
      {
        "user": "6580bc636a007fbc371a0993",
        "comment": " I had a great adventure there too!!!",
        "_id": "6580be206a007fbc371a0a26"
      },
      {
        "user": "6580bc636a007fbc371a0993",
        "comment": "HOHOHOHOHOOHOHOHO",
        "_id": "6580be2f6a007fbc371a0a2a"
      },
      {
        "user": "6580bc636a007fbc371a0993",
        "comment": "Best!!!!!!!!",
        "_id": "6580be436a007fbc371a0a31"
      },
      {
        "user": "6580bc636a007fbc371a0993",
        "comment": "Best!!!!!!!!",
        "_id": "6580c9239511002753257e04"
      },
      {
        "user": "6580bc636a007fbc371a0993",
        "comment": "Niceeee",
        "_id": "6580d1272c6ca9d992cd3213"
      }
    ]
  },
  "likes": {
    "_id": "6580bd1c6a007fbc371a0998",
    "like": [
      {
        "user": "6580bc636a007fbc371a0993",
        "_id": "6580d0d92c6ca9d992cd320e"
      }
    ]
  }
}
```

### DELETE

#### Delete a Post

Logged-in user can delete his post by passing in the Id in the URL.

**URL**: `DELETE /api/posts/me/:postId`

**Headers**:

- `Authorization`: Bearer Token

#### Example Request (HTTPS JS API)

```javascript
const requestOptions = {
  method: 'DELETE',
  headers: {
    'Authorization': 'Bearer YOUR_TOKEN

'
  },
};

fetch('https://localhost:3000/api/posts/me/6580bd1c6a007fbc371a0996', requestOptions)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
```

#### Example Response

```json
{
  "success": true
}
```

## Like Routes

### Toggle Like

#### Like/Unlike a Post

Toggle like on a post. If the user has already liked the post, it unlikes it, and vice versa.

**URL**: `POST /api/posts/like`

**Headers**:

- `Content-Type: application/json`
- Bearer Token (Authorization)

**Body**:

```json
{
  "postId": "6580bd3f6a007fbc371a09a8"
}
```

#### Example Request (HTTPS JS API)

```javascript
const requestOptions = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Bearer YOUR_TOKEN',
  },
  body: JSON.stringify({
    postId: '6580bd1c6a007fbc371a0996',
  }),
};

fetch('https://localhost:3000/api/posts/like', requestOptions)
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error('Error:', error));
```

#### Example Response

```json
{
  "message": "The post has been unliked",
  "Number of likes on this post": 0
}

OR

{
  "Number of likes on this post": 1
}
```

## Comment Routes

### Add Comment

#### Add a Comment to a Post

Add a new comment to a post.

**URL**: `POST /api/posts/comment`

**Headers**:

- `Content-Type: application/json`
- Bearer Token (Authorization)

**Body**:

```json
{
  "postId": "6580bd1c6a007fbc371a0996",
  "comment": "Amazing post!"
}
```

#### Example Request (HTTPS JS API)

```javascript
const requestOptions = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Bearer YOUR_TOKEN',
  },
  body: JSON.stringify({
    postId: '6580bd1c6a007fbc371a0996',
    comment: 'Amazing post!',
  }),
};

fetch('https://localhost:3000/api/posts/comment, requestOptions)
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error('Error:', error));
```

#### Example Response

```json
{
  "_id": "6580bd1c6a007fbc371a0996",
  "comment": [
    {
      "_id": "6298c1aaa8a0d999b83eb68b",
      "user": "user123",
      "comment": "Amazing post!"
    }
  ]
}
```

### Update Comment

#### Update a Comment on a Post

Update an existing comment on a post.

**URL**: `PUT /api/posts/comment`

**Headers**:

- `Content-Type: application/json`
- Bearer Token (Authorization)

**Body**:

```json
{
  "postId": "6580bd1c6a007fbc371a0996",
  "commentId": "6298c1aaa8a0d999b83eb68b",
  "comment": "Updated comment!"
}
```

#### Example Request (HTTPS JS API)

```javascript
const requestOptions = {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Bearer YOUR_TOKEN',
  },
  body: JSON.stringify({
    postId: '6580bd1c6a007fbc371a0996',
    commentId: '6298c1aaa8a0d999b83eb68b',
    comment: 'Updated comment!',
  }),
};

fetch('https://localhost:3000/api/posts/comment', requestOptions)
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error('Error:', error));
```

#### Example Response

```json
{
  "success": "Comment updated",
  "allCommentsOnThisPost": {
    "_id": "6580bd1c6a007fbc371a0996",
    "comment": [
      {
        "_id": "6298c1aaa8a0d999b83eb68b",
        "user": "user123",
        "comment": "Updated comment!"
      }
    ]
  }
}
```

### Delete Comment

#### Delete a Comment from a Post

Delete a comment from a post.

**URL**: `DELETE /api/posts/comment/`

**Headers**:

- `Content-Type: application/json`
- Bearer Token (Authorization)

**Body**:

```json
{
  "postId": "6580bd1c6a007fbc371a0996",
  "commentId": "6298c1aaa8a0d999b83eb68b"
}
```

#### Example Request (HTTPS JS API)

```javascript
const requestOptions = {
  method: 'DELETE',
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Bearer YOUR_TOKEN',
  },
  body: JSON.stringify({
    postId: '6580bd1c6a007fbc371a0996',
    commentId: '6298c1aaa8a0d999b83eb68b',
  }),
};

fetch('https://localhost:3000/api/posts/comment/', requestOptions)
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error('Error:', error));
```

#### Example Response

```json
{
  "success": "Comment deleted"
}
```
