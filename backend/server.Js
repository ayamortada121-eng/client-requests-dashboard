const express = require("express");
const cors = require("cors");
const db = require("./database");

const app = express();

app.use(cors());
app.use(express.json());


// Home
app.get("/", (req, res) => {
  res.send("Client Requests API is working!");
});


// GET - Fetch all client requests
app.get("/api/requests", (req, res) => {
  db.all(
    "SELECT * FROM requests ORDER BY id DESC",
    [],
    (error, rows) => {
      if (error) {
        console.error("GET ERROR:", error.message);

        return res.status(500).json({
          message: error.message
        });
      }

      res.json(rows);
    }
  );
});


// POST - Create a new client request
app.post("/api/requests", (req, res) => {
  console.log("POST REQUEST RECEIVED");

  const { clientName, description } = req.body;

  if (
    !clientName ||
    clientName.trim() === "" ||
    !description ||
    description.trim() === ""
  ) {
    return res.status(400).json({
      message: "Client name and description are required"
    });
  }

  const sql = `
    INSERT INTO requests
    (clientName, description, status)
    VALUES (?, ?, ?)
  `;

  db.run(
    sql,
    [
      clientName.trim(),
      description.trim(),
      "New"
    ],
    function (error) {
      if (error) {
        console.error("POST ERROR:", error.message);

        return res.status(500).json({
          message: error.message
        });
      }

      res.status(201).json({
        id: this.lastID,
        clientName: clientName.trim(),
        description: description.trim(),
        status: "New"
      });
    }
  );
});


// PUT - Update request status
app.put("/api/requests/:id/status", (req, res) => {
  const id = parseInt(req.params.id);
  const { status } = req.body;

  const allowedStatuses = [
    "New",
    "In Progress",
    "Done"
  ];

  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({
      message: "Invalid status"
    });
  }

  db.run(
    `
      UPDATE requests
      SET status = ?
      WHERE id = ?
    `,
    [status, id],
    function (error) {
      if (error) {
        console.error("PUT ERROR:", error.message);

        return res.status(500).json({
          message: error.message
        });
      }

      if (this.changes === 0) {
        return res.status(404).json({
          message: "Request not found"
        });
      }

      db.get(
        "SELECT * FROM requests WHERE id = ?",
        [id],
        (error, row) => {
          if (error) {
            return res.status(500).json({
              message: error.message
            });
          }

          res.json(row);
        }
      );
    }
  );
});


const PORT = 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on http://localhost:${PORT}`
  );
});