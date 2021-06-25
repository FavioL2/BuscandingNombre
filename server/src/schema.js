const { gql } = require('apollo-server'); //GraphQL para Apollo y Express 

const typeDefs = gql `
 type Usuario{
     id:ID!
     email:String
     password:String
     apellido:String
     nombre:String
 }
 type Producto{
     id:ID!
     usuario:ID
     nombre:String
     precio:Float
     imagen:String
     url:String
     tienda:String
 }

input productoInput{    
    nombre:String
    precio:Float
    imagen:String
    url:String
    tienda:String
}
input usuarioInput{    
    email:String
    password:String
    apellido:String
    nombre:String
}
input AutenticarInput {
    email: String!
    password: String!
}
type Token {
    token: String
}

type Query{ 
    #-- Productos -- 
   leerProducto(id:ID):Producto
   obtenerProductos: [Producto]
   obtenerDeseados: [Producto]
   leerUsuario:Usuario
    #-- Lista de deseados --
    #solo para pruebas
    obtenerUsuarios:[Usuario]
    
 }
 type Mutation{
     #--- Productos --
     updatePrecioProducto(id:ID,input:productoInput!): Producto 
     crearProducto(producto:productoInput!):Producto          
     eliminarProducto(id:ID!):String                                                          

     #-- Lista de deseados --
     #elimProducList():String
     #Usuarios
     nuevoUsuario(input:usuarioInput!):Usuario
     autenticarUsuario (input: AutenticarInput ): Token
     cambiarContra(password:String!):String
     eliminarUsuario:String
 }  
 `;
module.exports = typeDefs;
