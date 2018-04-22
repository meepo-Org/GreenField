const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const db = require('./database/index.js')

let app = express();

app.use(express.static(path.join(__dirname, '/angular-client/') ))
app.use(bodyParser.json());

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


//Rpotes for projects

// Abdulhameed
app.get('/login', function (req , res) {
	db.User.find(function (err, data) {
		if(err){res.send(err)}
		res.send(data)
	})
	// res.redirect('./templates/login.html');
})

app.post('/project',function(req , res){
	db.addProject(req.body , function (err , data) {
		if(err)
		{
			res.send(err)
		}
		res.send(data);
	})
})

//Routes for Tasks :)
app.get('/tasks', function(req, res)
{
	db.Task.find({}, function(err, data)
	{
		if(err)
		{
			res.send(err);
		}
		res.status(200).send(data);
	});
});

app.post('/tasks', function(req, res)
{
	db.addTask(req.body, function(err, data)
	{
		if(err)
		{
			res.send("there is an error :(")
		}
		res.status(201).send("Here is your added task ", data);

	});
});
  

var port = 1596
app.listen(process.env.PORT || port , function () {
console.log("server is listening "+ port +" Port")
})
