# RfidAttendance-Project
A project built for ESP32 linked with MySQL to make an smart attendance system.

<h1 align="center">  
    <img src="https://media.discordapp.net/attachments/839669500747186186/1118301018371924138/image.png?width=1380&height=671" alt="Descrição da imagem" style="margin-top: 32px; display:block; margin: auto" >
</h1>



# Project Description
A Complete project with code for ESP32 connected with an RFID MFRC522, an MySQL for database and maintaining communication between the website and the ESP32.
This Website is built on React.js using Vite.js for speeding up the compilation time (Planning to change to Next.js as it is better for a complete Application build).

This project is made for Studying purposes, more especifically for a class on University.

# Funtionalities

- Admin Auth;
- Users List display and creating User;
- Logs List display and a tool for simulating logs without need of a database and ESP32;
- Creating devices IDs and displaying for using in ESP32. The ESP32 won't work without a properly ID;
- ESP32 code with device ID validating, Card validating and adding to the website;
- Backend API;


# Technologies

- React.js;
- Tailwind;
- Express;
- MySQL;
- ESP32;
- Some NPM libaries;



<br>
<br>

Node. js v14.6.0 +

#INSTALLING:
Install dependencies of the project using the command below on Terminal:
 
```bash
cd client
npm install
```

```bash
cd server
npm install
```

Make sure to install dependencies on both "client" and "server" folder, 
as the folder server runs the backend while client runs the frontend of
the website and both has different dependencies.

Then run both of the frontend and backend opening two different Terminals and using the command below:

```bash
npm run dev
```
