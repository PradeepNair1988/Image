const fs = require('fs');
const sharp = require('sharp');
const Image = require('./image');

module.exports = function resize(path, format, width, height, outputImagePath, res) {
    // const readStream = fs.createReadStream(path);
    // let transform = sharp();

    // if (format) {
    //     transform = transform.toFormat(format);
    // }

    // if (width || height) {
    //     transform = transform.resize(width, height);
    // }
    // //transform = transform.toFile(outputImagePath)
    // // transform.toFile(outputImagePath)
    // //transform.toFile('image.png');
    // return readStream.pipe(transform);

//var path = "/Users/pradeepramachandran/Desktop/file-upload-with-multer-in-node-master/uploads/myFile-1552225326444.png";
    var image = sharp(path);
    image
    .metadata()
    .then(function(metadata) {
        return image
        .resize(332, 332)
        .toFormat('jpeg')
        .toBuffer();
    })
    .then(function(data) {
        console.log("Data");
        console.log(data);

        let image = new Image(
            {
              contentType: 'image/png',
              data : data
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
        // data contains a WebP image half the width and height of the original JPEG
    });
};