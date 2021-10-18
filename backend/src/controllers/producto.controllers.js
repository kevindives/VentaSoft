const ProductoCtrl ={}
const Producto =require('../models/producto.models')

ProductoCtrl.crearProducto=async(req, res)=>{
    const {nombre,cantidad,descripcion,precio}=req.body
    const NuevoProducto=new Producto({
        nombre,cantidad,descripcion,precio
    })
    const nombreProducto = await Producto.findOne({nombre:nombre})
    if(nombreProducto){
        res.json({
            mensaje:'El producto ya existe'
        })
    }else{
        await NuevoProducto.save()
        res.json({
            mensaje: 'Nuevo producto agregado al inventario',
            id:NuevoProducto._id,
            nombre:NuevoProducto.nombre,
        })
    }
}

ProductoCtrl.listar =async(req, res)=>{
    const respuesta=await Producto.find()
    res.json(respuesta)
}


ProductoCtrl.eliminar=async(req, res)=>{
    const id=req.params.id
    await Producto.findByIdAndRemove({_id: id })
    res.json({
        mensaje: "producto eliminado"
    })
}

ProductoCtrl.actualizar=async(req, res)=>{
    const id =req.params.id
    await Producto.findByIdAndUpdate({_id:id},req.body)
    res.json({
        mensaje: "producto actualizado"
    })
}

ProductoCtrl.buscarById = async (req,res)=>{
    const productoId = req.params.productoId
    const verproducto = await Producto.findById(productoId)

    res.json(verproducto)
}

ProductoCtrl.buscarByName = async(req,res)=>{
    const nombres = req.params.nombres
    const verProducto = await Producto.find({nombre:{$regex:".*"+nombres+".*"}})

    res.json(verProducto)   
}



module.exports = ProductoCtrl