# 🛒 Store Rating App

A full-stack, database-driven web application that allows users to rate and review stores. Designed with a modern UI, scalable backend, and relational database support.

---

## 🌟 Overview

The Store Rating App provides a user-friendly platform for submitting, viewing, and managing store reviews. It includes features like average rating calculations, persistent storage, and an interactive frontend dashboard with dynamic data rendering.

---
## 🚀 Live Demo

🌐 Frontend: [https://store-rating-app-frontend.onrender.com](https://store-rating-app-frontend.onrender.com)

---

## 🚀 Tech Stack

| Layer       | Technology                    |
|-------------|-------------------------------|
| Frontend    | React, Tailwind CSS, React Router |
| Backend     | Node.js, Express.js, REST API |
| Database    | MySQL                         |
| State Mgmt  | useState, useEffect (React Hooks) |
| Auth (optional) | JWT                        |

---

## 🧱 Project Structure

```bash
Store_Rating/
├── backend/               # Express server, routes, controllers, DB config
│   ├── config/
│   ├── controllers/
│   ├── routes/
│   ├── models/            # Optional: for Sequelize/ORM usage
│   └── server.js
├── frontend/              # React client app
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── utils/         # (Optional) for API helpers, constants
│       └── App.js
└── README.md
````

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/Store_Rating_App.git
cd Store_Rating_App
```

---

### 2. Configure Environment Variables

Inside the `backend/` directory, create a `.env` file with the following keys:

```env
DB_HOST=your_host
DB_USER=your_user
DB_PASSWORD=your_password
DB_NAME=your_database
PORT=5000
JWT_SECRET=your_secret
```

---

### 3. Backend Setup

```bash
cd backend
npm install
node server.js
```

---

### 4. Frontend Setup

```bash
cd ../frontend
npm install
npm start
```

---

## 📊 Database Schema

The app uses relational tables such as:

* `stores` - stores being rated
* `ratings` - individual ratings linked to stores
* `users` *(optional)* - for authentication (if implemented)

You can import your database via `.sql` file using phpMyAdmin or CLI tools.

---

## ✨ Features

* 🔍 Browse and rate stores
* 📊 View average ratings
* 🧭 Intuitive sidebar navigation
* ⚡ Fast, responsive UI
* 📡 API-driven architecture
* 🛠️ Easily deployable and scalable

---

## 🧪 Future Enhancements (Ideas)

* User authentication (JWT + bcrypt)
* Search and filter functionality
* Admin panel for managing stores/ratings
* Mobile responsiveness and PWA support
* Pagination and sorting

---

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss.

---

## 👨‍💻 Author

**Rohit Gudasi**
🔗 [GitHub Profile](https://github.com/Rohit-Gudasi)

---
