const mongoose = require("mongoose");

const menu = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },

    description:{
        type:String,
        required:true,
    },

    price:{
        type:String,
        required:true,
    },
});

module.exports = mongoose.model("menuItem", menu);

