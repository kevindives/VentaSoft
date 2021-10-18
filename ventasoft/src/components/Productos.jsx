import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Axios from 'axios'
import Swal from 'sweetalert2'
import Navbar2  from './Navbar2'

export default function Productos() {


    const [productos, setProductos] = useState([])
    const [descripcion, setDescripcion] = useState('')
    const [nombre, setNombre] = useState('')
    const [cantidad, setCantidad] = useState('')
    const [precio, setPrecio] =useState('')
   

    useEffect(() => {
        obtenerProductos()
        
    },[]
    )

    /*Obtener/Listar información de "Vendedores"*/

    const obtenerProductos = async () => {
        // const id = sessionStorage.getItem('idusuario')
        const token = sessionStorage.getItem('token')
        const res =await Axios.get('http://localhost:4000/producto/listarproducto',
            {
                headers: { 'autorizacion': token }
            }
        )
    
        setProductos(res.data)
    }

    /*Eliminar vendedor*/
    const eliminar=async(id)=>{
        const token=sessionStorage.getItem('token')
        const respuesta=await Axios.delete('http://localhost:4000/producto/eliminar/'+id,{
            headers:{'autorizacion':token}
        })
        const mensaje=respuesta.data.mensaje 
        Swal.fire({
            icon:'success',
            title:mensaje,
            showConfirmButton:false, 
            timer:1500
        })
        obtenerProductos() 
    }

    /*Guardar vendedor*/
    const guardar = async (e) => {
        e.preventDefault()
        const producto = {
            nombre,
            descripcion,
            precio,
            cantidad
        }

        const token = sessionStorage.getItem('token')


        const respuesta = await Axios.post('http://localhost:4000/producto/crear', producto, {
            headers: { 'autorizacion': token }
        })

        const mensaje = respuesta.data.mensaje
        Swal.fire({
            icon: 'success',
            title: mensaje,
            showConfirmButton: false
        }
        )
        setTimeout(() => {
            window.location.href = '/productos'

        }, 1500)
    }

   

    const buscar = async (e) => {
        if (e.target.value === '') {
            return obtenerProductos()
        }
        const buscar = e.target.value
        const token = sessionStorage.getItem('token')
        const respuesta = await Axios.get('http://localhost:4000/producto/buscar/' + buscar, {
            headers: { 'autorizacion': token }
        })
        setProductos(respuesta.data)
    }


    return (

        <div>
            <Navbar2/>
            {/*Encabezado titular "Vendedores"*/}

            <header className='py-2 bg-primary text-white'>
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <h1> <i className='fas fa-pencil-alt'></i> Productos </h1>
                        </div>
                    </div>
                </div>
            </header>

            {/*Botón Agregar Vendedor*/}

            <nav className='navbar py-4'>
                <div className="container">
                    <div className="col-md-3">
                        <Link to='#' className="btn btn-primary btn-block" data-toggle='modal' data-toggle='modal' data-target='#addVendedor'>
                            <i className='fas fa-plus'>Agregar Producto </i>
                        </Link>
                    </div>

                    {/*Buscar vendedor*/}

                    <div className="col-md-6 ml-auto">
                        <div className="input-group">
                            <input className='form-control mr-sm-2' type='search' placeholder='Buscar...' aria-label='Search' onChange={(e) => buscar(e)} />
                        </div>
                    </div>
                </div>
            </nav>

            {/*Mostrar Vendedores en Tabla*/}
            <section>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-header">
                                    <h4> Productos de ventasoft</h4>
                                </div>
                                <table className='table table-responsive-lg table-striped'>
                                    <thead className='thead-dark'>
                                        
                                        <tr>
                                            <th>#</th>
                                            <th>Nombre del producto</th>
                                            <th> Descripcion </th>
                                            <th>Precio unitario </th>
                                            <th> Cantidad </th>
                                            <th>Opciones</th>
                                        </tr>

                                    </thead>
                                   
                                    <tbody>
                                        {
                                            productos.map((producto, i) => (
                                                <tr key={producto._id}>
                                                    <td>{i + 1}</td>
                                                    <td>{producto.nombre}</td>
                                                    <td>{producto.descripcion}</td>
                                                    <td>{producto.precio}</td>
                                                    <td>{producto.cantidad}</td>
                                                    <td>
                                                        
                                                        <button className='btn btn-warning mr-1' onClick={()=>eliminar(producto._id)} >Eliminar</button>
                                                        <Link className='btn btn-danger mr-1' to={'/editProductos/' + producto._id}>Editar</Link>
                                                    </td>

                                                </tr>
                                            ))
                                        }

                                    </tbody>

                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/*Modal para agregar vendedor*/}
            <div className="modal fade" id='addVendedor'>

            <div className="modal-dialog modal-lg">
                <div className='modal-content'>
                     
                     <div className="modal-header pg-primary text-black">
                         <h2 className='modal-title'>Agregar Producto </h2>
                         <button className='close' data-dismiss='modal'>
                             <span>&times;</span>
                         </button>
                     </div>

                     <div className="modal-body">

                        <form onSubmit={guardar}>
                            <div className="form-group">
                                <label>Nombre de producto</label>
                                <input type='text' className='form-control' required onChange={(e)=>setNombre(e.target.value)}/>
                            </div>
                            <div className="form-group">
                                <label> Descripcion </label>
                                <input type='text' className='form-control' required onChange={(e)=>setDescripcion(e.target.value)}/>
                            </div>

                            <div className="form-group">
                                <label>Cantidad </label>
                                <input type='number' className='form-control' required onChange={(e)=>setCantidad(e.target.value)}/>
                            </div>
                            <div className="form-group">
                                <label>Precio</label>
                                <input type='text' className='form-control' required onChange={(e)=>setPrecio(e.target.value)}/>
                            </div>

                            <div className='form-group'>
                                <button className='btn btn-primary' type='submit'>Guardar</button>
                            </div>

                        </form>


                     </div>
                </div>
            </div>
        </div>


        </div>

    )
}
