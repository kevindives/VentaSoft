const mongoose = require('mongoose')

URI=('mongodb://localhost/ventasoft')
// URI=('mongodb+srv://admin:admin@cluster-ventasoft.wme6f.mongodb.net/ventasoft')

mongoose.connect(URI)
    .then(db=>console.log('base de datos conectada',db.connection.name))
    .catch(error=>console.log(error))

module.exports=mongoose   