import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Axios from 'axios'
import Swal from 'sweetalert2'
import Navbar2  from './Navbar2'
import Acceso from './Acceso'

export default function Index() {


    const [vendedores, setVendedores] = useState([])

    const [nombre, setNombres] = useState('')
    const [correo, setCorreo] = useState('')
    const [contrasena, setContrasena] =useState('')
    const [estado, setEstado] = useState([])
    const [estadoSelect,setEstados] = useState('')
    const [rol, setTrol] = useState([])
    const [rolselect, setRolselect] = useState('')

    useEffect(() => {
        obtenerVendedores()
        setTrol(['vendedor', 'administrador'])
        // setRolselect('vendedor')
        setEstado(['inactivo', 'activo'])
        // setEstados('inactivo')
    },[]
    )

    /*Obtener/Listar información de "Vendedores"*/

    const obtenerVendedores = async () => {
        // const id = sessionStorage.getItem('idusuario')
        const token = sessionStorage.getItem('token')
        const res =await Axios.get('http://localhost:4000/usuario/vervendedores',
            {
                headers: { 'autorizacion': token }
            }
        )
    //     .then((res) => {
    //             console.log(res.data)
    //             setVendedores(res.data)

    //   })

    //   .catch((err) => {

    //   console.log(err)

    //           });
        // console.log(res.data)
        setVendedores(res.data)
    }

    /*Eliminar vendedor*/
    const eliminar=async(id)=>{
        const token=sessionStorage.getItem('token')
        const respuesta=await Axios.delete('http://localhost:4000/usuario/borrar/'+id,{
            headers:{'autorizacion':token}
        })
        const mensaje=respuesta.data.mensaje 
        Swal.fire({
            icon:'success',
            title:mensaje,
            showConfirmButton:false, 
            timer:1500
        })
        obtenerVendedores() 
    }

    /*Guardar vendedor*/
    const guardar = async (e) => {
        e.preventDefault()
        const usuario = {
            nombre,
            correo,
            contrasena,
            estado:estadoSelect,
            rol: rolselect,
        }

        const token = sessionStorage.getItem('token')

        const respuesta = await Axios.post('http://localhost:4000/usuario/crear', usuario, {
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
            window.location.href = '/usuarios'

        }, 1500)
    }

  

    const buscar = async (e) => {
        if (e.target.value === '') {
            return obtenerVendedores()
        }
        const buscar = e.target.value
        const token = sessionStorage.getItem('token')
        const respuesta = await Axios.get('http://localhost:4000/usuario/buscar/' + buscar, {
            headers: { 'autorizacion': token }
        })
        setVendedores(respuesta.data)
    }

    const estado2 = sessionStorage.getItem('estado');
    const role = sessionStorage.getItem('rol');
    return (

        <div>
            <Navbar2/>
            {/*Encabezado titular "Vendedores"*/}
            {estado2=='activo' && role == 'administrador' ?<div>
            <header className='py-2 bg-primary text-white'>
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <h1> <i className='fas fa-pencil-alt'></i>Vendedores</h1>
                        </div>
                    </div>
                </div>
            </header>

            {/*Botón Agregar Vendedor*/}

            <nav className='navbar py-4'>
                <div className="container">
                    <div className="col-md-3">
                        <Link to='#' className="btn btn-primary btn-block" data-toggle='modal' data-toggle='modal' data-target='#addVendedor'>
                            <i className='fas fa-plus'>Agregar Vendedor</i>
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
                            
                                <div className="card-header">
                                    <h4>Vendedores de ventasoft</h4>
                                </div>
                                
                                <table className='table table-responsive-lg table-striped'>
                                    <thead className='thead-dark '>
                                   
                                        <tr>
                                            <th>#</th>
                                            <th>Nombre</th>
                                            <th>Correo</th>
                                            <th>Rol</th>
                                            <th>Estado</th>
                                            <th>Opciones</th>
                                        </tr>

                                    </thead>
                                   
                                    <tbody>
                                        {
                                            vendedores.map((vendedor, i) => (
                                                <tr key={vendedor._id}>
                                                    <td>{i + 1}</td>
                                                    <td>{vendedor.nombre}</td>
                                                    <td>{vendedor.correo}</td>
                                                    <td>{vendedor.rol}</td>
                                                    <td>{vendedor.estado}</td>
                                                    <td>
                                                        
                                                        <button className='btn btn-warning mr-1' onClick={()=>eliminar(vendedor._id)} >Eliminar</button>
                                                        <Link className='btn btn-danger mr-1' to={'/editar/' + vendedor._id}>Editar</Link>
                                                    </td>

                                                </tr>
                                            ))
                                        }

                                    </tbody>

                                </table>
                            
                            
                        </div>
                    </div>
                </div>
            </section>
            </div> : <Acceso/>     }                     
            {/*Modal para agregar vendedor*/}
            <div className="modal fade" id='addVendedor'>

            <div className="modal-dialog modal-lg">
                <div className='modal-content'>
                     
                     <div className="modal-header pg-primary text-black">
                         
                         <h2 className='modal-title mx-1'>Agregar Vendedor</h2>
                         <button className='close' data-dismiss='modal'>
                             <span>&times;</span>
                         </button>
                     </div>

                     <div className="modal-body">
                        <form onSubmit={guardar}>
                            
                            <div className="form-group">
                                <label>Nombres</label>
                                <input type='text' className='form-control' required onChange={(e)=>setNombres(e.target.value)}/>
                            </div>

                            <div className="form-group">
                                <label>Correo</label>
                                <input type='email' className='form-control' required onChange={(e)=>setCorreo(e.target.value)}/>
                            </div>
                            <div className="form-group">
                                <label>Contraseña</label>
                                <input type='password' className='form-control' required onChange={(e)=>setContrasena(e.target.value)}/>
                            </div>

                            <div className="form-group">
                                <label>Estado</label>
                                {/* <input type='text' className='form-control' required onChange={(e)=>setEstado(e.target.value)}/> */}
                                <select className='form-control' onChange={(e)=>
                                    setEstados(e.target.value)}>
                                        {
                                            estado.map(trol=>(
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
                                <select className='form-control' onChange={(e)=>
                                    setRolselect(e.target.value)}>
                                        {
                                            rol.map(trol=>(
                                                <option key={trol}>
                                                    {trol}
                                                </option>
                                                )   
                                            )
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
