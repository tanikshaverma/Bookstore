const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/database10")
    .then(()=>{
        console.log("database connected!");

    })
    .catch((err)=>{
        console.log(err.message)
    });

