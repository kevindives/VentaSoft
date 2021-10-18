const mongoose = require('mongoose')
const {Schema} = mongoose

const ProductoSchema = Schema({
    nombre : String,
    cantidad : Number,
    descripcion : String,
    precio : Number,
})

module.exports = mongoose.model('producto', ProductoSchema)