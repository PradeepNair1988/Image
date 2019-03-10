const express = require('express')
const bodyParser= require('body-parser')
const app = express()
const multer = require('multer');
fs = require('fs-extra')
app.use(bodyParser.urlencoded({extended: true}))
const Image = require('./image');
const resize = require('./resizer');
// const MongoClient = require('mongodb').MongoClient
// ObjectId = require('mongodb').ObjectId
const widthString = 700;
  const heightString = 700;
  const format = "png";
  const outputImageName = 'cropped_output_' + heightString + '_' + widthString + '.jpg';
  const outputImagePath = "/Users/pradeepramachandran/Desktop/file-upload-with-multer-in-node-master/uploads" + outputImageName;
// Set up mongoose connection
const mongoose = require('mongoose');
let dev_db_url = 'mongodb://pradeep:pradeep123@ds163905.mlab.com:63905/imagemanipulation';
let mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(encodeURI(mongoDB), { useNewUrlParser: true });
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  next();
}); 

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})

var upload = multer({ storage: storage })


let port = 12365;
app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});

app.get('/',function(req,res){
  res.sendFile(__dirname + '/index.html');

});


// upload single file

app.get('/photo', (req, res) => {
  var ObjectID = require('mongodb');
  var imageArray =[];
  Image.find({},function(err, img){

    var imageMap = {};
    
    img.forEach(function(imageMp) {
      imageMap= imageMp;
      imageArray.push(imageMap);
    });
    
    res.send(imageArray);
  });
})

const axios = require('axios');



app.post('/uploadfile', upload.single('myFile'), (req, res, next) => {
console.log(req);
  var dataimg;
  console.log("dataimg2")
  console.log(dataimg);
  resize(req.file.path, format,widthString, heightString, outputImagePath, res );

 
 
});


/*
 if(dataimg) {
   console.log(dataimg);
   console.log("done");
   var dataimg ="/Users/pradeepramachandran/Desktop/file-upload-with-multer-in-node-master/uploads/myFile-1552225226634.png"
   var encode_image = dataimg.toString('base64');
 // Define a JSONobject for the image attributes for saving to database
 

 let image = new Image(
  {
    contentType: 'image/png',
    data : fs.readFileSync(req.file.path)
    //image:  new Buffer(encode_image, 'base64')
  }
);

image.save(function (err) {
  if (err) {
    return next(err);
  }
  else {
    res.send({
      success: 0 , 
      message: "uploaded"
    });
  }
});
 }
  // var image = dataimg

  // var img = fs.readFileSync(req.file.path);


*/