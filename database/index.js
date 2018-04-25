let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:/PM-db' );
// mongoose.connect('mongodb://admin:admin@ds249269.mlab.com:49269/pm-db' || 'mongodb://localhost/PM-db');
var db = mongoose.connection;
// new comment
db.on('error' , function(){
	console.log('mongoose not Connected !')
})
db.once('open' , function () {
	console.log("mongoose conncted !")
})

var projectSchama = mongoose.Schema({
	projectName : String , 
	projectDisc : String
})

var userSchema = mongoose.Schema({
	username :{type : String ,required :true, index :{unique:true} },
	password :{type : String ,required :true}, 
	email :{type : String ,required :true}, 
	
});

var taskSchema = mongoose.Schema({
	description: String,
	assignedTo: String,
	complexity: Number,
	status: String,
	number: Number
});

var User = mongoose.model("User" , userSchema);
var Project = mongoose.model("Project" , projectSchama);
var Task = mongoose.model('Task', taskSchema);

var save = function (data , callback) {
	var user = new User(data);
	user.save(function (err , elem) {
		if(err){callback(err, null)}
			callback(null ,elem)
	})
}

var addTask = function(data, callback) {
	var task = new Task(data);
	task.save(function(err, data2) {
		if(err)
		{
			callback(err, null);
		}
		callback(null, data2);
	});
}

var deleteTask = function(data, callback) {
	Task.deleteOne(data, function (err, data2) {
		if(err){
			callback(err, null);
		}
		callback(null, data2);
	});
}

var updateTask = function(query, newData, callback) {
	Task.findOneAndUpdate(query, newData, {new: true}, function(err, data2){
		if(err){
			callback(err, null);
		}
			callback(null, data2);
	});
}

var addProject = function(data, callback) {
	var project = new Project(data);
	project.save(function(err,elem){
		if(err){
			callback(err,null)
		}
		callback(null,elem)
	});
}

module.exports.save = save;
module.exports.User = User;
module.exports.Project = Project;
module.exports.Task = Task;
module.exports.addTask = addTask;
module.exports.deleteTask = deleteTask;
module.exports.updateTask = updateTask;
module.exports.addProject = addProject;
