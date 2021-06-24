const mongoose = require("mongoose");
const ListaDeseados = mongoose.Schema({ 
    id:{
        type:String,
        required:true
    },
    productos:{
        type:Array,
        required:true
    }
});
module.exports = new mongoose.model("CatLista",ListaDeseados);
