//requirements
const express = require ('express');
const cors = require('cors');
const http = require ('http');
const port = 5555;
const app = express();
app.use(cors());
app.use(express.json());
//start server
var server = http.createServer(app);
server.listen(port, () => console.log(`server listening for https on port: ` + port));
app.get('/test', (req, res) => {
    res.send("Backend responds!")
})