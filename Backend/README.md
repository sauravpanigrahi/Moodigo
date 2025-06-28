# 🛠️ E-Commerce Backend

This is the **backend server** for a full-stack e-commerce application. It is built using **Node.js** and **Express.js**, and provides all core functionalities such as **user authentication**, **product management**, **order processing**, and **address handling**. The backend communicates with a **MongoDB** database using **Mongoose** and follows a modular folder structure to ensure scalability and maintainability.

---

## 🚀 Overview

The backend serves as the foundation of the platform, exposing RESTful API endpoints that interact with the database and perform all business logic operations. These include creating and managing users, products, orders, handling file uploads, securing endpoints with JWT tokens, validating incoming requests, and more.

This backend is designed with scalability and security in mind, using modern best practices such as **rate limiting**, **input validation**, **password encryption**, and **secure headers**.

---

## 💻 Technologies Used

### ⚙️ Core Technologies
- **Node.js**: A fast and scalable JavaScript runtime environment used for server-side logic.
- **Express.js**: A lightweight web application framework that simplifies API development with robust routing and middleware support.
- **MongoDB**: A NoSQL document-oriented database used to store data like users, products, and orders.
- **Mongoose**: An ODM (Object Data Modeling) library for MongoDB that helps define schemas and models for easy database interaction.
- **JWT (JSON Web Tokens)**: Used for implementing stateless authentication and route protection.

### 🔐 Security & Authentication Tools
- **bcrypt**: A library for hashing user passwords before storing them in the database.
- **jsonwebtoken**: Handles the generation and verification of JWT tokens for user sessions.
- **cors**: Middleware to enable cross-origin requests between the frontend and backend.
- **helmet**: Adds secure HTTP headers to prevent common vulnerabilities.
- **express-rate-limit**: Protects the server from brute-force and DDoS attacks by limiting repeated requests from a single IP.

### 📦 Data Validation & Processing
- **express-validator**: Middleware to validate and sanitize incoming HTTP request data.
- **multer**: Middleware for handling multipart/form-data, used primarily for image uploads (e.g., product images).
- **sharp**: Used to process and optimize images uploaded via `multer`.

---

## 📦 Key Features (Explained)

### 👥 User Management
- **Registration & Login**: Allows users to create accounts and securely log in using hashed passwords.
- **JWT-based Sessions**: On login, a token is generated and used to authenticate all subsequent requests from the client.
- **Profile Management**: Users can view and update their profile information securely.
- **Address Book Management**: Users can add, edit, and delete their saved delivery addresses for streamlined checkout.

### 🛍️ Product Management
- **CRUD Operations**: Admins or sellers can create, update, delete, and fetch product data.
- **Image Uploading**: Images for products can be uploaded and processed using `multer` and `sharp`.
- **Category Handling**: Products are assigned categories and subcategories to support filtering on the frontend.
- **Inventory Management**: Stock quantities can be tracked and updated with each order (future-ready).

### 🔐 Security Features
- **Token-based Authentication**: Only users with valid JWT tokens can access protected routes.
- **Password Hashing**: User passwords are encrypted before storing in the database to ensure privacy.
- **Rate Limiting**: Repeated or abusive requests from the same IP are throttled.
- **Input Validation**: All incoming data is checked for expected format and sanitized before processing.
- **CORS Protection**: Ensures only allowed origins (like your frontend) can access the backend APIs.

---

## 🚀 Getting Started

### Prerequisites
Before you begin, ensure you have the following installed on your system:
- **Node.js** (v14 or higher)
- **MongoDB** (Local or MongoDB Atlas)
- **npm** or **yarn** (Package manager)

### Installation Steps

1. **Clone the repository**
```bash
git clone <repository-url>
cd Backend
Install the dependencies

bash
Copy
Edit
npm install
# or
yarn install
Configure Environment Variables
Create a .env file in the root of the Backend directory and add the following:

ini
Copy
Edit
PORT=3000
MONGODB_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your_jwt_secret
Start the Development Server

bash
Copy
Edit
nodemon app.js
# or
yarn start
Your server will now be running locally at:
http://localhost:3000
Or at the deployed link (e.g., Render):
https://moodigo-96i1.onrender.com

📁 Project Structure
bash
Copy
Edit
Backend/
├── src/
│   ├── config/        # MongoDB connection & environment setup
│   ├── controllers/   # Business logic for API routes
│   ├── middleware/    # Auth middleware, error handlers, validators
│   ├── models/        # Mongoose schemas for users, products, orders
│   ├── routes/        # Express route definitions
│   ├── utils/         # Utility functions like token generation
│   └── app.js         # Main entry point of the application
├── uploads/           # Directory to store uploaded files (e.g., images)
└── package.json       # Dependencies and scripts
🔗 API Endpoints
🔐 Authentication
POST /api/auth/register – Create a new user account

POST /api/auth/login – Login and receive a JWT

GET /api/auth/check-auth – Verify JWT and return user info

POST /api/auth/logout – Invalidate the token (handled on client)

🛒 Products
GET /api/products – Get list of all products

GET /api/products/:id – Get detailed info for a single product

POST /api/products – Add a new product (requires authentication)

PUT /api/products/:id – Edit an existing product

DELETE /api/products/:id – Delete a product

📦 Orders
GET /api/orders – View all orders placed by a user

POST /api/orders – Place a new order

GET /api/orders/:id – View order details by ID

PUT /api/orders/:id – Update order status (e.g., Shipped, Delivered)

🏠 Address
GET /api/address – Get all saved addresses of a user

POST /api/address – Add a new address

PUT /api/address/:id – Update an existing address

DELETE /api/address/:id – Delete an address

🤝 Contributing
We welcome contributions to this project! To contribute:

Fork the repository

Create a new branch

bash
Copy
Edit
git checkout -b feature/YourFeatureName
Make your changes and commit

bash
Copy
Edit
git commit -m "Add your feature"
Push to your fork

bash
Copy
Edit
git push origin feature/YourFeatureName
Open a Pull Request and describe your changes

📝 License
This project is licensed under the MIT License. See the LICENSE file for details.

👥 Author
Saurav Panigrahi – Full-stack developer and creator of the project