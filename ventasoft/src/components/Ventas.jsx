import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import Axios from 'axios'
import Navbar2 from './Navbar2'
import Acceso from './Acceso'

export default function MIndexVentas() {


    const [ventas, setVentas] = useState([])
    const [fecha, setFecha] = useState('')
    const [codigoProducto, setCodigoProducto] = useState('')
    const [cantidad, setCantidad] = useState('')
    const [precioUni, setPrecioUni] = useState('')
    const [clienteId, setClienteId] = useState('')
    const [nombreCliente, setNombreCliente] = useState('')
    const [vendedorId, setVendedorId] = useState('')
    const [nombreVendedor, setNombreVendedor] = useState('')
    const [estado, setEstado] = useState('')
    const [totalPago, setTotal] = useState('')
    const [estadoSelect, setEstadoSelect] = useState('')
    const [productos, setProductos] = useState([])
    const [listarVentas, setListarVentas] = useState([])


    useEffect(() => {
        obtenerVentas()
        setEstado(['En proceso', 'Cancelada', 'Entregada'])
        setEstadoSelect('En proceso')
    }, [])


    const obtenerVentas = async () => {
        const id = sessionStorage.getItem('ventaId')
        const token = sessionStorage.getItem('token')
        const respuesta = await Axios.get('http://localhost:4000/ventas/verventas',
            {
                headers: { 'autorizacion': token }
            })
        setVentas(respuesta.data)
        console.log(respuesta.data)
    }


    // const mensajeEjemplo = () => {
    //     Swal.fire({
    //         title: "Gestión de ventas",
    //         text: "Venta eliminada",
    //         icon: "succes",
    //         button: "Aceptar"
    //     })
    // }

    const buscar = async (e) => {
        if (e.target.value === '') {
            return obtenerVentas()
        }
        const buscar = e.target.value
        console.log(buscar)
        const token = sessionStorage.getItem('token')
        const respuesta = await Axios.get('http://localhost:4000/ventas/buscar/' + buscar, {
            haeaders: { 'autorizacion': token }
        })
        setVentas(respuesta.data)
        console.log(respuesta.data)
    }


    // const crearVentas = async (e) => {
    //     e.preventDefault()
    //     const capturaVenta = { fecha, codigoProducto, cantidad, precioUni, clienteId, nombreCliente, vendedorId, nombreVendedor, totalPago }
    //     const respuesta = await Axios.post('http://localhost:4000/ventas/crearventa', capturaVenta)
    //     const mensaje = respuesta.data.mensaje
    //     if (mensaje !== 'Bienvenido') {
    //         console.log(respuesta)
    //         Swal.fire({
    //             icon: 'success',
    //             title: mensaje,
    //             showConfirmButton: false,
    //             timer: 1500

    //         })
    //     } else {
    //         const token = respuesta.data.token
    //         sessionStorage.setItem('token', token)
    //         window.location.href = '/ventasIndex'
    //     }
    // }


    const guardar = async (e) => {
        e.preventDefault()
        const ventas = {
            fecha,
            codigoProducto,
            cantidad,
            precioUni,
            clienteId,
            nombreCliente,
            vendedorId,
            nombreVendedor,
            estado: estadoSelect,
            totalPago
        }
        const token = sessionStorage.getItem('token')
        const respuesta = await Axios.post('http://localhost:4000/ventas/crearventa', ventas, {
            headers: { 'autorizacion': token }
        })

        const mensaje = respuesta.data.mensaje
        Swal.fire({
            icon: 'succes',
            title: mensaje,
            showConfirmButton: false
        })
        setTimeout(() => {
            window.location.href = '/ventas'
        }, 1500)

    }


    const eliminar = async (id) => {
        const token = sessionStorage.getItem('token')
        const respuesta = await Axios.delete('http://localhost:4000/ventas/borrar/' + id, {
            headers: { 'autorizacion': token }
        })
        const mensaje = respuesta.data.mensaje
        Swal.fire({
            icon: 'succes',
            title: mensaje,
            showConfirmButton: false,
            timer: 1500
        })
        obtenerVentas()
    }



    function calcular() {
        var Box1 = document.getElementById('precio').value;
        var Box2 = document.getElementById('cantidad').value;
        var result = document.getElementById('total');
        var myResult = Box1 * Box2;
        result.value = myResult;
        setTotal(result.value = myResult);
        console.log(myResult)
    }

    const estado2 = sessionStorage.getItem('estado');
    const role = sessionStorage.getItem('rol');
    return (
        <div>
            <Navbar2 />
            {estado2 == 'activo' && (role == 'vendedor' || role == 'administrador') ? <div>
                <header className='py-2 bg-primary text-white'>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6">
                                <h1><i className="fas fa-pencil-alt"></i>Ventas</h1>
                            </div>
                        </div>
                    </div>
                </header>

                {/* //BUSCAR */}

                <nav className='navbar py-4'>
                    <div className="container">
                        <div className="col-md-3">
                            <Link to='#' className="btn btn-primary btn-block" data-toggle='modal' data-toggle='modal' data-target='#addVenta'>
                                <i className='fas fa-plus'>Agregar Ventas</i>
                            </Link>
                        </div>
                        <div className="col-md-6 ml-auto">


                            <div className="col">
                                <div class="input-group">
                                    <select className="form-select" id="inputGroupSelect01">
                                        <option selected>Buscar por...</option>
                                        <option value="1">Identificador de la venta</option>
                                        <option value="2">Identificación cliente</option>
                                        <option value="3">Nombre cliente</option>
                                    </select>

                                    <input type="text" className="form-control" placeholder="Buscar por" aria-label="Buscar" aria-describedby="button-addon2" onChange={(e) => buscar(e)} />
                                    <button class="btn btn-outline-secondary" type="button" id="button-addon2" onClick={buscar}>Buscar</button>
                                </div>
                            </div>

                        </div>



                    </div>
                </nav >



                {/* MOSTRAR EMPLEADOS */}
                <section>
                    <div class="container-fluid py-md-4">
                        <div className="row">
                            <div className="col -md-15">
                                <div className="card">
                                    <div className="card-header"><h4>Ventas</h4></div>

                                </div>


                                <table className="table -table-striped card-text">
                                    <thead class="table-dark text-white">
                                        <tr>
                                            <th>Fecha</th>
                                            <th>CódigoProducto</th>
                                            <th>Cantidad</th>
                                            <th>Precio Unitario</th>
                                            <th>Identificación Cliente</th>
                                            <th>Nombre Cliente</th>
                                            <th>Identificación vendedor</th>
                                            <th>Nombre vendedor </th>
                                            <th>Estado </th>
                                            <th>Total</th>
                                            <th>Opciones </th>
                                        </tr>
                                    </thead>
                                    <tbody>



                                        {
                                            ventas.map((venta, i) => (
                                                <tr key={venta._id} >
                                                    <td>{venta.fecha}</td>
                                                    <td>{venta.codigoProducto}</td>
                                                    <td>{venta.cantidad}</td>
                                                    <td>{venta.precioUni}</td>
                                                    <td>{venta.clienteId}</td>
                                                    <td>{venta.nombreCliente}</td>
                                                    <td>{venta.vendedorId}</td>
                                                    <td>{venta.nombreVendedor}</td>
                                                    <td>{venta.estado}</td>
                                                    <td>{venta.totalPago}</td>
                                                    <td>

                                                        <Link className="btn btn-warning mr-1" to={'/editVentas/' + venta._id}>Editar</Link>
                                                        <button className="btn btn-danger mr-0" onClick={() => eliminar(venta._id)}>Eliminar</button>
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
            </div> : <Acceso/>}



            {/* MODAL */}

            <div className="modal fade" id='addVenta'>

                <div className="modal-dialog modal-lg">
                    <div className='modal-content'>

                        <div className="modal-header pg-primary text-black">
                            <h2 className='modal-title'>Agregar Venta</h2>
                            <button className='close' data-dismiss='modal'>
                                <span>&times;</span>
                            </button>
                        </div>

                        <div className="modal-body">
                            <form onSubmit={guardar}>
                                {/* <form onSubmit={crearVentas}> */}

                                <div className="form-group">
                                    <label>Fecha</label>
                                    <input type='date' className='form-control' required onChange={(e) => setFecha(e.target.value)} />
                                </div>

                                <div className="form-group">
                                    <label>Código producto</label>
                                    <input type='text' className='form-control' required onChange={(e) => setCodigoProducto(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label>Cantidad</label>
                                    <input type='number' className='form-control' required onChange={(e) => setCantidad(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label>Precio Unitario</label>
                                    <input type='text' className='form-control' required onChange={(e) => setPrecioUni(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label>Total a pagar</label>
                                    <input type='number' className='form-control' required onChange={(e) => setTotal(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label>Identificación Cliente</label>
                                    <input type='text' className='form-control' required onChange={(e) => setClienteId(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label>Nombre cliente</label>
                                    <input type='text' className='form-control' required onChange={(e) => setNombreCliente(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label>Identificación Vendedor</label>
                                    <input type='text' className='form-control' required onChange={(e) => setVendedorId(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label>Nombre vendedor</label>
                                    <input type='text' className='form-control' required onChange={(e) => setNombreVendedor(e.target.value)} />
                                </div>

                                <div className="form-group">
                                    <label>Estado</label>


                                    {/* <input type='text' className='form-control' required onChange={(e)=>setEstado(e.target.value)}/> */}
                                    {/* <select className='form-control' onChange={(e) =>
                                        setEstadoSelect(e.target.value)}>
                                         {
                                            estado.map(setEstado => (
                                                <option key={setEstado}>
                                                    {setEstado}
                                                </option>
                                            )
                                            )
                                        }  
                                    </select> */}



                                    <select className="form-select" required id="select" >

                                        <option selected ></option>
                                        <option value="1">En proceso</option>
                                        <option value="2">Cancelada</option>
                                        <option value="3">Entregada</option>
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






















            {/* <div className="modal fade" id="addVentas" tabindex="-1" aria-labelledby="addVentasLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header bg-primary text-white">
                            <h5 className="modal-title" id="exampleModalLabel">Gestión de ventas</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>

                        <div className="modal-body">

                            <form onSubmit={guardar}>
                                <div className='md-3'>
                                    <div className="row">
                                        <div className="col-md-5 ">
                                            <label className="form-label">Fecha</label>
                                            <input type="date" className='form-control' required onChange={(e) => setFecha(e.target.value)} />
                                        </div>

                                        <div className='md-3'>
                                            <div className="row">
                                                <div className="col-md-5 ">
                                                    <label className="form-label">Código Producto</label>
                                                    <input type="number" className='form-control' required onChange={(e) => setCodigoProducto(e.target.value)} />
                                                </div>

                                                <div className='col'>
                                                    <label className="form-label">Precio Unitario</label>
                                                    <input type="number" id="precio" className='form-control' required onChange={(e) => setPrecioUni(e.target.value)} />
                                                </div>

                                                <div className="col">

                                                    <label className="form-label">Cantidad</label>
                                                    <input type="number" id="cantidad" className='form-control' required onChange={(e) => setCantidad(e.target.value)} />
                                                </div>
                                            </div>
                                        </div>

                                        <div className='md-3'>
                                            <div className="row">
                                                <div className="col-md-5">

                                                    <label className="form-label">Total a pagar</label>
                                                    <input type="number" className='form-control' id="total" required onChange={() => setTotal(calcular)} />
                                                </div>
                                            </div>
                                        </div>


                                        <div className='md-3'>
                                            <div className="row">
                                                <div className="col-md-5">
                                                    <label className="form-label">Identificación cliente</label>
                                                    <input type="number" className='form-control' required onChange={(e) => setClienteId(e.target.value)} />
                                                </div>

                                                <div className="col-md-7">
                                                    <label className="form-label">Nombre Cliente</label>
                                                    <input type="text" className='form-control' required onChange={(e) => setNombreCliente(e.target.value)} />
                                                </div>
                                            </div>
                                        </div>

                                        <div className='md-3'>
                                            <div className="row">
                                                <div className="col-md-5">
                                                    <label className="form-label">Identificación Vendedor</label>
                                                    <input type="number" className='form-control' required onChange={(e) => setVendedorId(e.target.value)} />
                                                </div>

                                                <div className="col-md-7">
                                                    <label className="form-label">Nombre Vendedor</label>
                                                    <input type="text" className='form-control' required onChange={(e) => setNombreVendedor(e.target.value)} />
                                                </div>
                                            </div>
                                        </div>


                                        
                                    </div>
                                </div>

                                <div className="form-group">
                                    <div class="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                        <button className="btn btn-primary" type="submit">Guardar</button>
                                    </div>
                                </div>


                            </form>
                        </div 

                    </div>
                </div> 




            </div > */}





        </div >


    )
}


