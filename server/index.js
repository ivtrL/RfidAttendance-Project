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

// working api for login

app.post("/login", (req, res) => {
  const query = "SELECT * FROM admin";
  db.query(query, (err, data) => {
    if (err) return res.json({ Error: err });
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
          if (element.admin_email == req.body.email)
            return res.json({ status: "Senha inválida!" });
          else
            return res.json({ status: "Email não existe no banco de dados!" });
        }
      });
    }
  });
});

// Api for login without database

// var adminList = [
//   {
//     admin_name: "Isaac",
//     admin_email: "isaacvitorinola@gmail.com",
//     admin_password: "1234",
//   },
//   {
//     admin_name: "Admin",
//     admin_email: "admin@gmail.com",
//     admin_password: "1234",
//   },
//   {
//     admin_name: "Admin2",
//     admin_email: "admin2@gmail.com",
//     admin_password: "123456",
//   },
// ];

// app.post("/login", (req, res) => {
//   adminList.map((element, index) => {
//     if (
//       element.admin_email == req.body.email &&
//       element.admin_password == req.body.password
//     ) {
//       return res.json({ status: "Success", admin: element });
//     } else if (adminList.length > index + 1) {
//       return;
//     } else {
//       if (element.admin_email == req.body.email)
//         return res.json({ status: "Senha inválida!" });
//       else return res.json({ status: "Email não existe no banco de dados!" });
//     }
//   });
// });

//  ------------------------------

// Api for getting all the users using database

app.get("/users", (req, res) => {
  const query = "SELECT * FROM users";
  db.query(query, (err, data) => {
    if (err) return res.json({ status: err });
    else return res.json({ status: "Success", users: data });
  });
});

app.post("/create_user", (req, res) => {
  const date = new Date();
  const query =
    "INSERT INTO users (username, gender, email, user_date) VALUES (?,?,?,?)";
  db.query(
    query,
    [req.body.username, req.body.gender, req.body.email, date.toISOString()],
    (err, data) => {
      if (err) return res.json(err);
      else {
        console.log(data);
        return res.json(data);
      }
    }
  );
});

app.get("/logs", (req, res) => {
  const query = "SELECT * FROM users_logs";
  db.query(query, (err, data) => {
    if (err) return res.json(err);
    else return res.json(data);
  });
});

// Api for testing the users api without database

// const date = new Date();

// var usersList = [
//   {
//     username: "Isaac",
//     card_uid: null,
//     email: "isaac123@gmail.com",
//     user_date: `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`,
//     gender: "Male",
//     add_card: 1,
//   },
//   {
//     username: "Pedro",
//     card_uid: null,
//     email: "Pedro@gmail.com",
//     user_date: `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`,
//     gender: "Male",
//     add_card: 1,
//   },
//   {
//     username: "Priscila",
//     card_uid: null,
//     email: "priscila@gmail.com",
//     user_date: `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`,
//     gender: "Female",
//     add_card: 1,
//   },
// ];

// // var logsList = [];

// app.get("/users", (req, res) => {
//   return res.json({ status: "Success", users: usersList });
// });

// app.post("/create_user", (req, res) => {
//   console.log(req.body);
//   usersList.push(req.body);
//   return res.json({ status: "Success", users: usersList });
// });

// app.get("/logs", (req, res) => {
//   return res.json({ status: "Success", logs: logsList });
// });

app.listen(3333, () => {
  console.log("Connected!");
});
