import express from "express";
import mysql from "mysql";
import cors from "cors";
import { v4 as uuid } from "uuid";

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

// working api for login

// app.post("/login", (req, res) => {
//   const query = "SELECT * FROM admin";
//   db.query(query, (err, data) => {
//     if (err) return res.json({ Error: err });
//     else {
//       data.map((element, index) => {
//         if (
//           element.admin_email == req.body.email &&
//           element.admin_password == req.body.password
//         ) {
//           return res.json({ status: "Success", admin: element });
//         } else if (data.length > index + 1) {
//           return;
//         } else {
//           if (element.admin_email == req.body.email)
//             return res.json({ status: "Senha inválida!" });
//           else
//             return res.json({ status: "Email não existe no banco de dados!" });
//         }
//       });
//     }
//   });
// });

// Api for login without database

var adminList = [
  {
    admin_name: "Isaac",
    admin_email: "isaacvitorinola@gmail.com",
    admin_password: "1234",
  },
  {
    admin_name: "Admin",
    admin_email: "admin@gmail.com",
    admin_password: "1234",
  },
  {
    admin_name: "Admin2",
    admin_email: "admin2@gmail.com",
    admin_password: "123456",
  },
];

app.post("/login", (req, res) => {
  adminList.map((element, index) => {
    if (
      element.admin_email == req.body.email &&
      element.admin_password == req.body.password
    ) {
      return res.json({ status: "Success", admin: element });
    } else if (adminList.length > index + 1) {
      return;
    } else {
      if (element.admin_email == req.body.email)
        return res.json({ status: "Senha inválida!" });
      else return res.json({ status: "Email não existe no banco de dados!" });
    }
  });
});

//  ------------------------------

// Api for getting all the users using database

// app.get("/users", (req, res) => {
//   const query = "SELECT * FROM users";
//   db.query(query, (err, data) => {
//     if (err) return res.json({ status: err });
//     else return res.json({ status: "Success", users: data });
//   });
// });

// app.post("/users/create", (req, res) => {
//   const date = new Date();
//   const query =
//     "INSERT INTO users (username, gender, email, user_date) VALUES (?,?,?,?)";
//   db.query(
//     query,
//     [req.body.username, req.body.gender, req.body.email, date.toUTCString()],
//     (err, data) => {
//       if (err) return res.json(err);
//       else {
//         console.log(data);
//         return res.json(data);
//       }
//     }
//   );
// });

// app.get("/logs", (req, res) => {
//   const query = "SELECT * FROM users_logs";
//   db.query(query, (err, data) => {
//     if (err) return res.json(err);
//     else return res.json(data);
//   });
// });

// Api for testing the users api without database

const date = new Date();

var usersList = [
  {
    id: 1,
    username: "Isaac",
    gender: "Male",
    email: "isaac123@gmail.com",
    card_uid: null,
    user_date: `${date.toUTCString()}`,
    add_card: 1,
  },
  {
    id: 2,
    username: "Pedro",
    gender: "Male",
    email: "Pedro@gmail.com",
    card_uid: null,
    user_date: `${date.toUTCString()}`,
    add_card: 1,
  },
  {
    id: 3,
    username: "Priscila",
    gender: "Female",
    email: "priscila@gmail.com",
    card_uid: null,
    user_date: `${date.toUTCString()}`,
    add_card: 1,
  },
];

app.get("/users", (req, res) => {
  return res.json({ status: "Success", users: usersList });
});

app.post("/users/create", (req, res) => {
  const newUserDate = new Date();
  usersList.push({
    username: req.body.username,
    card_uid: null,
    email: req.body.email,
    user_date: newUserDate.toUTCString(),
    gender: req.body.gender,
    add_card: 1,
  });
  return res.json({ status: "Success", users: usersList });
});

var logsList = [];

app.get("/logs", (req, res) => {
  return res.json({ status: "Success", logs: logsList });
});

var devicesList = [];

app.get("/devices", (req, res) => {
  return res.json({ status: "Success", devices: devicesList });
});

app.post("/devices/create", (req, res) => {
  const newDate = new Date();
  devicesList.push({
    id: devicesList.length + 1,
    device_name: req.body.username,
    device_uid: uuid(),
    device_date: `${newDate.toUTCString()}`,
  });
  return res.json({ status: "Success", devices: devicesList });
});

app.post("/devices/remove", (req, res) => {
  devicesList = devicesList.filter((element) => {
    return element.device_uid != req.body.uuid;
  });
  return res.json({ status: "Success", devices: devicesList });
});

app.listen(3333, () => {
  console.log("Connected!");
});
