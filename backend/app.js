//requirements
//read env file
require('dotenv').config()
const listenPort = process.env.API_PORT;
const dbHost = process.env.DB_HOST;
const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASSWORD;
const dbDatabase = process.env.DB_DATABASE;
const dbPort = process.env.DB_PORT;
//express server
const express = require ('express');
const cors = require('cors');
const http = require ('http');
const app = express();
app.use(cors());
app.use(express.json());
//connect to local db
const mysql = require ('mysql');
const mySQLCon = mysql.createConnection({
  host: dbHost,
  user: dbUser,
  password: dbPass,
  port: dbPort,
  database: dbDatabase
})
mySQLCon.connect(function(error) {
  if (error) throw error;
})
//start server
var server = http.createServer(app);
server.listen(listenPort, () => console.log(`server listening for https on port: ` + listenPort));
app.get('/test', (req, res) => {
    res.send("Backend responds too!")
})
//list all items
app.get('/items', (req, res) => {
    const queryText = `select * from items`;
    mySQLCon.query(queryText, async (error, result) => {
      if (error) {
        console.log("DB Error: " + error.code);
        res.send("DB_ERROR: " + error.code);
        return;
      }
      else {
        res.send(result);
      }
    })
})