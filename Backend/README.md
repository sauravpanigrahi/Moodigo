# E-Commerce Backend

## 🚀 Overview
This is the backend server for our e-commerce platform, built with Node.js and Express. It provides a robust API for handling user authentication, product management, order processing, and more.

## 🛠️ Technologies Used

### Core Technologies
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling tool
- **JWT** - For authentication and authorization

### Security & Authentication
- **bcrypt** - Password hashing
- **jsonwebtoken** - JWT token generation and verification
- **cors** - Cross-Origin Resource Sharing
- **helmet** - Security middleware
- **express-rate-limit** - Rate limiting

### Data Validation & Processing
- **express-validator** - Request validation
- **multer** - File upload handling
- **sharp** - Image processing

## 📦 Key Features

### User Management
- User registration and authentication
- Profile management
- Address management
- Session handling

### Product Management
- CRUD operations for products
- Product categorization
- Image upload and processing
- Inventory management

<!-- ### Order Processing
- Order creation and management
- Payment integration
- Order status tracking
- Order history -->

### Security Features
- JWT-based authentication
- Password encryption
- Rate limiting
- Input validation
- CORS protection

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn package manager

### Installation
1. Clone the repository
```bash
git clone [repository-url]
cd Backend
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory with the following variables:
```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your_jwt_secret
```

4. Start the server
```bash
nodemon app.js
# or
yarn start
```

The server will be available at `http://localhost:3000`

## 📁 Project Structure
```
Backend/
├── src/
│   ├── config/        # Configuration files
│   ├── controllers/   # Route controllers
│   ├── middleware/    # Custom middleware
│   ├── models/        # Database models
│   ├── routes/        # API routes
│   ├── utils/         # Utility functions
│   └── app.js         # Main application file
├── uploads/           # File upload directory
└── package.json       # Project dependencies
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/check-auth` - Check authentication status
- `POST /api/auth/logout` - User logout

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Orders
- `GET /api/orders` - Get user orders
- `POST /api/orders` - Create new order
- `GET /api/orders/:id` - Get order details
- `PUT /api/orders/:id` - Update order status

### Address
- `GET /api/address` - Get user addresses
- `POST /api/address` - Add new address
- `PUT /api/address/:id` - Update address
- `DELETE /api/address/:id` - Delete address

## 🤝 Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License
This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Authors
- Your Name - Initial work

## 🙏 Acknowledgments
- Express.js team for the amazing framework
- MongoDB team for the powerful database
- All open-source contributors 