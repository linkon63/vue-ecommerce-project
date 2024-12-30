# Nuxt E-Commerce Project

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Firebase Configuration](#firebase-configuration)
- [Usage](#usage)
- [Admin Panel](#admin-panel)
- [Contributing](#contributing)
- [License](#license)

---

## Overview
This is a Nuxt.js-based E-commerce platform integrated with Firestore Firebase as the backend database. The platform allows users to browse products, place orders, and manage their profiles. Administrators can manage products and orders.

---

## Features
### User Features:
- User authentication with Firebase Authentication.
- View a catalog of products with detailed descriptions.
- Add products to the cart and place orders.
- View order history.

### Admin Features:
- Manage products (add, edit, delete).
- Manage user orders (view, update order status).

---

## Tech Stack
- **Frontend**: Nuxt.js, Vue.js, Tailwind CSS
- **Backend**: Firebase Firestore, Firebase Authentication
- **Deployment**: Firebase Hosting

---

## Installation

### Prerequisites
- Node.js (v14 or later)
- Firebase account

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/nuxt-ecommerce.git
   cd nuxt-ecommerce
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up Firebase:
   - Go to the [Firebase Console](https://console.firebase.google.com/).
   - Create a new project.
   - Enable Firestore Database and Firebase Authentication.
   - Configure Firebase Hosting for deployment.

4. Add Firebase configuration to the project:
   - Create a `.env` file in the root directory with the following:
     ```env
     FIREBASE_API_KEY=your-api-key
     FIREBASE_AUTH_DOMAIN=your-auth-domain
     FIREBASE_PROJECT_ID=your-project-id
     FIREBASE_STORAGE_BUCKET=your-storage-bucket
     FIREBASE_MESSAGING_SENDER_ID=your-sender-id
     FIREBASE_APP_ID=your-app-id
     ```

5. Run the development server:
   ```bash
   npm run dev
   ```

6. Access the application at `http://localhost:3000`.

---

## Project Structure
```plaintext
nuxt-ecommerce/
|-- assets/          # Static assets like images, styles, etc.
|-- components/      # Reusable Vue components
|-- layouts/         # Application layouts
|-- pages/           # Nuxt pages (e.g., Home, Product, Admin)
|-- plugins/         # Nuxt plugins (e.g., Firebase integration)
|-- store/           # Vuex store for state management
|-- static/          # Static files (e.g., favicon)
|-- nuxt.config.js   # Nuxt configuration file
|-- .env             # Environment variables
```

---

## Firebase Configuration
Make sure the following Firebase services are enabled in your project:
1. Firestore Database:
   - Create collections: `products` and `orders`.
   - Define document structures for each collection.

2. Authentication:
   - Enable Email/Password sign-in method.

3. Hosting:
   - Deploy your application using `firebase deploy`.

---

## Usage
### User:
- Sign up or log in to access the platform.
- Browse products and add them to the cart.
- Place orders and track order history.

### Admin:
- Navigate to the `/admin` panel.
- Add, edit, or delete products.
- View and manage user orders.

---

## Admin Panel
### Admin Access
To access the admin panel, ensure the logged-in user has admin privileges. Use Firestore rules or a custom `isAdmin` field in the user document to differentiate admins from regular users.

---

## Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your feature"
   ```
4. Push to the branch:
   ```bash
   git push origin feature/your-feature
   ```
5. Submit a pull request.

---

## License
This project is licensed under the MIT License. See the LICENSE file for details.

