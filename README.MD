
# SocketSpace ✨: Real-Time Full-Stack Chat Application
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white) ![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white) ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white) ![Socket.io](https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=socketdotio&logoColor=white) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white) ![DaisyUI](https://img.shields.io/badge/DaisyUI-5A0EF8?style=for-the-badge&logo=daisyui&logoColor=white) ![Zustand](https://img.shields.io/badge/Zustand-000000?style=for-the-badge&logo=react&logoColor=white) ![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white) ![Resend](https://img.shields.io/badge/Resend-000000?style=for-the-badge&logo=resend&logoColor=white) ![Arcjet](https://img.shields.io/badge/Arcjet-0A0A0A?style=for-the-badge&logo=arcjet&logoColor=white) ![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
## Executive Summary

SocketSpace is a high-performance, full-stack chat application engineered to provide a seamless, real-time messaging experience. This project demonstrates a robust, modern architecture using the MERN stack (MongoDB, Express, React, Node.js) and features custom JWT authentication, real-time communication via Socket.io, and integration with third-party services for email notifications and media handling. The platform is designed to be scalable, secure, and user-friendly, showcasing a comprehensive skill set in full-stack development.

-----
## 📌 Live Demo

[🚀 Click here to view the deployed project](https://SocketSpace-287av.sevalla.app/)
----

## ✨ Features & Technical Implementation

| Feature | ⚙️ Technical Implementation |
| :--- | :--- |
| **🔐 Custom JWT Authentication** | Implements a secure, stateless authentication system using **JSON Web Tokens (JWT)**. The backend (`backend/src/controllers/auth.controller.js`) handles user sign-up and login, hashing passwords with **bcrypt**, and issuing signed tokens. A custom middleware (`backend/src/middleware/auth.middleware.js`) protects API routes by verifying the JWT on incoming requests. |
| **⚡ Real-Time Messaging** | Leverages **Socket.io** for persistent, bidirectional communication between the client and server. The server (`backend/src/lib/socket.js`) manages user connections, listens for new message events, and broadcasts messages in real-time to the appropriate recipients, ensuring instantaneous delivery. |
| **🟢 Online/Offline Presence** | Real-time presence is managed through Socket.io's connection and disconnection events. When a user connects, their status is broadcast to all other clients. The frontend UI dynamically updates to show who is currently online, enhancing user engagement. |
| **📨 Welcome Emails on Signup** | Integrates with **Resend** to send automated welcome emails upon successful user registration. This logic is handled server-side within the `signup` controller (`backend/src/emails/emailHandlers.js`), which is triggered after a new user is created in the database. |
| **🗂️ Image Uploads** | Implements seamless image sharing by integrating **Cloudinary** for cloud-based media storage. When a user sends an image, the file is securely uploaded from the client to the server, which then streams it to the Cloudinary API, returning a URL that is stored with the message in MongoDB. |
| **🎨 Modern, Responsive Frontend** | The UI is built with **React** and styled with **Tailwind CSS** and the **DaisyUI** component library. This combination allows for rapid development of a beautiful, responsive, and mobile-first interface. State is managed efficiently on the client-side with **Zustand**. |
| **🚦 API Rate-Limiting** | Protects the backend from brute-force attacks and abuse by integrating **Arcjet** for intelligent rate-limiting. A dedicated middleware (`backend/src/middleware/arcjet.middleware.js`) inspects incoming requests to the authentication endpoints and enforces limits. |
| **🧰 Robust REST API** | The backend is a well-structured RESTful API built with **Node.js** and **Express**. It features a modular design with clear separation of concerns for routes (`/routes`), controllers (`/controllers`), and database models (`/models`), ensuring maintainability and scalability. |


-----

## 🏗️ System Architecture

A high-level overview of the SocketSpace architecture, showing the client-server interaction and integration with external services.

```
SocketSpace/
├── 📁 backend/
│   ├── 📁 src/
│   │   ├── 📁 controllers/   # Request handling logic (auth, messages)
│   │   ├── 📁 middleware/   # Auth verification, rate-limiting
│   │   ├── 📁 models/       # MongoDB schemas (User, Message)
│   │   ├── 📁 routes/       # API route definitions
│   │   ├── 📁 lib/          # Service initializations (DB, Sockets)
│   │   └── 📄 server.js     # Main server entry point
│   └── 📄 .env.example
├── 📁 frontend/
│   ├── 📁 src/
│   │   ├── 📁 components/   # Reusable React components
│   │   ├── 📁 pages/        # Page components (Login, Signup, Chat)
│   │   ├── 📁 store/        # Zustand state management stores
│   │   └── 📄 App.jsx       # Main application component
└── 📄 package.json          # Root scripts for deployment
```

### Architectural Breakdown

  * **Client-Side (Frontend)**
    The frontend is a dynamic Single-Page Application (SPA) built with **React**. It handles all user interface elements, routing, and client-side state.

      * **UI Components:** The interface is built with **React** and styled with **Tailwind CSS** and **DaisyUI** for a modern, responsive design.
      * **State Management:** Global state, such as user authentication status and chat data, is managed with **Zustand** for a lightweight and efficient solution.
      * **API Communication:** The client communicates with the backend via a **REST API** for authentication and fetching data, using **Axios** for HTTP requests. Real-time messaging is handled through a persistent **Socket.io** connection.

  * **Server-Side (Backend)**
    The backend is built with **Node.js** and **Express**, serving a dual purpose: providing a REST API for core functionalities and managing real-time connections.

      * **REST API:** Exposes endpoints for user authentication (`/api/auth`) and message history (`/api/messages`).
      * **Real-time Layer:** A **Socket.io** server is integrated with the Express server to manage WebSocket connections, handling real-time events like new messages, typing indicators, and user presence.
      * **Database:** **MongoDB** is used as the data store, with **Mongoose** as the ODM for defining schemas for Users and Messages.

  * **External Services**
    SocketSpace integrates with several external services to provide enhanced functionality:

      * **Resend:** Handles the delivery of transactional emails, such as welcome messages.
      * **Cloudinary:** Manages the storage and delivery of user-uploaded images.
      * **Arcjet:** Provides security and rate-limiting for critical API endpoints.

-----

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

Make sure you have the following installed on your machine:

  * Git
  * Node.js (v20.0.0 or later)
  * npm (Node Package Manager)
  * A running MongoDB instance (local or Atlas)

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/AkshayTiwari27/SocketSpace.git
    cd SocketSpace
    ```
2.  **Install backend dependencies:**
    ```sh
    cd backend
    npm install
    ```
3.  **Install frontend dependencies:**
    ```sh
    cd ../frontend
    npm install
    ```

### Set up environment variables

Create a `.env` file in the `/backend` directory. Refer to the `.env.example` file and the section below for the required variables.

### Running the Project

1.  **Run the Backend Server:**
    ```sh
    cd backend
    npm run dev
    ```
2.  **Run the Frontend Development Server:**
    ```sh
    cd frontend
    npm run dev
    ```

Open `http://localhost:5173` in your browser to view the project.

-----

## 🔐 Environment Variables

To run this project locally, create a `.env` file in the `/backend` directory and add the following variables. You can obtain keys by creating free accounts on MongoDB Atlas, Cloudinary, Resend, and Arcjet.

```env
# Server Configuration
PORT=3000
NODE_ENV=development
CLIENT_URL=http://localhost:5173

# MongoDB Connection
MONGO_URI=your_mongodb_connection_string

# JWT Secret
JWT_SECRET=your_super_secret_jwt_key

# Resend API for Emails
RESEND_API_KEY=your_resend_api_key
EMAIL_FROM=your_email_from_address
EMAIL_FROM_NAME=your_email_from_name

# Cloudinary for Image Uploads
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Arcjet for Rate Limiting
ARCJET_KEY=your_arcjet_key
ARCJET_ENV=development
```

-----

## 📈 Known Issues & Future Improvements

### Known Issues

  * Currently, there are no known major issues.

### Future Improvements

  * **Group Chat Functionality:** Implement the ability for users to create and join group conversations.
  * **Read Receipts:** Add indicators to show when a message has been delivered and read by the recipient.
  * **Message Editing & Deletion:** Allow users to edit or delete their sent messages.
  * **End-to-End Encryption:** Introduce an extra layer of security with client-side encryption.

-----

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you'd like to contribute, please follow these steps:

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'feat: Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

We appreciate your effort in making this project better\! 🙌

-----

## 📜 License

This project is licensed under the **MIT License** – see the `LICENSE` file for details.
