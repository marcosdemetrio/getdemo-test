# Technical Test for Getdemo: Demo Viewer App

This is a full-stack app for viewing and editing HTML demos, built using React on the Frontend, Express.js on the Backend and SQLite as the database.

## 🛠 Technologies

### Frontend

- React with TypeScript
- Redux Toolkit for state management
- TailwindCSS for styling
- Vite as build tool

### Backend

- Node.js with Express
- TypeScript
- Sequelize ORM
- SQLite database

## 🚀 Getting Started

### Prerequisites

- Node.js (>=10.16.3)
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone <repository-url>
cd project-name
```

2. Backend Setup

```bash
cd backend
npm install
npm run seed
npm start
```

The backend will run on http://localhost:3001

3. Frontend Setup (in a new terminal)

```bash
cd frontend
npm install
npm run dev
```

The frontend will run on http://localhost:5173

## 🎯 Features

- View list of demos
- Navigate through demo frames
- Edit frame HTML content with double-click
- Real-time content updates

### State Management

- Redux Toolkit Query for API calls
- Real-time updates with automatic cache invalidation
- Type-safe API endpoints

## 📝 License

This project is licensed under the MIT License.
