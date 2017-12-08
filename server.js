   var BoxSDK = require('box-node-sdk');
 var express = require('express'),
	exphbs = require('express-handlebars'),
	session = require('express-session'),
	path = require('path'),
	fs = require('fs'),
	util = require('util'),
	multipart = require('express-formidable').parse,
	bodyParser = require('body-parser'),
	pipe=require('pipe'),
	BoxSDK = require('box-node-sdk');
var multiparty = require('connect-multiparty');
var multipartyMiddleware = multiparty();
var pg = require('pg');
var Sequelize=require ('sequelize');
var app  = require('express')();// Express App include
var http = require('http').Server(app); // http server
var env = app.get('env') == 'development' ? 'dev' : app.get('env');
pg.defaults.ssl = process.env.DATABASE_URL != undefined;
var port = process.env.PORT || 8050;
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json()); // Body parser use JSON data
var express = require('express');
var router = express.Router();

var sequelize = new Sequelize('postgres', 'postgres', 'Divya123', {
    host: 'localhost',
    port: 5432,
    dialect: 'postgres'
 
 });
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

//box configuration
	 // set the public folder to serve public assets
 var sdk = new BoxSDK({
  clientID: '3vn9adcubavmvcgj3jlye7psglozo99k',
  clientSecret: 'Ef4yDegeR26lT1cNCvbFuSKN64YARBLX'
});
 
//Create a basic API client
var client = sdk.getBasicClient('KI2NVQ77LB37MWYSwBaLknjH3KxpArx1');
 
// Get some of that sweet, sweet data!
client.users.get(client.CURRENT_USER_ID, null, function(err, currentUser) {
  if(err) throw err;
  console.log('Hello, ' + currentUser.name + '!');
});
 
// // The SDK also supports Promises
// client.users.get(client.CURRENT_USER_ID)
//     .then(user => console.log('Hello', user.name, '!'))
//     .catch(err => console.log('Got an error!', err));

// client.files.get('252678920589', null, function(err,res){
//     if(err) throw err;
//     console.log(res);

// });



var app=express();
 app.use(express.static(__dirname + '/'));
   // set up our one route to the index.html file
 app.get('/track', function(req, res) {
     res.sendFile(path.join(__dirname + '/index.html'));
 });

app.post('/upload',multiparty(),function(req,res){
	client.users.get(client.CURRENT_USER_ID, null, function(err, currentUser) {
	
	var stream = fs.createReadStream(req.files.theFile.path);
	client.files.uploadFile('42705020628', req.files.theFile.name, stream, function(error,response){
	if (error) throw error;
	var path='app.box.com/files/';
    var username = currentUser.name;
    var box_file_path = path+response.entries[0].id;
    var file_created_at= response.entries[0].created_at;
    var data = {
        "Data":""
    };
   if(!!username&& !!box_file_path&& !!file_created_at) {
sequelize.query("INSERT INTO box_table (username,box_file_path,file_created_at) VALUES('" + username+ "','" + box_file_path+ "','" + file_created_at+ "')",[username,box_file_path,file_created_at],{type: sequelize.QueryTypes.INSERT}).then(function() {
    
 if(!!err){
                data.Data = "Error Adding data";
            }else{
                //data["Data"] = 0;
                data["Data"] = "Details Added Successfully";
                console.log('details added successfully');
            }
          res.status(200).json(data);
          //res.send('hello');
        });
    }else{
        data["Data"] = "Please provide all required data of file";
        //res.json(404).data);
res.status(400).json(data);
    }
});
});
});

 
app.listen(8050);
console.log('port is running 8050');

