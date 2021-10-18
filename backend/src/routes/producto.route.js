const {Router} = require('express')
const router = Router()
const ProductoCtrl = require('../controllers/producto.controllers')
//rutas post
router.post('/crear', ProductoCtrl.crearProducto)
//rutas get
router.get('/listarproducto', ProductoCtrl.listar)
router.get('/listarproducto/:productoId', ProductoCtrl.buscarById)
router.get('/buscar/:nombres',ProductoCtrl.buscarByName)
router.delete('/eliminar/:id', ProductoCtrl.eliminar)
router.put('/actualizar/:id',ProductoCtrl.actualizar)


module.exports = router
