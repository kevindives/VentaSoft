const mongoose =require('mongoose')
const {Schema} = mongoose

const UsuarioSchema = Schema({
    nombre:String,
    correo:String,
    contrasena:String,
    rol:{type: String, enum:['administrador','vendedor'],default:'vendedor'},
    estado: {type: String, enum:['activo','inactivo'], default:'inactivo'}
})

module.exports=mongoose.model('usuario',UsuarioSchema)