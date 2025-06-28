# 🛍️ E-Commerce Application – Frontend

This is the **frontend** of a full-featured e-commerce platform, built using **React.js**. It provides a modern, responsive user interface that supports seamless browsing, shopping, authentication, and user account management. The frontend connects to a backend API and delivers a real-world shopping experience.

---

## 🚀 Key Features (Explained)

### ✅ User Authentication

The application includes a secure and intuitive **user authentication system**:
- **Signup/Login Forms**: Users can register with email and password or log into an existing account.
- **JWT-Based Authentication**: Once logged in, a **JSON Web Token (JWT)** is issued by the backend and stored on the client side (typically in local storage). This token is attached to API requests to verify user identity.
- **Protected Routes**: Certain pages (e.g., profile, cart, dashboard) are only accessible when a valid token is present. If not authenticated, users are redirected to the login page.

---

### 🛒 Product Browsing & Shopping

Users can explore a rich catalog of products through:
- **Dynamic Product Listings**: The homepage or shop page fetches a list of products from the backend and displays them using clean, responsive product cards.
- **Filtering by Categories/Subcategories**: Sidebar or dropdown options allow users to narrow down the product view based on categories like Electronics, Fashion, etc.
- **Search Bar**: Users can type keywords (like "shoes" or "headphones") to quickly find matching products.
- **Product Details Page**: Clicking on a product navigates to a dedicated page with full details, including title, description, images, price, availability, and more.

---

### 🛍️ Shopping Cart

This feature enables a real-time cart experience:
- **Add/Remove Products**: Each product card or detail page allows users to add items to their cart.
- **Quantity Management**: Users can increase or decrease quantities of individual items directly within the cart view.
- **Live Total Calculation**: The cart dynamically calculates and displays the total amount and total number of items.
- **Cart Persistence**: Cart data remains even after page refreshes (stored in local state or local storage depending on implementation).

---

### 👤 User Dashboard

After logging in, users gain access to a personalized dashboard:
- **Profile Section**: View and update user information like name, email, or password.
- **Order History**: Displays a list of previous orders made by the user with details such as items, date, and status.
- **Wishlist and Address Book** *(Optional/Extendable)*: These are additional features that can be added to enhance the user experience.

---

### 📊 Seller Dashboard *(Optional / Future Scope)*

This is a specialized view for users with seller/admin privileges:
- **Product Management**: Sellers can add, edit, or delete their product listings.
- **Order Management**: Sellers can track orders, update delivery status, and manage customer queries.
- **Analytics**: Basic sales data visualization (e.g., total revenue, best-selling products, stock alerts).

---

## 💻 Tech Stack (Frontend) – In Detail

| Technology         | Purpose |
|--------------------|---------|
| **React.js**       | Main frontend library used to build the user interface. Enables reusable components, virtual DOM rendering, and state management using hooks like `useState` and `useEffect`. |
| **React Router**   | Manages page navigation and dynamic routing. Enables routes like `/login`, `/product/:id`, and protected routes using `Navigate` or `Outlet`. |
| **Axios**          | A lightweight HTTP client for making API calls to the backend. Supports interceptors, error handling, and token authorization headers. |
| **React-Toastify** | Used for showing success/error notifications like "Product added to cart", "Login failed", etc. Non-blocking and highly customizable. |
| **CSS**            | Handles layout, typography, and responsive styling. Can be customized or extended with SCSS, Tailwind CSS, or other frameworks as needed. |

## 📁 Folder Structure

Frontend/
├── src/
│ ├── components/ # Reusable UI components (Navbar, ProductCard, etc.)
│ ├── pages/ # Page-level views (Home, Login, Cart, etc.)
│ ├── context/ # Global state using React Context API
│ ├── utils/ # Helper functions, constants, API logic
│ └── App.jsx # Root component with route definitions
├── public/ # Static assets (favicon, index.html, etc.)
└── package.json # Project metadata and dependencies

yaml
Copy
Edit

---

## 🧭 Navigation Flow

- `/` → Home page (product listings)
- `/login` & `/register` → Auth pages
- `/product/:id` → Individual product detail page
- `/cart` → Shopping cart page
- `/dashboard/user` → User profile and orders

---

## 🛠️ Getting Started (Frontend Only)

### 📦 Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### 🔧 Installation

1. Clone the repository  
```bash
git clone <repository-url>
Navigate to the frontend directory

bash
Copy
Edit
cd Frontend
Install dependencies

bash
Copy
Edit
npm install
Start the development server

bash
Copy
Edit
npm run dev
The frontend will be running at:
http://localhost:5173

🎯 Project Goals
Deliver an intuitive and modern shopping experience

Ensure responsive design for all screen sizes

Maintain modular and scalable architecture

Integrate seamlessly with backend APIs

📬 Contact
Saurav Panigrahi
✉️ your.email@example.com
🔗 GitHub: https://github.com/yourusername/e-commerce