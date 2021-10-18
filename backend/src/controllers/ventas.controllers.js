const VentasCtrl = {}
const Venta = require ('../models/ventas.models')

// controladores get
//lista todas las ventas
VentasCtrl.verVentas = async(req,res)=>{
    const verVentas =await Venta.find({})

    res.json(verVentas)
}
//busca una venta por Id de la venta
VentasCtrl.ventaById = async(req,res)=>{
    const ventaId = req.params.ventaId

    const verVenta = await Venta.findById(ventaId)

        res.json(verVenta)

}
//busca una venta por Id del cliente
VentasCtrl.ventaByIdCliente = async(req,res)=>{
    const clienteId = req.params.clienteId
    const verVenta = await Venta.find({clienteId:{$regex:".*"+clienteId+".*"}})
    
    res.json(verVenta)
}
//busca una venta por nombre del cliente
VentasCtrl.ventaByCliente = async(req,res)=>{
    const nombres = req.params.nombre
    const verVenta =await Venta.find({nombreCliente:{$regex:".*"+nombres+".*"}})

    res.json(verVenta)
}

//controladores post 
VentasCtrl.crearVenta = async(req,res)=>{
    const {fecha,clienteId,nombreCliente,vendedorId,nombreVendedor,codigoProducto,cantidad,precioUni,estado,totalPago} =req.body
    const nuevaVenta = new Venta ({
        fecha, clienteId, nombreCliente,vendedorId,nombreVendedor,codigoProducto, cantidad,precioUni,estado,totalPago
    })
    await nuevaVenta.save()
    res.json({
        mensaje:'venta creada con exito'
    })
}

//controladores put
VentasCtrl.modificarVenta = async (req,res)=>{
    const ventaId = req.params.ventaId
    const update = req.body

    await Venta.findByIdAndUpdate({_id:ventaId},update)
    res.json({
        mensaje:'La venta ha sido modificada'
    })
        
}

//controladores delete
VentasCtrl.eliminarVenta =async(req, res)=>{
    const ventaId = req.params.ventaId

    await Venta.findByIdAndDelete({_id:ventaId})
    res.json({
        mensaje:'Venta eliminada'
    })
}

module.exports=VentasCtrl