import dotenv from "dotenv";
import express from "express";
import mysql from "mysql";
import cors from "cors";
import { v4 as uuid } from "uuid";

import { Admin, Device, User, UserLog } from "./types";

dotenv.config({
  path: ".env",
});

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
//   db.query(query, (err: mysql.MysqlError | null, data: Admin | Admin[]) => {
//     if (err) return res.json({ Error: err });
//     else {
//       if (Array.isArray(data))
//         data.map((element, index) => {
//           if (
//             element.admin_email == req.body.email &&
//             element.admin_password == req.body.password
//           ) {
//             return res.json({ status: "Success", admin: element });
//           } else if (data.length > index + 1) {
//             return;
//           } else {
//             if (element.admin_email == req.body.email)
//               return res.json({ status: "Senha inválida!" });
//             else
//               return res.json({
//                 status: "Email não existe no banco de dados!",
//               });
//           }
//         });
//       else {
//         if (
//           data.admin_email == req.body.email &&
//           data.admin_password == req.body.password
//         ) {
//           return res.json({ status: "Success", admin: data });
//         } else {
//           if (data.admin_email == req.body.email)
//             return res.json({ status: "Senha inválida!" });
//           else
//             return res.json({ status: "Email não existe no banco de dados!" });
//         }
//       }
//     }
//   });
// });

// Api for login without database

var adminList: Array<Admin> = [
  {
    id: 1,
    admin_name: "Isaac",
    admin_email: "isaacvitorinola@gmail.com",
    admin_password: "1234",
  },
  {
    id: 2,
    admin_name: "Admin",
    admin_email: "admin@gmail.com",
    admin_password: "1234",
  },
  {
    id: 3,
    admin_name: "Admin2",
    admin_email: "admin2@gmail.com",
    admin_password: "123456",
  },
];

app.post("/login", (req, res) => {
  let loginValid = false;
  adminList.map((element, index) => {
    if (!loginValid) {
      if (
        element.admin_email == req.body.email &&
        element.admin_password == req.body.password
      ) {
        loginValid = true;
        return res.json({ status: "Success", admin: element });
      } else if (adminList.length > index + 1) {
        return;
      } else {
        return res.json({ status: "Login Falhou!" });
      }
    }
  });
});

//  ------------------------------

// Api for getting all the users using database

// app.get("/users", (req, res) => {
//   const query = "SELECT * FROM users";
//   db.query(query, (err: mysql.MysqlError | null, data: User | User[]) => {
//     if (err) {
//       return res.json({ status: err });
//     } else {
//       return res.json({ status: "Success", users: data });
//     }
//   });
// });

// app.post("/users/create", (req, res) => {
//   const date = new Date();
//   const query =
//     "INSERT INTO users (username, gender, email, user_date, add_card) VALUES (?,?,?,?,?)";
//   db.query(
//     query,
//     [
//       req.body.username,
//       req.body.gender,
//       req.body.email,
//       date.toJSON().slice(0, 19).replace("T", " "),
//       1,
//     ],
//     (err: mysql.MysqlError | null) => {
//       if (err) return res.json(err);
//       else {
//         const query = "SELECT * FROM users";
//         db.query(query, (err: mysql.MysqlError | null, data: User | User[]) => {
//           if (err) {
//             console.log(err);
//             return res.json({ status: err });
//           } else {
//             console.log(data);
//             return res.json({ status: "Success", users: data });
//           }
//         });
//       }
//     }
//   );
// });

// app.get("/logs", (req, res) => {
//   const query = "SELECT * FROM users_logs";
//   db.query(query, (err: mysql.MysqlError | null, data: UserLog | UserLog[]) => {
//     if (err) return res.json(err);
//     else return res.json({ status: "Success", logs: data });
//   });
// });

// app.get("/devices", (req, res) => {
//   const query = "SELECT * FROM devices";
//   db.query(query, (err: mysql.MysqlError | null, data: Device | Device[]) => {
//     if (err) return res.json(err);
//     else return res.json({ status: "Success", devices: data });
//   });
// });

// app.post("/devices/create", (req, res) => {
//   const date = new Date();
//   const query =
//     "INSERT INTO devices (device_name, device_uid, device_date) VALUES (?,?,?)";
//   db.query(
//     query,
//     [req.body.device_name, uuid(), date.toISOString()],
//     (err: mysql.MysqlError | null, data: Device | Device[]) => {
//       if (err) return res.json(err);
//       else return res.json({ status: "Success", devices: data });
//     }
//   );
// });

// app.post("/devices/remove", (req, res) => {
//   const query = "DELETE FROM devices WHERE device_uid = ?";
//   db.query(
//     query,
//     [req.body.uuid],
//     (err: mysql.MysqlError | null, data: Device | Device[]) => {
//       if (err) return res.json(err);
//       else return res.json({ status: "Success", devices: data });
//     }
//   );
// });

// Api for testing the users api without database

const date = new Date();

const usersList: Array<User> = [
  {
    id: 1,
    username: "Isaac",
    gender: "Masculino",
    email: "isaac123@gmail.com",
    card_uid: "None",
    user_date: `${date.toUTCString()}`,
    add_card: 1,
  },
  {
    id: 2,
    username: "Pedro",
    gender: "Masculino",
    email: "Pedro@gmail.com",
    card_uid: "None",
    user_date: `${date.toUTCString()}`,
    add_card: 1,
  },
  {
    id: 3,
    username: "Priscila",
    gender: "Feminino",
    email: "priscila@gmail.com",
    card_uid: "None",
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
    id: usersList.length + 1,
    username: req.body.username,
    gender: req.body.gender,
    email: req.body.email,
    card_uid: "None",
    user_date: newUserDate.toUTCString(),
    add_card: 1,
  });
  return res.json({ status: "Success", users: usersList });
});

const logsList: Array<UserLog> = [];

app.get("/logs", (req, res) => {
  return res.json({ status: "Success", logs: logsList });
});

var devicesList: Array<Device> = [];

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

app.listen(process.env.APP_PORT, () => {
  console.log(`Connected to the port ${process.env.APP_PORT}!`);
});

// ONLY FOR SIMULATIONS OF LOGS WITHOUT DATABASE OR ESP32

app.post("/logs/create", (req, res) => {
  const newDate = new Date();
  logsList.push({
    id: logsList.length + 1,
    username: req.body.username,
    card_uid: req.body.card_uid,
    device_uid: req.body.device_uid,
    checkindate: `${newDate.toUTCString()}`,
    timein: req.body.timein,
    timeout: req.body.timeout,
  });
  return res.json({ status: "Success", logs: logsList });
});
