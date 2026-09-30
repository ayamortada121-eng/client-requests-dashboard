import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [requests, setRequests] = useState([]);

  const [clientName, setClientName] = useState("");
  const [description, setDescription] = useState("");

  const [message, setMessage] = useState("");

  // Fetch requests
  const getRequests = () => {
    fetch("http://localhost:5000/api/requests")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch requests");
        }

        return response.json();
      })
      .then((data) => {
        setRequests(data);
      })
      .catch((error) => {
        console.error("GET ERROR:", error);
        setMessage("Could not load requests.");
      });
  };

  // Load requests after login
  useEffect(() => {
    if (isLoggedIn) {
      getRequests();
    }
  }, [isLoggedIn]);

  // Mock login
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  // Logout
  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  // Create request
  const addRequest = () => {
    console.log("Add Request button clicked");

    if (
      clientName.trim() === "" ||
      description.trim() === ""
    ) {
      setMessage("Please enter client name and request description.");
      return;
    }

    setMessage("Adding request...");

    fetch("http://localhost:5000/api/requests", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        clientName: clientName.trim(),
        description: description.trim()
      })
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to create request");
        }

        return response.json();
      })
      .then((newRequest) => {
        console.log("New request:", newRequest);

        setRequests((currentRequests) => [
          newRequest,
          ...currentRequests
        ]);

        setClientName("");
        setDescription("");

        setMessage("Request added successfully.");
      })
      .catch((error) => {
        console.error("POST ERROR:", error);
        setMessage("Could not add request.");
      });
  };

  // Update request status
  const updateStatus = (id, status) => {
    fetch(
      `http://localhost:5000/api/requests/${id}/status`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          status: status
        })
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update status");
        }

        return response.json();
      })
      .then((updatedRequest) => {
        setRequests((currentRequests) =>
          currentRequests.map((request) =>
            request.id === id
              ? updatedRequest
              : request
          )
        );

        setMessage("Status updated successfully.");
      })
      .catch((error) => {
        console.error("PUT ERROR:", error);
        setMessage("Could not update request status.");
      });
  };

  // Login page
  if (!isLoggedIn) {
    return (
      <div className="login-page">
        <div className="login-card">

          <h1>Client Dashboard</h1>

          <p>
            Sign in to manage client requests
          </p>

          <input
            type="text"
            placeholder="Username"
          />

          <input
            type="password"
            placeholder="Password"
          />

          <button
            type="button"
            onClick={handleLogin}
          >
            Login
          </button>

        </div>
      </div>
    );
  }

  // Dashboard
  return (
    <div className="dashboard">

      <header className="header">

        <div>
          <h1>Client Requests</h1>
          <p>Internal Dashboard</p>
        </div>

        <button
          type="button"
          className="logout-button"
          onClick={handleLogout}
        >
          Logout
        </button>

      </header>


      <main className="content">

        {/* Create Request */}

        <section className="request-form">

          <h2>Create Client Request</h2>

          <div className="form-row">

            <input
              type="text"
              placeholder="Client name"
              value={clientName}
              onChange={(e) => {
                setClientName(e.target.value);
                setMessage("");
              }}
            />

            <input
              type="text"
              placeholder="Request description"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                setMessage("");
              }}
            />

            <button
              type="button"
              onClick={addRequest}
            >
              Add Request
            </button>

          </div>

          {message && (
            <p className="message">
              {message}
            </p>
          )}

        </section>


        {/* Requests Table */}

        <section className="requests-section">

          <div className="section-header">

            <h2>Client Requests</h2>

            <span>
              {requests.length} requests
            </span>

          </div>


          <div className="table-container">

            <table>

              <thead>
                <tr>
                  <th>ID</th>
                  <th>Client</th>
                  <th>Request</th>
                  <th>Status</th>
                  <th>Update Status</th>
                </tr>
              </thead>


              <tbody>

                {requests.map((request) => (

                  <tr key={request.id}>

                    <td>
                      #{request.id}
                    </td>

                    <td className="client-name">
                      {request.clientName}
                    </td>

                    <td>
                      {request.description}
                    </td>

                    <td>

                      <span
                        className={`status ${request.status
                          .toLowerCase()
                          .replace(" ", "-")}`}
                      >
                        {request.status}
                      </span>

                    </td>

                    <td>
<div className="status-buttons">

  <button
    type="button"
    className={request.status === "New" ? "active" : ""}
    onClick={() => updateStatus(request.id, "New")}
  >
    New
  </button>

  <button
    type="button"
    className={request.status === "In Progress" ? "active" : ""}
    onClick={() =>
      updateStatus(request.id, "In Progress")
    }
  >
    In Progress
  </button>

  <button
    type="button"
    className={request.status === "Done" ? "active" : ""}
    onClick={() =>
      updateStatus(request.id, "Done")
    }
  >
    Done
  </button>

</div>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>


            {requests.length === 0 && (
              <div className="empty">
                No client requests yet.
              </div>
            )}

          </div>

        </section>

      </main>

    </div>
  );
}

export default App;