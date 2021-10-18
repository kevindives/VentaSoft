import React from 'react'
import { Link } from 'react-router-dom'
import Navbar2  from './Navbar2'

const MHome = () => {
    return (
        <div>
            <Navbar2/>
            <div className = "margen">
            </div>
            <div className="container-fluid">
                <div className="row row-cols-5">
            
                    <div className="col col-sm-12 col-md-6 col-lg-4">
                        <div className="card" >
                            <img src="https://res.cloudinary.com/caugustog/image/upload/v1633121314/VentaSoft/registro_de_ventas_y1i6l9.png" className="card-img-top" alt="..."/>
                            <div className ="card-body">
                            <h5 className ="card-title">ESTADO DE lAS VENTAS</h5>
                            <p className ="card-text">Consulta el estado de las ventas dando clic en IR.</p>
                            <Link to="/ventas" href="dirige al modal de estado de ventas" className ="btn btn-primary">IR</Link>
                            </div>
                        </div>
                    </div>
                    <div className="col col-sm-12 col-md-6 col-lg-4">
                        <div className="card" >
                            <img src="https://res.cloudinary.com/caugustog/image/upload/v1633121314/VentaSoft/registro_del_producto_evvvyo.png" className="card-img-top" alt="..."/>
                            <div className ="card-body">
                            <h5 className ="card-title">LISTA DE PRODUCTO</h5>
                            <p className ="card-text">Consulta el inventario dando clic en IR.</p>
                            <Link to="/productos" href="dirige al modal de registro de producto" className ="btn btn-primary">IR</Link>
                            </div>
                        </div>
                    </div>
                    <div className="col col-sm-12 col-md-6 col-lg-4 ">
                        <div className="card" >
                            <img src="https://res.cloudinary.com/caugustog/image/upload/v1633121314/VentaSoft/gestion_de_usuarios_jnme77.png" className="card-img-top" alt="..."/>
                            <div className ="card-body">
                            <h5 className ="card-title">GESTIÓN DE USUARIOS</h5>
                            <p className ="card-text">Conlsulta y actualiza dando clic en IR.</p>
                            <Link to="/usuarios" href="dirige al modal de gestion de usuarios" className ="btn btn-primary">IR</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MHome
