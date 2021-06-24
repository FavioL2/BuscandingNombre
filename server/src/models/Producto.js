const mongoose = require("mongoose");
const Producto = mongoose.Schema({ 
    nombre:{
        type:String,
        required:true
    },
    precio:{
        type:Number,
        required:true
    },
    imagen:{
        type:String,
        trim:true
    },
    url:{
        type:String,
        trim:true
    },
    tienda:{
        type:String
    },
    usuario:{
        type:mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'Usuario'
    }
});
module.exports = new mongoose.model("CatProducto",Producto);