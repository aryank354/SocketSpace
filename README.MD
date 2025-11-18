# SocketSpace 🚀 | Real-Time Full-Stack Chat Application

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white) ![Socket.io](https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=socketdotio&logoColor=white) ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white) ![Tailwind](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

**SocketSpace** is a robust, scalable, real-time messaging platform built with the MERN stack. It features secure HTTP-Only authentication, persistent WebSocket connections, image sharing via Cloudinary, and bot protection via Arcjet.

🔗 **[[Live Demo Link Here](https://socket-space-eight.vercel.app/)]**

---

## 📚 Table of Contents
- [Key Features](#-key-features)
- [System Architecture (HLD)](#-system-architecture-hld)
- [Database Design (LLD)](#-database-design-lld)
- [Workflows & Sequence Diagrams](#-workflows--sequence-diagrams)
- [Future Enhancements & Scalability](#-future-enhancements--scalability)
- [Installation & Setup](#-installation--setup)

---

## ✨ Key Features

*   **Real-Time Communication:** Instant messaging using **Socket.io** with live online/offline user status updates.
*   **Secure Authentication:** Custom implementation using **JWT (JSON Web Tokens)** stored in **HTTP-Only Cookies** to prevent XSS attacks.
*   **Media Support:** Seamless image uploads processed via **Cloudinary**.
*   **Security:** Integrated **Arcjet** for rate limiting and bot detection on auth routes.
*   **Responsive UI:** Built with **React, Tailwind CSS, and DaisyUI** for a mobile-first experience.
*   **State Management:** Powered by **Zustand** for efficient, hook-based global state management.

---

## 🏗 System Architecture (HLD)

SocketSpace utilizes a monolithic backend architecture serving a decoupled React frontend. It employs a hybrid communication strategy: REST API for stateless operations (Auth, Profile) and WebSockets for stateful, real-time events.

![alt text](<./Images/socket space HLD.png>)

---

## 📂 Database Design (LLD)

The data layer is built on **MongoDB**. The schema focuses on referencing users within messages to maintain data integrity while allowing for flexible population of user details.

![alt text](<./Images/socket space LLD.png>)

---

## 🔄 Workflows & Sequence Diagrams

### 1. Authentication Flow (Secure Cookie Strategy)
We avoid `localStorage` to prevent XSS.

![alt text](<./Images/socket space AUTH flow.png>)

### 2. Real-Time Message Flow
This hybrid flow ensures messages are persisted even if the socket connection drops momentarily.
![alt text](<./Images/socket space MESSAGE flow.png>)

---

## 🚀 Future Enhancements & Scalability

Currently, SocketSpace runs on a single server instance with in-memory socket storage. To scale this to **production level (100k+ users)**, the following architectural changes are planned:

### 1. Horizontal Scaling with Redis Adapter
*   **Current Limitation:** `userSocketMap` is stored in the RAM of a single server. If we spin up multiple server instances (via Docker/Kubernetes), Server A won't know that User B is connected to Server B.
*   **Solution:** Implement **Redis Adapter** for Socket.io.
*   **How it works:** Redis acts as a Pub/Sub message broker. When Server A receives a message, it publishes it to Redis. Redis forwards it to Server B, which then delivers it to the user.

### 2. Database Sharding & Caching
*   **Caching:** Implement **Redis** to cache frequently accessed data (e.g., User Profiles, Contact Lists) to reduce hits on MongoDB.
*   **Indexing:** Enforce compound indexes on `senderId` and `receiverId` for O(1) chat history retrieval.
*   **Archiving:** Implement a cron job to move messages older than 1 year to "cold storage" (Amazon S3 or MongoDB Atlas Data Lake) to keep the active collection light.

### 3. Advanced Features
*   **End-to-End Encryption (E2EE):** Implement client-side encryption using the Signal Protocol or Web Crypto API so the server (and database) only stores encrypted strings.
*   **Message Queues:** Use **RabbitMQ** or **BullMQ** to handle heavy tasks (like generating image thumbnails or sending bulk emails) asynchronously, preventing the main event loop from blocking.

---

## 💻 Installation & Setup

### Prerequisites
*   Node.js (v18+)
*   MongoDB (Local or Atlas)

### 1. Clone the Repository
```bash
git clone https://github.com/aryank354/SocketSpace.git
cd socketspace
```

### 2. Environment Setup
Create a `.env` file in the `backend` folder:
```env
PORT=5001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
NODE_ENV=development
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Run the App
```bash
# Runs both frontend and backend concurrently
npm run start
```

---

## 📄 License
Distributed under the MIT License. See `LICENSE` for more information.