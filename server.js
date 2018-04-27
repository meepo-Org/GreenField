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
	db.User.findOne({'_id' : req.session._id},function (err, data) {
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
	db.User.findOne({'_id':req.session._id},function (err, user) {
		if(err){res.send(err)}
			res.status(200).send(user.projects);
	});
});

app.post('/deleteProj', function (req,res){
	var userId=req.session._id;
	db.deleteProject({_id:req.body._id},userId,function(err,data){
		if(err){
			res.send(err)
		}
		res.send(data)
	});
});

app.post('/changeProj', function (req,res){
	var query = {projectName:req.body._id.projectName, projectDisc:req.body._id.projectDisc}
	var newProj = {projectName:req.body.projectName,projectDisc:req.body.projectDisc}
	db.changeProject(query,{$set:newProj},req.session._id,function(err,data){
		if(err){
			res.send(err)
		}
		res.send(data)
	});
});
let projectId;
app.post('/projectId',function(req,res){
	projectId=req.body.projectId;
})

//Routes for Tasks :)

app.get('/tasks', function(req, res) {
	db.User.findOne({'_id':req.session._id},function(err,user){
		if(err){
			res.send(err);
		}
		for(var i=0;i<user.projects.length;i++){
			if(user.projects[i]._id.toString() === projectId.toString()){
				res.status(200).send(user.projects[i].tasks);
			}
		}
	})
});


app.get('/tasks/:description', function(req, res) {
	db.Task.findOne({description: req.params.description}, function(err, data) {
		if(err) {
			res.send(err);
		}
		res.status(200).send(data);
	});
});


app.post('/tasks', function(req, res) {
	db.User.findOne({'_id':req.session._id},function (err, data) {
		if(err){res.sendStatus(404)}
			if(data !== null){
				db.Project.findOne({_id:projectId},function(err,pro){
					if(err){res.sendStatus(404)}
						if(pro !== null){
							var task={};
							task['description']=req.body.description;
							task['assignedTo']=req.body.assignedTo;
							task['complexity']=req.body.complexity;
							task['status']=req.body.status;


							task['project_id']=projectId;
							task['user_id']=req.session._id;
							db.addTask(task , function (err , data) {
								if(err) {
									res.send(err)
								}
								res.sendStatus(200);
							});	
						}
					});

			}
		});
	res.sendStatus(200);
});

app.post('/deleteTask', function(req, res){
		db.deleteTask({description: req.body.description},req.session._id,projectId, function (err, data) {
			if(err){
				res.send(err);
			}
			res.status(200).send(data);
		});
});

app.post('/updateTask', function(req, res){
	
	var query = req.body.oldData;
	var newData = req.body.newData;
	
	db.updateTask(query, newData,req.session._id,projectId, function(err, data){
		if(err) {
			res.send(err);
		}
		res.status(200).send(data);
	});
});

// app.delete('/tasks', function(req, res){
// 	db.deleteTask({description: req.body.description}, function (err, data) {
// 		if(err){
// 			res.send("there is an error :(");
// 		}
// 		res.send("Data has been deleted ", data);

// 	});
// })

var port = 1596
app.listen(process.env.PORT || port , function () {
	console.log("server is listening "+ port +" Port")
});
