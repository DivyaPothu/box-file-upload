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

	 // set the public folder to serve public assets
 var sdk = new BoxSDK({
  clientID: '3vn9adcubavmvcgj3jlye7psglozo99k',
  clientSecret: 'Ef4yDegeR26lT1cNCvbFuSKN64YARBLX'
});
 
//Create a basic API client
var client = sdk.getBasicClient('2Url1SuuZibumwLLgXPQUiis8Q3LpL0Z');
 
// Get some of that sweet, sweet data!
client.users.get(client.CURRENT_USER_ID, null, function(err, currentUser) {
  if(err) throw err;
  console.log('Hello, ' + currentUser.name + '!');
});
 
// // The SDK also supports Promises
// client.users.get(client.CURRENT_USER_ID)
//     .then(user => console.log('Hello', user.name, '!'))
//     .catch(err => console.log('Got an error!', err));

client.files.get('252678920589', null, function(err,res){
    if(err) throw err;
    console.log(res);
});



var app=express();
 app.use(express.static(__dirname + '/'));
   // set up our one route to the index.html file
 app.get('*', function(req, res) {
     res.sendFile(path.join(__dirname + '/index.html'));
 });

app.post('/upload',multiparty(),function(req, res) 
{
console.log('file name is'+req.files.theFile.name);
var stream = fs.createReadStream(req.files.theFile.path);
console.log('file path is'+req.files.theFile.path);
console.log(req.files);
client.files.uploadFile('42705020628', req.files.theFile.name, stream, function(err,res){
if (err) throw err;
console.log(res);
console.log("file updated successfully");
//res.send("file uploded successfully");
});
});

 
app.listen(8050);
console.log('port is running 8050');
