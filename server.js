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
	 // set the public folder to serve public assets
 
 
var sdk = new BoxSDK({
  clientID: '3vn9adcubavmvcgj3jlye7psglozo99k',
  clientSecret: 'Ef4yDegeR26lT1cNCvbFuSKN64YARBLX'
});
 
//Create a basic API client
var client = sdk.getBasicClient('TLUiiEHsfYiBM8ParPblILRmGDzirjd8');
 
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


// var stream = fs.createReadStream('/Users/a1002618/Desktop/hello.png');
// client.files.uploadFile('42705020628', 'hello.png', stream, function(err,res){
// 	if(err) throw err;
//     	console.log(res);
// });

//     client.files.getReadStream('Divya.rtf', null, function(error, stream) {

// 	if (error) {
// 		// handle error
// 	}

// 	// write the file to disk
// 	var output = fs.createWriteStream('/Users/a1002618/Downloads');
// 	stream.pipe(output);
// 	console.log('hello');
// });

// var stream = fs.createReadStream('/Users/a1002618/Desktop/hello.png');
// client.files.getChunkedUploader(
// 	'hello',
// 	214,
// 	'hello.png',
// 	stream,
// 	null,
// 	function(err, uploader) {

// 		if (err) {
// 			// handle error
// 			return;
// 		}

// 		uploader.on('error', function(err) {
// 			// handle unrecoverable upload error
// 			console.log('err');
// 		});

// 		uploader.on('uploadComplete', function(file) {
// 			console.log('File upload complete!', file);
// 		});

// 		uploader.start();
// 	}
// );


// // });
var app=express();
 app.use(express.static(__dirname + '/'));
  
  // set up our one route to the index.html file
 app.get('*', function(req, res) {
     res.sendFile(path.join(__dirname + '/index.html'));
 });
app.post('/upload', function(req, res) {


var stream = fs.createReadStream('/Users/a1002618/Desktop/hello.png');
client.files.uploadFile('42705020628', 'hello.png', stream, function(err,res){
if (err) throw err;

console.log(res);
console.log("file updated successfully");

});
	// Guard to make sure the user is logged in
	// if (!req.sdk) {
	// 	res.redirect('/');
	// 	return;
	// }

	// Get a read stream to the file that the user uploaded
	// var fileStream = fs.createReadStream(req.body.file.path);
	// // Make an API call to upload the user's file to Box
	// req.sdk.files.uploadFile('0', req.body.file.name, fileStream, function(err, data) {

	// 	// Once the upload completes, delete the temporary file from disk
	// 	fs.unlink(req.body.file.path, function() {});

	// 	res.redirect('/files');
	// });
	//client.files.uploadFile('123', 'bicycle.png', 'hello', function(err, file) {});
// 	var stream = fs.createReadStream('unkonwn.png');
// client.files.uploadFile('hello', 'New File', stream, function(err,uploadfile){
// 	if(err) throw err;
// 	console.log('file name');
// });

// var stream = fs.createReadStream('/Users/a1002618/Desktop/screen.png');
// client.files.uploadFile('42705020628', 'screen1.png', stream, function(err,res){
// 	if(err) throw err;
//     	console.log(res);
// });



});

 
 app.listen(8050);
 console.log('port is running 8050');
