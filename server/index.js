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
        console.log(element);
        if (
          element.admin_email == req.body.email &&
          element.admin_password == req.body.password
        ) {
          return res.json("Success");
        } else if (data.length > index + 1) {
          return;
        } else {
          return res.json("Failed");
        }
      });
    }
  });
});

app.listen(8800, () => {
  console.log("Connected!");
});
