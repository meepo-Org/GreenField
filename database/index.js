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

module.exports.db = db;