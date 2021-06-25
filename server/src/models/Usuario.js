const mongoose = require("mongoose");
const Usuario = new mongoose.Schema({ 
    email:{
        type:String,
        required:true,
        trim: true
    },
    password:{
        type:String,
        required:true,
        trim: true        
    },
    nombre:{
        type:String,
        required:true        
    },
    apellido:{
        type:String,
        required:true
    }
});
module.exports = new mongoose.model("Usuario",Usuario);