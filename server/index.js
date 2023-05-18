import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json);

const db = mysql.createPool({
  host: "www.db4free.net",
  port: 3306,
  user: "rfidproject",
  password: "ee49fd3b",
  database: "rfidsensor",
  connectionLimit: 100,
  multipleStatements: true,
});

app.post("/", (req, res) => {
  res.json("Backend response!");
});

app.post("/admins", (req, res) => {
  const q = "SELECT * FROM admin";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.listen(8800, () => {
  console.log("Connected!");
});
