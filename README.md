# API - ChatApp

API of a chat app build on **MERN**

[ChatApp link](https://github.com/milan-sony/ChatApp)

## 🗝 Key features of ChatApp

✨ TailwindCSS + Daisy UI

🔐 Authentication & Authorization with JWT

💬 Real-time messaging with Socket.io

🚀 Online user status

🔗 Global state management with Zustand

🐞 Error handling both on server and client side

## Run locally

### Clone this project

```
git clone https://github.com/milan-sony/api_chatapp.git
```

### Prerequisite

`node version: >=18.0.0 <22.11.0`

`npm version: >=8.0.0 <10.9.0`

`mongodb connection`

`cloudinary account`

### Install the packages/dependencies needed for this project

```
npm install
```

### Setup .env file

Under the root directory make a file named `.env`

```
PORT = 3000

MONGODB_URL = 

JWT_SECRET = 

NODE_ENV = development

CLOUDINARY_CLOUD_NAME = 
CLOUDINARY_API_KEY = 
CLOUDINARY_API_SECRET = 
```

### Run the project

```
npm run dev
```

## API Reference/Endpoints

#### user signup

```http
  POST /api/v1/user/signup
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `fullName` | `string` | **Required** |
| `email` | `string` | **Required** |
| `password` | `string` | **Required** |

#### user login

```http
  POST /api/v1/user/login
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email`      | `string` | **Required**|
| `password`      | `string` | **Required**|


#### get all users

```http
  GET /api/v1/user/users
```


#### user logout

```http
  POST /api/v1/user/logout
```

#### update user profile picture

```http
  PUT /api/v1/user/update_profile
```

#### check whether the user is authenticated

```http
  GET /api/v1/user/check
```

#### get all the message with a particular user

```http
  GET /api/v1/message/id
```

#### send message with particular user

```http
  POST /api/v1/message/send/id
```

