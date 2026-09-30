\# Client Requests Dashboard



A simple full-stack internal dashboard built for the Full Stack Developer Technical Evaluation.



The application allows users to log in with a mock login, view client requests, create new requests, and update request statuses.



\## Tech Stack



\### Frontend



\* React

\* Vite

\* JavaScript

\* CSS



\### Backend



\* Node.js

\* Express.js

\* CORS



\### Database



\* SQLite



\## Features



\* Mock login page

\* Internal dashboard

\* View client requests in a table

\* Create a new client request

\* Update request status

\* Request statuses:



&#x20; \* New

&#x20; \* In Progress

&#x20; \* Done

\* Persistent data using SQLite

\* Frontend and backend are separated

\* REST API communication between frontend and backend

\* Responsive layout for smaller screens

\* Basic validation for client requests

\* Basic error handling



\## Project Structure



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

```



\## How the Application Works



The frontend is built with React and communicates with the backend using HTTP requests.



The general data flow is:



```text

User

&#x20; ↓

React Frontend

&#x20; ↓

REST API

&#x20; ↓

Express Backend

&#x20; ↓

SQLite Database

&#x20; ↓

Express Backend

&#x20; ↓

JSON Response

&#x20; ↓

React State

&#x20; ↓

Dashboard

```



For example, when a user creates a client request:



1\. The user enters the client name and request description.

2\. React sends a POST request to the backend.

3\. Express receives the request.

4\. The backend stores the request in SQLite.

5\. The backend returns the created request.

6\. React updates its state and displays the new request in the table.



\## API Endpoints



\### GET Requests



Fetch all client requests.



```http

GET /api/requests

```



\### POST Request



Create a new client request.



```http

POST /api/requests

```



Example request body:



```json

{

&#x20; "clientName": "Ahmad",

&#x20; "description": "Website update"

}

```



New requests are created with:



```json

{

&#x20; "status": "New"

}

```



\### PUT Request Status



Update the status of a client request.



```http

PUT /api/requests/:id/status

```



Example request body:



```json

{

&#x20; "status": "In Progress"

}

```



Allowed statuses are:



```text

New

In Progress

Done

```



\## Setup Instructions



\### 1. Clone the Repository



```bash

git clone https://github.com/ayamortada121-eng/client-requests-dashboard.git

```



\### 2. Open the Project



```bash

cd client-requests-dashboard

```



\### 3. Install Frontend Dependencies



Open a terminal and run:



```bash

cd fronted

npm install

```



\### 4. Start the Frontend



```bash

npm run dev

```



The frontend will normally run at:



```text

http://localhost:5173

```



\### 5. Install Backend Dependencies



Open another terminal:



```bash

cd backend

npm install

```



\### 6. Start the Backend



```bash

node server.Js

```



The backend will run at:



```text

http://localhost:5000

```



The SQLite database is created automatically when the backend starts.



\## Testing the Application



After starting both the frontend and backend:



1\. Open the frontend in the browser.

2\. Use the mock login.

3\. Create a client request.

4\. Confirm that the request appears in the table.

5\. Change the request status from `New` to `In Progress`.

6\. Change it from `In Progress` to `Done`.

7\. Refresh the page.

8\. Confirm that the request and its status are still stored in the database.



\## Basic Error Handling



The backend validates required fields when creating a request.



If the client name or description is missing, the API returns a `400` response.



The backend also returns appropriate responses when:



\* A request does not exist

\* An invalid status is provided

\* A database error occurs



The frontend displays basic messages when loading, creating, or updating requests fails.



\## Database



SQLite is used for this evaluation because it is lightweight and simple to run locally.



The database contains a `requests` table with:



| Field       | Type    | Description            |

| ----------- | ------- | ---------------------- |

| id          | INTEGER | Unique request ID      |

| clientName  | TEXT    | Client name            |

| description | TEXT    | Request description    |

| status      | TEXT    | Current request status |



The database file is generated locally and is not required to be committed to the repository.



\## Production Considerations



This project is intentionally minimal for the technical evaluation.



For a production system, I would consider:



\* Real authentication and authorization

\* Environment variables for configuration

\* Stronger request validation

\* Centralized error handling

\* Logging and monitoring

\* Pagination when the number of requests grows

\* Database indexes for frequently queried fields

\* Automated frontend and backend tests

\* Production database hosting

\* HTTPS

\* API security and rate limiting

\* A deployment pipeline



\## Author



\*\*Aya Mortada\*\*



Full Stack Developer Technical Evaluation



