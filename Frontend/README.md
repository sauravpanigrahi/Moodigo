# E-Commerce Application

A modern e-commerce platform built with React, Node.js, and MongoDB.

## Features

- User Authentication (Signup/Login)
- Product Browsing and Filtering
- Category and Subcategory Navigation
- Product Search
- Shopping Cart Management
- Order Processing
- User Profile Management
- Seller Dashboard
- Responsive Design

## Tech Stack

### Frontend
- React.js
- React Router for navigation
- Axios for API calls
- React-Toastify for notifications
- CSS for styling

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
```

2. Install Frontend dependencies
```bash
cd Frontend
npm install
```

3. Install Backend dependencies
```bash
cd ../Backend
npm install
```

4. Set up environment variables
Create a `.env` file in the Backend directory with:
```
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=3000
```

### Running the Application

1. Start the Backend server
```bash
cd Backend
npm start
```

2. Start the Frontend development server
```bash
cd Frontend
npm run dev
```

The application will be available at `http://localhost:5173`

## Project Structure

```
Frontend/
├── src/
│   ├── components/
│   ├── pages/
│   ├── context/
│   ├── utils/
│   └── App.jsx
├── public/
└── package.json

Backend/
├── controllers/
├── models/
├── routes/
├── middleware/
└── server.js
```

## Features in Detail

### User Authentication
- Secure user registration and login
- JWT-based authentication
- Protected routes
- User session management

### Product Management
- Product listing with pagination
- Category and subcategory filtering
- Search functionality
- Product details view
- Image upload and management

### Shopping Cart
- Add/remove items
- Quantity management
- Cart persistence
- Price calculation
- Checkout process

### User Features
- Profile management
- Order history
- Address management
- Wishlist functionality

### Seller Features
- Product management
- Order management
- Sales analytics
- Inventory tracking

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

Your Name - your.email@example.com
Project Link: [https://github.com/yourusername/e-commerce](https://github.com/yourusername/e-commerce)
