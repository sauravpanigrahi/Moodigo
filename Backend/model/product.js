const mongoose = require('mongoose');
const { Schema } = mongoose;
const productSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    about: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    image: {
        url: String,
        filename: String,
    },
    category: {
        type: String,
        required:true,
    },
    subcategory:{
        type:String,
        required:true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});
module.exports = mongoose.model('Product', productSchema);