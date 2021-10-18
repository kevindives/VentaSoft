const {Router} = require('express')
const router= Router()
const VentasCtrl=require('../controllers/ventas.controllers')


// RUTAS GET
//ruta para ver todas la ventas
router.get('/verventas', VentasCtrl.verVentas )
//ruta para buscar venta por Id de la venta
router.get('/verventas/:ventaId', VentasCtrl.ventaById)
//ruta para buscar venta por Id del cliente
router.get('/buscarid/:clienteId', VentasCtrl.ventaByIdCliente)
//ruta para buscar venta por nombre del cliente
router.get('/buscar/:nombre', VentasCtrl.ventaByCliente)


//rutas post
router.post('/crearventa', VentasCtrl.crearVenta)

//rutas put
router.put('/modificar/:ventaId',VentasCtrl.modificarVenta)

//rutas delete
router.delete('/borrar/:ventaId',VentasCtrl.eliminarVenta)


module.exports=router