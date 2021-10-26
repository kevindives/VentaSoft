import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import Swal from 'sweetalert2'
import Navbar2  from './Navbar2'

export default function ActualizarProd (props) {

    const [nombre, setNombre] = useState('')
    const [cantidad, setCantidad] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [precio, setPrecio] = useState('')



    
    useEffect(() => {
        obtenerProductos()
        

    }, [])

    const obtenerProductos = async () => {
        const id = props.match.params.id
        const token = sessionStorage.getItem('token')
        const respuesta = await Axios.get('/producto/listarproducto/' + id, {
            headers: { 'autorizacion': token }
        })
        console.log(respuesta.data)
        setNombre(respuesta.data.nombre)
        setDescripcion(respuesta.data.descripcion)
        setCantidad(respuesta.data.cantidad)
        setPrecio(respuesta.data.precio)
        

        
    }

    /*Actualizar vendedores -PUT-*/
    const actualizar = async (e) => {
        e.preventDefault()
        const id = props.match.params.id
        const token = sessionStorage.getItem('token')
        const producto = {
            nombre,
            descripcion,
            cantidad,
            precio
        }

        const respuesta = await Axios.put('/producto/actualizar/' + id, producto, {
            headers: { 'autorizacion': token }
        })

        const mensaje = respuesta.data.mensaje
        Swal.fire({
            icon: 'success',
            title: mensaje,
            showConfirmButton: false
        })
        setTimeout(() => {
            window.location.href = '/productos'
        }, 1500)
    }
    return (
        <> 
        <Navbar2/>
        <div className="container col-md-6 mt-4">
            <div className="card">
                <div className="card-header">
                    <h3>Editar el producto </h3>
                    <div className="card-body">

                        <form onSubmit={actualizar}>
                            <div className="form-group">
                                <label>Nombre</label>
                                <input type='text' className='form-control' required value={nombre} onChange={(e) => setNombre(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label> Descripcion </label>
                                <input type='text' className='form-control' required value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label> Cantidad </label>
                                <input type='text' className='form-control' required value={cantidad} onChange={(e) => setCantidad(e.target.value)} />
                            </div>
                            
                            <div className="form-group">
                                <label> Precio </label>
                                <input type='text' className='form-control' required value={precio} onChange={(e) => setPrecio(e.target.value)} />
                            </div>

                            <div className='form-group'>
                                <button className='btn btn-primary' type='submit'>Guardar</button>
                            </div>

                        </form>

                    </div>
                </div>
            </div>
        </div>

        </>

    )
}