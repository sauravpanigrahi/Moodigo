const mongoose = require('mongoose');
const { Schema } = mongoose;
const contactSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
   phone: {
    type: Number,
    required: true,
   },
   email: {
    type: String,
    required: true,
   }
});
module.exports = mongoose.model('contact', contactSchema);