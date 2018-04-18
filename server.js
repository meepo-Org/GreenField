let express = require('express');
let bodyParser = require('body-parser')
let path = require('path');
let db = require('./database/index.js')

let app = express();

app.use(express.static(path.join(__dirname, '/angular-client/') ))
app.use(bodyParser())

app.post('/user',function(req , res){
	db.save(req.body , function (err , data) {
		if(err){res.send(err)}
		res.send(data)
	})
})

app.get('/user', function (req , res) {
	db.User.find(function (err, data) {
		if(err){res.send(err)}
		res.send(data)
	})
})

var port = 1596
app.listen(process.env.PORT || port , function () {
console.log("server is listening "+ port +" Port")
})