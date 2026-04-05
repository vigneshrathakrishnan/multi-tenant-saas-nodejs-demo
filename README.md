# 🚀 Multi-Tenant SaaS Demo (Node.js + React)

This project demonstrates a minimal multi-tenant SaaS architecture with proper tenant isolation, relational data modeling, and a lightweight dashboard for visualization.

---

## 🧠 Overview

The system simulates a SaaS platform where:

- Each tenant represents a store (e.g., Amazon, Flipkart)
- Users belong to a specific tenant
- Orders are created under users
- All operations are strictly scoped using `tenantId`

This ensures complete data isolation between tenants.

---

## ✨ Features

- 🔐 Tenant-based authentication
- 👤 Users scoped under tenants
- 📦 Orders linked to users
- 🔄 Bulk user & order creation APIs
- 🔍 Data isolation enforced via `tenantId`
- ⚡ MongoDB relationships using `ObjectId` + `populate()`
- 🖥️ Minimal React dashboard for visualization

---

## 🏗️ Architecture

- Each authenticated user carries a `tenantId`
- All database queries are filtered using `tenantId`
- Orders are linked to users via `ObjectId`
- Mongoose `populate()` is used to resolve relational data

---

## 📂 Project Structure

multi-tenant-saas-demo/
│
├── backend/      # Node.js + Express + MongoDB
├── frontend/     # React (Vite) dashboard
├── docs/         # API documentation
├── README.md
└── .gitignore

---

## 🛠️ Tech Stack

- Backend: Node.js, Express.js
- Database: MongoDB (Mongoose)
- Frontend: React (Vite)
- Auth: JWT-based authentication

---

## ⚙️ Setup Instructions

### Backend

cd backend  
npm install  
npm run dev  

Create a `.env` file:

PORT=5000  
MONGO_URI=your_mongodb_connection_string  
JWT_SECRET=your_secret_key  

---

### Frontend

cd frontend  
npm install  
npm run dev  

---

## 🔗 API Documentation

Refer to: docs/api-endpoints.md

Includes:
- Authentication APIs
- User APIs (single + bulk)
- Order APIs (single + bulk)

---

## 📊 Demo Flow

1. Register/Login as a tenant (store owner)
2. Bulk create users via API
3. Bulk create orders mapped to users
4. View users and their orders in dashboard

---

## 🎥 Demo Video

(Add demo video link here)

---

## 📌 Key Highlights

- Tenant isolation enforced at query level
- Optimized bulk operations using insertMany
- Efficient user mapping for order creation
- Clean separation between backend and frontend

---

## 👤 Author

Vignesh Kumar Radhakrishnan
https://www.linkedin.com/in/vigneshrdev

---

## 📬 Notes

This project was built to demonstrate practical understanding of multi-tenant architecture and backend system design using Node.js.     