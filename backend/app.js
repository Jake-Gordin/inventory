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
const https = require ('https');
const app = express();
app.use(cors());
app.use(express.json());
//encryption / math
const fs = require ('fs');
var cert = fs.readFileSync('./certs/localhost.pem');
var key = fs.readFileSync('./certs/localhost-key.pem');
var HTTPSoptions = {
  key: key,
  cert: cert
};
const bcrypt = require('bcrypt');
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
var server = https.createServer(HTTPSoptions, app);
server.listen(listenPort, () => console.log(`server listening for https on port: ` + listenPort));
//test call
app.get('/test', (req, res) => {
    console.log("received test call from:")
    console.log(req.hostname)
    res.send("Backend responds!")
})
//encryption functions
//encrypt password
async function encryptPassword(password) {
  const salt = 10;
  try {
    const encryptedPassword = await bcrypt.hash(password, salt);
    return encryptedPassword;
  }
  catch (error) {
    console.log("Failed encryption process: ", error);
    throw error;
  }
}
//compare password
async function comparePassword(password, encryptedPassword) {
  try {
    const verdict = await bcrypt.compare(password, encryptedPassword);
    return verdict;
  }
  catch (error) {
    console.log("Failed password compare process", error);
    throw error;
  }
}
//db functions
//list all items
app.get('/items', (req, res) => {
    const queryText = `select * from items`;
    mySQLCon.query(queryText, async (error, result) => {
      if (error) {
        console.log("DB Error: " + error.code);
        console.log("DB Error Message: " + error.message);
        res.send("DB_ERROR: " + error.code);
        return;
      }
      else {
        res.send(result);
      }
    })
})
//list user-specific items
app.post('/users/items', (req, res) => {
    const reqData = req.body;
    const targetUser = reqData.currentUser;
    var sqlParams = [targetUser];
    var queryText = `select ID from users where userName = ?`;
    mySQLCon.query(queryText, sqlParams, async (error, result) => {
      if (error) {
        console.log("DB Error: " + error.code);
        res.send("Error retrieving User ID");
        return;
      }
      else {
        sqlParams = [result[0].ID];
        //console.log("searching using this username:")
        //console.log(targetUser)
        //console.log("discovered this user ID:")
        //console.log(result[0].ID)
        queryText = `select * from items where userID = ?`;
        mySQLCon.query(queryText, sqlParams, async (error, result) => {
        if (error) {
          console.log("DB Error: " + error.code);
          res.send("Error retrieving User Items");
          return;
        }
        else {
          res.send(result)
        }
      })
      }
    })
})
//register new user
app.post('/register', async (req, res) => {
    const reqData = req.body;
    //console.log(reqData)
    var encryptedPassword
    try {
      encryptedPassword = await encryptPassword(reqData.password);
    }
    catch (error) {
      console.log(error)
      res.send(error)
    }
    const sqlparams = [reqData.firstName, reqData.lastName, reqData.userName, encryptedPassword];
    const queryText = `insert into users (firstName, lastName, userName, password) values (?, ?, ?, ?);`
    mySQLCon.query(queryText, sqlparams, (error, result) => {
      if (error) {
        console.log("DB Error: " + error.code);
        console.log("DB Error Message: " + error.message);
        res.send(error.code);
        return;
      }
      else {
        const sqlparams = [reqData.userName];
        const queryText = `select * from users where userName = ?`;
        mySQLCon.query(queryText, sqlparams, (error, result) => {
            if (error) {
              console.log("DB Error: " + error.code);
              console.log("DB Error Message: " + error.message);
              res.send(error.code);
              return;
            }
            else {
              res.send(result[0].ID);
            }
        })
      }
    })
})
//existing user login
app.post('/login', (req, res) => {
    console.log("received login request")
    const reqData = req.body;
    const sqlparams = [reqData.userName];
    const queryText = `select * from users where userName = ?`;
    var userID;
    console.log("format login query")
    mySQLCon.query(queryText, sqlparams, async (error, result) => {
      if (result.length < 1) {
        console.log("no matching username");
        res.send("ERR_NO_USER");
      }
      else {
        var passwordVerdict = false
        try {
          userID = result[0].ID
          passwordVerdict = await comparePassword(reqData.password, result[0].password)
        }
        catch (error) {
          console.log("error comparing passwords")
          console.log(error)
          res.send(error)
        }
        if (passwordVerdict) {
          res.send(userID)
        }
        else {
          res.send("mismatch")
        }
      }
    })
})
//add new item
app.post('/items', (req, res) => {
    const reqData = req.body;
    const targetUser = reqData.currentUser;
    var sqlParams = [targetUser];
    var queryText = `select ID from users where userName = ?`;
    mySQLCon.query(queryText, sqlParams, async (error, result) => {
      if (error) {
        console.log("DB Error: " + error.code);
        res.send("Error retrieving User ID!");
        return;
      }
      else {
        console.log("with this username:")
        console.log(targetUser)
        console.log("attempting to add item with this user id:")
        console.log(result)
        sqlParams = [result[0].ID, reqData.itemName, reqData.itemDescription, reqData.itemQuantity];
        queryText = `insert into items (userID, name, description, quantity) values (?, ?, ?, ?);`
        mySQLCon.query(queryText, sqlParams, async (error, result) => {
        if (error) {
          console.log("DB Error: " + error.code);
          console.log("DB Error Message: " + error.message);
          res.send("Error adding new item!");
          return;
        }
        else {
          res.send("item added successfully!")
        }
      })
      }
    })
})
//edit existing item
app.put('/items', (req, res) => {
  console.log("received edit package:")
  console.log(req.body.itemID)
  //console.log(new Uint8Array(req.body.itemID).buffer)
  //var buffer = new Uint8Array(req.body.itemID).buffer
  //console.log(new Uint8Array(req.body.itemID))
    const reqData = req.body;
    const sqlParams = [reqData.itemName, reqData.itemDescription, reqData.itemQuantity, req.body.itemID];
    const queryText = `update items set name = ?, description = ?, quantity = ? where ID = ?;`
    //const sqlParams = ['test item 1'];
    //const queryText = `select ID from items where name = ?;`
    mySQLCon.query(queryText, sqlParams, async (error, result) => {
      if (error) {
        console.log("DB Error: " + error.code);
        console.log("DB Error Message: " + error.message);
        res.send("DB ERROR: " + error.code);
        return;
      }
      else {
        res.send("ITEM_EDIT_OK")
        //console.log(result)
        //console.log(result[0])
        //console.log(result[0].ID)
      }
    })
})
//delete existing item
app.delete('/items', (req, res) => {
    const reqData = req.body;
    console.log("received delete package:");
    console.log(reqData);
    targetID = reqData.itemID;
    const sqlParams = [targetID];
    const queryText = `delete from items where ID = ?;`
    mySQLCon.query(queryText, sqlParams, async (error, result) => {
      if (error) {
        console.log("DB Error: " + error.code);
        res.send("DB ERROR: " + error.code);
        return;
      }
      else {
        res.send("ITEM_DELETE_OK");
      }
    })
})