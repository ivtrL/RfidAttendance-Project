import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "rfidsensor",
});

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json("Backend response!");
});

app.post("/login", (req, res) => {
  const query = "SELECT * FROM admin";
  db.query(query, (err, data) => {
    if (err) return res.json("Error");
    else {
      data.map((element, index) => {
        if (
          element.admin_email == req.body.email &&
          element.admin_password == req.body.password
        ) {
          return res.json({ status: "Success", admin: element });
        } else if (data.length > index + 1) {
          return;
        } else {
          return res.json({ status: "Failed" });
        }
      });
    }
  });
});

app.get("/users", (req, res) => {
  const query = "SELECT * FROM users";
  db.query(query, (err, data) => {
    if (err) return res.json(err);
    else return res.json(data);
  });
});

app.get("/logs", (req, res) => {
  const query = "SELECT * FROM users_logs";
  db.query(query, (err, data) => {
    if (err) return res.json(err);
    else return res.json(data);
  });
});

app.get("/create_user", (req, res) => {
  const date = new Date();
  const query =
    "INSERT INTO users (username, gender, email, user_date) VALUES (?,?,?,?)";
  db.query(
    query,
    [req.body.username, req.body.gender, req.body.email, date.getTime()],
    (err, data) => {
      if (err) return res.json(err);
      else {
        console.log(data);
        return res.json(data);
      }
    }
  );
});

app.listen(8800, () => {
  console.log("Connected!");
});
