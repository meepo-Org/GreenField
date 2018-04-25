const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./database/index.js');
const session = require('express-session');
const app = express();
const expressValidator = require('express-validator');
const bcrypt =require('bcrypt');

app.use(expressValidator())
app.use(express.static(path.join(__dirname, '/angular-client/') ));
app.use(bodyParser.json());
app.use(session({secret:'this is secret'}));

app.post('/user',function(req , res){
	db.save(req.body , function (err , data) {
		if(err) {
			res.send(err)
		}
		res.send(data)
	})
	
});
app.get('/user', function (req , res) {
	db.User.find(function (err, data) {
		if(err) {
			res.send(err)
		}
		res.send(data)
	})
});
app.post('/login', function (req , res) {
	db.User.findOne({'username':req.body.username},function (err, data) {
		if(err){res.sendStatus(404)}
			if(data !== null){
				bcrypt.compare(req.body.password, data.password, function(err, resCrypt) {
					if(err){res.sendStatus(404)}
					if(resCrypt){
							req.session._id=data._id;
							req.session.username=data.username;
							req.session.password=data.password;
							res.sendStatus(200)
					}
                });

			}
		});
});
app.get('/logout',function(req,res){
	if(req.session.username){
		req.session.destroy(function(err){
			if(err){
				res.negotiate(err);
			}
			res.end('logged out')
		});
	}
	res.end('the user not logged in')

});
app.post('/project',function(req , res) {
	db.User.findOne({'_id':req.session._id},function (err, data) {
		if(err){res.sendStatus(404)}
			if(data !== null){
				var project={};
				project['projectName']=req.body.projectName;
				project['projectDisc']=req.body.projectDisc;
				project['project_id']=req.session._id;
				db.addProject(project , function (err , data) {
					if(err) {
						res.send(err)
					}
					res.sendStatus(200);
				});	
			}
		});
	res.sendStatus(200);
});
app.get('/project', function(req,res) {
	db.Project.find({} ,function(err,data) {
		if(err) {
			res.send(err);
		}
		res.status(200).send(data);
	});
});

app.post('/deleteProj', function (req,res){
	//console.log("ideeeee",req.body._id)
	db.deleteProject({_id:req.body._id},function(err,data){
		if(err){
			res.send(err)
		}
		res.send(data)
	});
});

app.post('/changeProj', function (req,res){
	
	var query = {projectName:req.body._id.projectName, projectDisc:req.body._id.projectDisc}
	var newProj = {projectName:req.body.projectName,projectDisc:req.body.projectDisc}
	console.log("query",query)
	db.changeProject(query,{$set:newProj},req.session._id,function(err,data){
		if(err){
			res.send(err)
		}
		res.send(data)
	});
});
 

//Routes for Tasks :)

app.get('/tasks', function(req, res) {
	db.Task.find({}, function(err, data) {
		if(err) {
			res.send(err);
		}
		res.status(200).send(data);
	});
});

app.post('/tasks', function(req, res) {
	db.addTask(req.body, function(err, data) {
		if(err) {
			res.send("there is an error :(")
		}
		res.status(201).send("Here is your added task ", data);
	});
});

var port = 1596
app.listen(process.env.PORT || port , function () {
	console.log("server is listening "+ port +" Port")
});
