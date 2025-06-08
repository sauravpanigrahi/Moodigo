// This file defines a Mongoose schema for a user model, which includes fields for first name, last name, phone number, and email.
const mongoose = require('mongoose');
const { Schema } = mongoose;
const passportLocalMongoose = require('passport-local-mongoose');   
const user=new Schema({
    Firstname:{
        type:String,
        required:true,
        
    },
    Lastname:{
        type:String,
        required:true,
        
    },
    phonenumber:{
        type:String,
        required:true,
        unique:true, // Ensures that phone numbers are unique
    },
    email:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        required:true,
        unique:true, // Ensures that usernames are unique
    },
})
user.plugin(passportLocalMongoose, { usernameField: "email" }); // Adds username and password fields to the schema and handles hashing and salting of passwords

module.exports =mongoose.model('User',user);
