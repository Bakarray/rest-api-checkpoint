```markdown
# REST API Checkpoint Project

A complete REST API built with Node.js, Express, and Mongoose for managing users in a MongoDB database.

## 📋 Project Overview

This project demonstrates the implementation of a RESTful API with full CRUD operations:

- GET: Retrieve all users
- POST: Create a new user
- PUT: Update an existing user
- DELETE: Remove a user

## 📁 Project Structure
```

rest-api-checkpoint/
│
├── config/
│ └── .env # Environment variables
├── models/
│ └── User.js # Mongoose User model
├── package.json # Project dependencies and scripts
└── server.js # Main server file with API routes

````

## 🚀 Setup Instructions

### Prerequisites
- Node.js installed
- MongoDB database (local or MongoDB Atlas)
- Postman (for API testing)

### Installation Steps

1. **Clone or create the project directory:**
   ```bash
   mkdir rest-api-checkpoint
   cd rest-api-checkpoint
````

2. **Initialize the project:**

   ```bash
   npm init -y
   ```

3. **Install required dependencies:**

   ```bash
   npm install express mongoose dotenv
   ```

4. **Create the project files with the provided code**

### Environment Configuration

Create a `config/.env` file with your MongoDB connection string:

```env
# For local MongoDB
MONGO_URI=mongodb://localhost:27017/userdb

# For MongoDB Atlas (replace with your credentials)
# MONGO_URI=mongodb+srv://username:password@cluster0.mongodb.net/userdb

PORT=3000
```

## ▶️ Running the Application

Start the server:

```bash
npm start
```

For development with auto-restart (requires nodemon):

```bash
npm run dev
```

The API will be available at: `http://localhost:3000`

## 🔄 API Endpoints

| Method | Endpoint         | Description         |
| ------ | ---------------- | ------------------- |
| GET    | `/api/users`     | Retrieve all users  |
| POST   | `/api/users`     | Create a new user   |
| PUT    | `/api/users/:id` | Update a user by ID |
| DELETE | `/api/users/:id` | Delete a user by ID |

### Example Requests

#### GET All Users

```bash
curl http://localhost:3000/api/users
```

#### POST Create User

```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "age": 30,
    "city": "New York"
  }'
```

#### PUT Update User

```bash
curl -X PUT http://localhost:3000/api/users/USER_ID \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Smith",
    "age": 31
  }'
```

#### DELETE User

```bash
curl -X DELETE http://localhost:3000/api/users/USER_ID
```

## 🧪 Testing with Postman

1. Open Postman
2. Create requests for each endpoint:
   - **GET** `http://localhost:3000/api/users`
   - **POST** `http://localhost:3000/api/users` (with JSON body)
   - **PUT** `http://localhost:3000/api/users/:id` (with JSON body)
   - **DELETE** `http://localhost:3000/api/users/:id`

## 🛠️ Features

- **Mongoose Schema Validation**:

  - Name: Required, max 50 characters
  - Email: Required, unique, valid email format
  - Age: Number between 0-120
  - City: Optional string

- **Error Handling**:

  - Validation errors
  - Duplicate email handling
  - Invalid ID format handling
  - User not found handling

- **RESTful Design**:
  - Proper HTTP status codes
  - Consistent JSON responses
  - Resource-based URL structure

## 📦 Dependencies

- **express**: Web framework for Node.js
- **mongoose**: MongoDB object modeling
- **dotenv**: Environment variable management

## 🎯 Learning Outcomes

This project demonstrates:

- Setting up a Node.js REST API
- Connecting to MongoDB with Mongoose
- Implementing CRUD operations
- Environment configuration management
- Error handling in Express
- REST API best practices
- API testing with Postman

## 📝 Notes

- All code is properly commented for clarity
- Follows REST API conventions
- Implements proper HTTP status codes
- Includes comprehensive error handling
- Uses environment variables for configuration
- Validated data models with Mongoose schemas

```

```
# rest-api-checkpoint
