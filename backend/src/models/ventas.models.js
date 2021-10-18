const mongoose =require('mongoose')
const {Schema} = mongoose

const VentaSchema = Schema({
    fecha:String,  
    clienteId:String,
    nombreCliente:String,
    vendedorId:String,
    nombreVendedor: String,
    codigoProducto: String,
    cantidad:{type: Number , default:1},
    precioUni: {type: Number, default:0},
    estado: String,
    totalPago: {type: Number, default:0}
})

module.exports=mongoose.model('venta',VentaSchema)