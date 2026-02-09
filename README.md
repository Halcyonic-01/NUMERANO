# NUMERANO Feedback Application

A full-stack feedback application built with React (Vite), Node.js, Express, and MongoDB.

## Features

-   **Frontend**: React, TypeScript, Tailwind CSS, Framer Motion (for smooth animations).
-   **Backend**: Node.js, Express.js, MongoDB (Mongoose).
-   **Validation**: Frontend and Backend validation to ensure data integrity.
-   **Dockerized**: Fully containerized setup for easy deployment.

## Prerequisites

-   [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/) installed on your machine.
-   OR [Node.js](https://nodejs.org/) (v14+) and [MongoDB](https://www.mongodb.com/) for local setup.

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/numerano-feedback.git
cd numerano-feedback
```

### 2. Environment Setup

Copy the example environment file in the `server` directory and update it with your credentials:

```bash
cp server/.env.example server/.env
```

Open `server/.env` and replace `your_mongodb_atlas_connection_string` with your actual MongoDB URI.

### 3. Running with Docker (Recommended)

Run the following command to build and start the application:

```bash
docker-compose up --build
```

-   **Frontend**: [http://localhost:5173](http://localhost:5173)
-   **Backend**: [http://localhost:8000](http://localhost:8000)

### 4. Running Locally

**Backend:**

```bash
cd server
npm install
npm run dev
```

**Frontend:**

```bash
# In a new terminal
npm install
npm run dev
```

## API Endpoints

-   `POST /api/feedback`: Submit feedback.
-   `GET /api/health`: Health check.

## Project Structure

```
.
├── server/                 # Backend (Node.js/Express)
│   ├── config/             # Database configuration
│   ├── controllers/        # Route controllers
│   ├── models/             # Mongoose models
│   ├── routes/             # API routes
│   └── index.js            # Entry point
├── src/                    # Frontend (React/Vite)
├── docker-compose.yml      # Docker orchestration
└── Dockerfile              # Frontend Dockerfile
```

## Contributors

-   Kushagra Singh
