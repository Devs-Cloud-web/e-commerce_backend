# E-commerce Backend API

A fully functional backend for an e-commerce application built using **Node.js, Express, and MongoDB**, featuring authentication, cart management, order processing, and payment integration.

---

## Features

* User Authentication (JWT-based login/register)
* Product Management (CRUD operations, admin access)
* Cart System (add, update, remove items)
* Order Management with stock validation
* Razorpay Payment Integration (with secure verification)
* Input Validation & Error Handling
* Security Middleware (Helmet, CORS)
* Admin functionalities (manage products/orders)

---

## Tech Stack

* **Backend:** Node.js, Express.js
* **Database:** MongoDB, Mongoose
* **Authentication:** JWT
* **Payment:** Razorpay
* **Middleware:** Helmet, Morgan, CORS

---

## Project Structure

```
ecommerce-backend/
│
├── config/         # Database connection
├── controllers/    # Business logic
├── models/         # Mongoose schemas
├── routes/         # API routes
├── middlewares/    # Auth & validation
├── validators/     # Input validation logic
├── utils/          # Helper functions (e.g., Razorpay)
│
├── server.js
├── package.json
├── .env (not included)
└── README.md
```

---

## Installation & Setup

### 1. Clone the repository

```
git clone https://github.com/YOUR_USERNAME/ecommerce-backend.git
cd ecommerce-backend
```

### 2. Install dependencies

```
npm install
```

### 3. Create `.env` file

```
PORT=3000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_secret
RAZORPAY_KEY_ID=your_key
RAZORPAY_KEY_SECRET=your_secret
```

### 4. Run the server

```
npm run dev
```

---

## API Endpoints

### Auth

* `POST /api/auth/register`
* `POST /api/auth/login`
* `POST /api/auth/logout`

### Products

* `GET /api/products/info`
* `POST /api/products` (Admin)
* `PUT /api/products/update` (Admin)
* `POST /api/products/delete` (Admin)

### Cart

* `GET /api/cart/cartinfo`
* `POST /api/cart/add`
* `PUT /api/update`
* `POST /api/cart/delete`
* `POST /api/cart/clear`

### Orders

* `POST /api/orders/placeorder`
* `GET /api/orders/history`
* `GET /api/orders/allorders` (Admin)
* `PUT /api/orders/statusupdate`

### Payment

* `POST /api/orders/payment`

---

## Security Features

* Password hashing
* JWT authentication
* Input validation middleware
* HTTP security headers (Helmet)
* CORS protection

---

## Key Learnings

* Designed RESTful APIs with proper structure
* Implemented secure payment verification using HMAC
* Handled async operations and error management
* Applied validation and middleware-based architecture

---

## Future Improvements

* Wishlist feature
* Product reviews & ratings
* Deployment with CI/CD

---

## Author

Devansh Kumar Singh

---

## If you like this project

Give it a ⭐ on GitHub!
