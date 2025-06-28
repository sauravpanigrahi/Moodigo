### 🛍️ Moodigo Application – Frontend

This is the **frontend** of a full-featured e-commerce platform, built using **React.js**. It provides a modern, responsive user interface that supports seamless browsing, shopping, authentication, and user account management. The frontend connects to a backend API and delivers a real-world shopping experience.

---
### 🚀 Key Features

## ✅ User Authentication
- The application includes a secure and intuitive user authentication system:
- **Signup/Login Forms**: Users can register with email and password or log into an existing account.
- **JWT-Based Authentication**: Once logged in, a JSON Web Token (JWT) is issued by the backend and stored on the client side (usually in local storage). This token is attached to API requests to verify user identity.
- **Protected Routes**: Certain pages (e.g., profile, cart, dashboard) are only accessible when a valid token is present. If not authenticated, users are redirected to the login page.
---

### 🛒 Product Browsing & Shopping
- Users can explore a rich catalog of products through:
- **Dynamic Product Listings**: The homepage or shop page fetches a list of products from the backend and displays them using clean, responsive product cards.
- **Filtering by Categories/Subcategories**: Sidebar or dropdown options allow users to narrow down the product view based on categories like Electronics, Fashion, etc.
- **Search Bar**: Users can type keywords (like "shoes" or "headphones") to quickly find matching products.
- **Product Details Page**: Clicking on a product navigates to a dedicated page with full details, including title, description, images, price, availability, and more.
---

### 🛍️ Shopping Cart
- This feature enables a real-time cart experience:
- **Add/Remove Products**: Each product card or detail page allows users to add items to their cart.
- **Quantity Management**: Users can increase or decrease quantities of individual items directly within the cart view.
- **Live Total Calculation**: The cart dynamically calculates and displays the total amount and total number of items.
- **Cart Persistence**: Cart data remains even after page refreshes (stored in local state or local storage depending on implementation).
---

### 👤 User Dashboard
- After logging in, users gain access to a personalized dashboard:
- **Profile Section**: View and update user information like name, email, or password.
- **Order History**: Displays a list of previous orders made by the user with details such as items, date, and status.
- **Wishlist and Address Book (Optional/Extendable)**: These are additional features that can be added to enhance the user experience.
---

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

3. Start the Frontend development server
```bash

npm run dev
```

The application will be available at `http://localhost:5173`


## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### 👥 Author
Saurav Panigrahi – Full-stack developer and creator of the project


