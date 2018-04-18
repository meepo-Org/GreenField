let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/PM-db');
var db = mongoose.connection;

db.on('error' , function(){
	console.log('mongoose not Connected !')
})
db.once('open' , function () {
	console.log("mongoose conncted !")
})
var userSchema = mongoose.Schema({
	user :String
})

var User = mongoose.model("User" , userSchema);

var save = function (data , callback) {
	var user = new User(data);
	user.save(function (err , elem) {
		if(err){callback(err, null)}
			callback(null ,elem)
	})
}


module.exports.save = save;
module.exports.User = User;