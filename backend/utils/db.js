var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/insomnia',
    {useNewUrlParser: true, 
    useUnifiedTopology: true
}) 

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));


var usersSchema = mongoose.Schema({
    username: String,
    password: String
  });

  var Users = mongoose.model('users', usersSchema);



  var positionsSchema = mongoose.Schema({
    companyLogo: String,
    companyName: String,
    positionsName: String,
    city:String,
    releaseTime: String,
    salary:String
  });

  var positions = mongoose.model('positions', usersSchema);

  exports.Users = Users 
  exports.positions = positions 
