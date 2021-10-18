import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import Swal from 'sweetalert2'
import Navbar2 from './Navbar2'
export default function ActualizarProd(props) {

    const [nombre, setNombres] = useState('')
    const [correo, setCorreo] = useState('')
    // const [contrasena, setContrasena] = useState('')
    const [estado, setEstado] = useState([])
    const [estadoSelect, setEstados] = useState('')
    const [rol, setTrol] = useState([])
    const [rolselect, setRolselect] = useState('')
 

    useEffect(() => {
        obtenerVendedores()
        setTrol(['vendedor', 'administrador'])
        // setRolselect('vendedor')
        setEstado(['inactivo', 'activo'])
        // setEstados('inactivo')

    }, [])

    const obtenerVendedores = async () => {
        const id = props.match.params.id
        const token = sessionStorage.getItem('token')
        const respuesta = await Axios.get('http://localhost:4000/usuario/vervendedores/' + id, {
            headers: { 'autorizacion': token }
        })
        console.log(respuesta.data)
        setNombres(respuesta.data.nombre)
        setCorreo(respuesta.data.correo)
        setEstados(respuesta.data.estado)
        setRolselect(respuesta.data.trol)
    }

    /*Actualizar vendedores -PUT-*/
    const actualizar = async (e) => {
        e.preventDefault()
        const id = props.match.params.id
        const token = sessionStorage.getItem('token')
        const vendedor = {
            nombre,
            correo,
            estado: estadoSelect,
            trol: rolselect
        }

        const respuesta = await Axios.put('http://localhost:4000/usuario/modificar/' + id, vendedor, {
            headers: { 'autorizacion': token }
        })

        const mensaje = respuesta.data.mensaje
        Swal.fire({
            icon: 'success',
            title: mensaje,
            showConfirmButton: false
        })
        setTimeout(() => {
            window.location.href = '/usuarios'
        }, 1500)
    }
    return (
        <div>
            <Navbar2/>
            <div className="container col-md-6 mt-4">
                <div className="card">
                    <div className="card-header">
                        <h3>Editar vendedores </h3>
                        <div className="card-body">

                            <form onSubmit={actualizar}>
                                <div className="form-group">
                                    <label>Nombre</label>
                                    <input type='text' className='form-control' required value={nombre} onChange={(e) => setNombres(e.target.value)} />
                                </div>

                                <div className="form-group">
                                    <label>Correo</label>
                                    <input type='email' className='form-control' required value={correo} onChange={(e) => setCorreo(e.target.value)} />
                                </div>

                                <div className="form-group">
                                    <label>Estado</label>
                                    {/* <input type='text' className='form-control' required onChange={(e)=>setEstado(e.target.value)}/> */}
                                    <select className='form-control' onChange={(e) =>
                                        setEstados(e.target.value)}>
                                        {
                                            estado.map(trol => (
                                                <option key={trol}>
                                                    {trol}
                                                </option>
                                            )
                                            )
                                        }
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label>Rol</label>
                                    <select className='form-control' onChange={(e) =>
                                        setRolselect(e.target.value)}>
                                        {
                                            rol.map(trol => (
                                                <option key={trol}>
                                                    {trol}
                                                </option>
                                            ))
                                        }
                                    </select>
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