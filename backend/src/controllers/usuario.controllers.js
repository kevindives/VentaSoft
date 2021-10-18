const UsuarioCtrl={}
const Usuario=require('../models/usuarios.models')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

//controladores get
//lista todos los usuarios
UsuarioCtrl.verUsuarios = async(req,res)=>{
    const verUsuario =await Usuario.find({})

    res.json(verUsuario)
}
//lista con todos los vendedores
UsuarioCtrl.verVendedores = async(req,res)=>{
    const verUsuario =await Usuario.find({"rol":"vendedor"})

    res.json(verUsuario)
}
//busca vendedores y usuarios por Id
UsuarioCtrl.buscarById = async (req,res)=>{
    const vendedorId = req.params.vendedorId
    const verVendedor = await Usuario.findById(vendedorId)

    res.json(verVendedor)
}
//busca vendedores y usuarios por nombre
UsuarioCtrl.buscarByName = async(req,res)=>{
    const nombres= req.params.nombres
    const verVendedor = await Usuario.find({nombre:{$regex:".*"+nombres+".*"}})

    res.json(verVendedor)   
}


//controladores post
UsuarioCtrl.crearUsuario=async(req,res)=>{
    const{nombre,correo,contrasena,rol,estado}=req.body
    const NuevoUsuario = new Usuario({
        nombre,correo, contrasena,rol,estado
    })
    const correoUsuario= await Usuario.findOne({correo:correo})
    if (correoUsuario){
        res.json({
            mensaje:'el correo ya existe'
        })
    }else{
        NuevoUsuario.contrasena= await bcrypt.hash(contrasena,10)
        const token=jwt.sign({_id:NuevoUsuario._id},'secreta')
        await NuevoUsuario.save()
        res.json({
            mensaje:'Bienvenido',
            id:NuevoUsuario._id,
            nombre:NuevoUsuario.nombre,
            token
        })
    }
}

UsuarioCtrl.login= async(req,res)=>{
    const{correo,contrasena}=req.body
    const usuario = await Usuario.findOne({correo:correo})
    if(!usuario){
        return res.json({
            mensaje:'correo incorrecto'
        })
    }
    const match = await bcrypt.compare(contrasena,usuario.contrasena)
    if (match){
        const token = jwt.sign({_id:usuario._id},'secreta')
        res.json({
            mensaje:'Bienvenido',
            id: usuario._id,
            nombre:usuario.nombre,
            token
        })
    }else{
        res.json({
            mensaje: 'contraseña incorrecta'
        })
    }
}

//controladores put
UsuarioCtrl.modificar=async(req,res)=>{
    const usuarioId = req.params.usuarioId
    const update = req.body

    await Usuario.findByIdAndUpdate({_id:usuarioId},update)
    res.json({
        mensaje: 'Usuario modificado'
    })
  
}

//controladores delete

UsuarioCtrl.borrar =async(req,res)=>{
    const usuarioId = req.params.usuarioId

    await Usuario.findByIdAndDelete({_id:usuarioId})
    res.json({
        mensaje:'Usuario eliminado'
    })
    

}


module.exports=UsuarioCtrl