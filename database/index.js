let mongoose = require('mongoose');
let bcrypt = require('bcrypt');
let Schema =mongoose.Schema;
mongoose.connect('mongodb://localhost:/PM-db' );
//mongoose.connect('mongodb://admin:admin@ds249269.mlab.com:49269/pm-db');
var db = mongoose.connection;
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
	projects:[projectSchama]
	
});

var taskSchema = mongoose.Schema({
	description: String,
	assignedTo: String,
	complexity: Number,
	status: String
});

var User = mongoose.model("User" , userSchema);
var Project = mongoose.model("Project" , projectSchama);
var Task = mongoose.model('Task', taskSchema);
var save = function (newUser , callback) {
	bcrypt.genSalt(10,function(err,salt){
		bcrypt.hash(newUser.password,salt,function(err,hash){
			newUser.password=hash;
				var user = new User(newUser);
             	user.save(function (err , elem) {
		        if(err){callback(err, null)}
		     	callback(null ,elem)
	             })
			//newUser.save(callback);
		})
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

var addProject = function(data, callback) {
var project=new Project({projectName:data.projectName,projectDisc:data.projectDisc});
User.findById(data.project_id, function (err, user) {
			  if (err) return handleError(err);
			  user.projects.push(project);
			  user.save();
			  project.save();
           });
}
var deleteProject = function(data,callback){
	//console.log("Dataaaa",data)
	Project.deleteOne(data,function(err,elem){
		if(err){
			callback(err,null)
		}
		callback(null,elem)
	});
}

var changeProject = function(query,condition,userId,callback){
 User.findById(userId, function (err, user) {
	 	if(err){
	 		throw err;
	 	}
	 	for(var i=0;i<user.projects.length;i++){
	 		if(query.projectName === user.projects[i].projectName && query.projectDisc === user.projects[i].projectDisc ){
	 			user.projects[i].projectName=condition.$set.projectName;
	 			user.projects[i].projectDisc=condition.$set.projectDisc;
	 			user.save();
	 		}
	 	}

	 	

 });
	 Project.findOneAndUpdate(query,condition,function(err,elem){
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
module.exports.addProject = addProject;
module.exports.deleteProject = deleteProject;
module.exports.changeProject = changeProject;