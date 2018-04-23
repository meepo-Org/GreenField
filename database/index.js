let mongoose = require('mongoose');
let Schema =mongoose.Schema;
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
	//projects : [{ type: Schema.Types.ObjectId, ref: 'Project' }]
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

var addProject = function(data, callback) {
	var project=new Project({projectName:data.projectName,projectDisc:data.projectDisc})
console.log('dataaaaaaaaaa',data)
User.findById(data.project_id, function (err, user) {
  if (err) return handleError(err);
  user.projects.push(project);

  //user.projects.push({_id:mongoose.Types.ObjectId(),projectName:data.projectName,projectDisc:data.projectDisc});
  user.save();
  project.save();
});
	// var project = new  User({projects:{projectName:data.projectName,projectDisc:data.projectDisc}});

	// project.save(function(err,elem){
	// 	if(err){
	// 		callback(err,null)
	// 	}
	// 	callback(null,elem)
	// });
}

module.exports.save = save;
module.exports.User = User;
module.exports.Project = Project;
module.exports.Task = Task;
module.exports.addTask = addTask;
module.exports.addProject = addProject;
