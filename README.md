# Calyte

**A Mental Health & Addiction Recovery Platform**

---

## 🌿 Overview

Calyte is a full-stack monorepo application designed to support individuals dealing with **addictions and mental health challenges**.
It provides tools for tracking progress, accessing support resources, and building healthier habits through a structured and scalable system.

The project is built using a modern web stack with a clear separation between frontend, backend, and shared logic.

---

## 🧱 Project Architecture

```
Calyte/
├── client/          # React frontend (UI & user interaction)
├── server/          # Express backend (API & business logic)
└── shared/          # Shared modules (types, utilities)
```

---

## ⚙️ Tech Stack

* **Frontend:** React.js
* **Backend:** Node.js + Express
* **Shared Layer:** Common utilities, types, and interfaces
* **Optional:** Docker for containerized deployment

---

## 🧩 Core Components

### 🖥️ Client

* Built with React
* Handles user interface and experience
* Communicates with backend APIs

### 🛠️ Server

* Built with Express
* Manages API endpoints
* Handles authentication, data processing, and business logic

### 🔗 Shared

* Reusable code between client and server
* Includes:

  * Types/interfaces
  * Utility functions
  * Common configurations

---

## 🚀 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/swastii4/Calyte.git
cd Calyte
```

---

### 2. Install Dependencies

#### Client

```bash
cd client
npm install
```

#### Server

```bash
cd server
npm install
```

---

### 3. Configure Environment Variables

Create a `.env` file inside the `server/` directory:

```env
DATABASE_URL=your_database_url
API_KEY=your_api_key
PORT=5000
```

---

## ▶️ Running the Application

### Start Backend Server

```bash
cd server
npm start
```

### Start Frontend Client

```bash
cd client
npm start
```

---

## 🐳 Docker Setup (Optional)

Run the entire application using Docker:

```bash
docker-compose up --build
```

---

## 🌐 Access the Application

* Frontend → http://localhost:3000
* Backend API → http://localhost:5000

---

## 💡 Use Cases

Calyte can be used for:

* Addiction recovery tracking
* Mental health habit building
* Support system integration
* Personal progress monitoring

---

## 🔮 Future Improvements

* AI-based habit recommendations
* Chatbot support for mental health guidance
* Advanced analytics dashboard
* Mobile app integration

---

## 👩‍💻 Author

Swastika Khamaru, Vanisha Pariwal

---

## 🧠 Vision

Calyte aims to create a **safe, supportive, and structured digital environment** for individuals on their journey toward recovery and better mental well-being.

---
