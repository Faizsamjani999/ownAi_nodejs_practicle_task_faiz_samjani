const mongoose = require("mongoose");

const schema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique: true
    },
    password : {
        type : String,
        required : true
    },
    role : {
        type : String,
        enum: ['Admin', 'Staff'],
        required : true
    },
    phone : {
        type : String,
        required : true
    },
    city : {
        type : String,
        required : true
    },
    country : {
        type : String,
        required : true
    }
})

const User = mongoose.model("User",schema);

module.exports = User;