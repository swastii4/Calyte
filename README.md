# Calyte

## Overview
Calyte is a monorepo project that consists of three main components: a client, a server, and shared code modules. This documentation will guide you through understanding the project structure, setting up your local environment, and using the application.

## Project Structure
The project structure is organized as follows:

```
Calyte/
├── client/          # React frontend
├── server/          # Express backend
└── shared/          # Shared code between client and server
```

### Client
The `client` directory contains the React application. It is responsible for rendering the user interface and handling user interactions.

### Server
The `server` directory includes the Express application, which handles API requests and interacts with the database.

### Shared
The `shared` directory contains code that is shared between the client and server, such as types, interfaces, and other common utilities.

## Setup Instructions
To set up the project locally, follow these steps:

1. **Clone the Repository**  
   ```bash
   git clone https://github.com/swastii4/Calyte.git
   cd Calyte
   ```

2. **Install Dependencies**  
   - For the client:
   ```bash
   cd client
   npm install
   ```
   - For the server:
   ```bash
   cd server
   npm install
   ```

3. **Setting Up Environment Variables**  
   Create a `.env` file in the `server` directory and set your environment variables (e.g., database URL, API keys).

4. **Running the Application**  
   - To start the server:
   ```bash
   cd server
   npm start
   ```
   - To start the client:
   ```bash
   cd client
   npm start
   ```

## Dockerized Setup
Calyte can also be run using Docker. To set up the containers, follow these steps:

1. **Build the Docker Images**  
   ```bash
   docker-compose up --build
   ```

2. **Access the Application**  
   Both the client and server will be accessible through the defined ports in the `docker-compose.yml` file.

## Usage
Once the application is running, you can:
- Access the client at `http://localhost:3000`
- Make requests to the server APIs (check the API documentation for available endpoints).



