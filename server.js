let express = require('express');
let bodyParser = require('body-parser')
let path = require('path');
let db = require('./database/index.js')

let app = express();

app.use(express.static(path.join(__dirname, '/angular-client/') ))

var port = 1596
app.listen(port , function () {
console.log("server is listening "+ port +" Port")
})