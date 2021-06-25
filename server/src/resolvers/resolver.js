const ListaDeseados= require('../models/ListaDeseados');
const Producto = require('../models/Producto');
const Usuario = require('../models/Usuario');
const JWT = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const CrearToken = (usuario, palabraSecreta, expiresIn) => {
   const { id, correo, pass } = usuario; 
   return JWT.sign({ id, correo, pass}, palabraSecreta, { expiresIn })
}

const Resolvers={
 Query:{
   leerUsuario:async(_,args,ctx)=>{
     try{
      //   console.log(usuario)
        console.log(ctx.id)
        const usuario = Usuario.findById(ctx.id)
        console.log(usuario)
        return usuario
     }catch(error){
        console.log(usuario)
        console.log(ctx.id)
      console.log(error)
     }
   },
   leerProducto: async(_,args)=>{
      try{
         const {id}=args;
         const producto = await Producto.findById( id.toString() )
         if (!producto) {
            throw new Error("No existe el producto")
         }
         return producto
      }catch(error){
         console.log(error)
      }
   },
   obtenerProductos: async() =>{
      try{
         const productos = Producto.find({});         
         return productos;
      }catch(error){         
         console.log(error)
      }   
   },
   obtenerDeseados: async(_,ctx)=>{
      try{
         const productos = Producto.find({usuario: ctx.id})
         return productos
      }catch(error){
         console.log(error)
      }
   },
   obtenerUsuarios:async(_)=>{
      try{
         const usuarios = Usuario.find({})
         return usuarios
      }catch(error){
         print(error.message)
      }
   }
 },
 Mutation:{
   updatePrecioProducto :async(_,args)=>{
      
      try{
         const {input}=args
         const {precio} = input         
         const {id}=args;
         const existeProducto = await Producto.findById(id.toString());
         if(!existeProducto){
            throw new Error("El producto no ha sido registrado en la base de datos");
         }
         existeProducto.precio= precio
         producto = await Producto.findOneAndUpdate({ _id: id },existeProducto, { new: true });
         return producto;
      }catch(error){
         console.log(error)
      }
   },
   crearProducto:async(_,args,ctx)=>{      
      const {nombre}= args;
      const exist = await Producto.findOne({nombre});           
      try{
         const producto = new Producto(args.producto)
         producto.usuario = ctx.id
         producto.save()
         return producto;
      }catch(error){
         console.log(error)
      }      
   },
   eliminarProducto:async(_,{id})=>{
      try{
         const existeProducto = await Producto.findById(id);
         if (!existeProducto) {
             throw new Error("El producto no ha sido registrado en la base de datos");
         }
         producto = await Producto.findOneAndDelete({ _id: id })
         return "El producto se ha eliminado con éxito";
      }catch(error){
         console.log(error)
      }
   },
   //usuarios
   nuevoUsuario: async(_, { input }) => {
      const { email,password } = input;
      //Revisar si usuario ya ha sido registrado
      const existeU = await Usuario.findOne({ email })
      if (existeU) {
         throw new Error("Ya existe un usuario registrado con ese email")
      }
      //Hashear Password
      const salt = await bcryptjs.genSalt(10);
      input.password = await bcryptjs.hash(password, salt)
      console.log(input)
      console.log(existeU)
      //Guardar en DB
      try {
         const usuario = new Usuario(input)
         usuario.save()
         return usuario;
      } catch (error) {
         console.log(error)
         
      }
   },
   autenticarUsuario: async(_, { input }) => {
      const { email, password } = input
      //Verificar si el usuario existe 
      const existe = await Usuario.findOne({ email })
      if (!existe) {
          throw new Error("El usuario no existe")
      }
      const PasswordCorrecto = await bcryptjs.compare(password, existe.password)      
      if (!PasswordCorrecto) {
          throw new Error("La contraseña es incorrecta");
      }
      //Creacción del token
      return {
         //mandamos el token para consevarlo en el header
          token: CrearToken(existe, process.env.SECRETA, '24h')
      }
  },cambiarContra: async(_,{password},ctx)=>{      
   try{
      const buscarUsuario = await Usuario.findById(ctx.id)
      if(!buscarUsuario){
         return "No se encontró registro del usuario"
      }
      //Le tenemos que poner un mínimo de simbolos?????
      const salt = await bcryptjs.genSalt(10);
      buscarUsuario.password = await bcryptjs.hash(password, salt)   
      contra = await Usuario.findOneAndUpdate({_id:ctx.id},buscarUsuario,{new:true})
      return "Contraseña actualizada.";
   }catch(error){
      console.log(error)
   }
   },
   eliminarUsuario:async(_,{ },ctx)=>{
      try{
         const buscarUsuario = await Usuario.findById(ctx.id);
         user = await Usuario.findOneAndDelete({_id : ctx.id})
         return "Usuario eliminado con exito";
      }catch(error){
         console.log(error)
      }
    }
 }
}
module.exports= Resolvers;