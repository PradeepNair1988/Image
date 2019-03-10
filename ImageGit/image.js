const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let imgSchema = new Schema(
    { 
        data: Buffer,
        contentType: String }
);


// Export the model
module.exports = mongoose.model('Image', imgSchema);