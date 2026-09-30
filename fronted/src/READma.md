# Client Requests Dashboard

A simple full-stack internal dashboard built for the Full Stack Developer Technical Evaluation.

The application allows users to log in with a mock login, view client requests, create new requests, and update request statuses.

## Tech Stack

### Frontend
- React
- Vite
- JavaScript
- CSS

### Backend
- Node.js
- Express.js
- CORS

### Database
- SQLite

## Features

- Mock login page
- Internal dashboard
- View client requests in a table
- Create a new client request
- Update request status
- Request statuses:
  - New
  - In Progress
  - Done
- Persistent data using SQLite
- Frontend and backend are separated
- REST API communication between frontend and backend
- Responsive layout for smaller screens
- Basic validation for client requests
- Basic error handling

## Project Structure

```text
fullstack/
│
├── fronted/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   ├── package.json
│   └── ...
│
├── backend/
│   ├── database.js
│   ├── server.Js
│   ├── package.json
│   └── requests.db
│
├── .gitignore
└── README.md