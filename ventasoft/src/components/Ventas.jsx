import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import Axios from 'axios'
import Navbar2 from './Navbar2'
import Acceso from './Acceso'
export default function MIndexVentas() {

    const [fecha, setFecha] = useState('')
    const [codigoProducto, setCodigoProducto] = useState('')
    const [nombreProducto, setNombreProducto] = useState([])
    const [precioUni, setPrecioUni] = useState('')
    const [cantidad, setCantidad] = useState('')
    const [totalPago, setTotal] = useState('')
    const [clienteId, setClienteId] = useState('')
    const [nombreCliente, setNombreCliente] = useState('')
    const [nombreVendedor, setNombreVendedor] = useState('')
    const [estado, setEstado] = useState([])
    const [estadoSelect, setEstadoSelect] = useState('')
    const [ventas, setVentas] = useState([])
    const [productos, setProductos] = useState([])
    const [vendedores, setVendedores] = useState([]);


    useEffect(() => {
        obtenerVendedores()
        obtenerProductos()
        obtenerVentas()
        setEstado(['En proceso', 'Cancelada', 'Entregada'])
        setEstadoSelect('En proceso')
    }, [])


    const buscar = async (e) => {
        if (e.target.value === '') {
            return obtenerVentas()
        }
        const buscar = e.target.value
        const token = sessionStorage.getItem('token')

        //const respuesta = await Axios.get('http://localhost:4000/ventas/verVentas' + buscar, {
        const respuesta = await Axios.get('http://localhost:4000/ventas//buscar/' + buscar, {
            haeaders: { 'autorizacion': token }
        })
        setVentas(respuesta.data)
        console.log(respuesta.data)

        //Buscar ID Cliente
        // const respuesta = await Axios.get('http://localhost:4000/ventas//buscarID/' + buscar, {
        //     haeaders: { 'autorizacion': token }
        // })
        // setVentas(respuesta.data)


        //Buscar ID Venta
        // const respuesta = await Axios.get('http://localhost:4000/ventas//verventas/616a13f2892ab885d1d00124' + buscar, {
        //     haeaders: { 'autorizacion': token }
        // })
        // setVentas(respuesta.data)
    }

    const obtenerVentas = async () => {
        // const id = sessionStorage.getItem('ventaId')
        const token = sessionStorage.getItem('token')
        const res = await Axios.get('http://localhost:4000/ventas/verventas',
            {
                headers: { 'autorizacion': token }
            })
        setVentas(res.data)
        console.log(res.data)
    }

    const obtenerVendedores = async () => {
        // const id = sessionStorage.getItem('idusuario')
        const token = sessionStorage.getItem('token')
        const res = await Axios.get('http://localhost:4000/usuario/vervendedores',
            {
                headers: { 'autorizacion': token }
            }
        )
        setVendedores(res.data)
    }

    const obtenerProductos = async () => {
        // const id = sessionStorage.getItem('idusuario')
        const token = sessionStorage.getItem('token')
        const res = await Axios.get('http://localhost:4000/producto/listarproducto',
            {
                headers: { 'autorizacion': token }
            }
        )
        setProductos(res.data)
    }

    const buscarVendedores = async (e) => {
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



    const buscarVentas = async (e) => {
        if (e.target.value === '') {
            return obtenerVentas()
        }
        const buscar = e.target.value
        console.log(buscar)
        const token = sessionStorage.getItem('token')
        const res = await Axios.get('http://localhost:4000/ventas/buscar/' + buscar, {
            haeaders: { 'autorizacion': token }
        })
        setVentas(res.data)
        console.log(res.data)
    }

    const buscarProductos = async (e) => {
        if (e.target.value === '') {
            return obtenerProductos()
        }
        const buscar = e.target.value
        const token = sessionStorage.getItem('token')
        const respuesta = await Axios.get('http://localhost:4000/producto/buscar' + buscar, {
            headers: { 'autorizacion': token }
        })
        setProductos(respuesta.data)
    }


    const guardar = async (e) => {
        e.preventDefault()
        const ventas = {
            fecha, codigoProducto, precioUni, cantidad, totalPago, clienteId, nombreCliente, nombreVendedor, estado: estadoSelect
        }
        const token = sessionStorage.getItem('token')
        const respuesta = await Axios.post('http://localhost:4000/ventas/crearventa', ventas, {
            headers: { 'autorizacion': token }
        })
        const mensaje = respuesta.data.mensaje
        Swal.fire({
            icon: 'success',
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
        var resultado = document.getElementById('total');
        var myResult = document.getElementById('precio').value * document.getElementById('cantidad').value
        resultado.value = myResult;
        setTotal(resultado.value = myResult);
        setPrecioUni(document.getElementById('precio').value)
        setCantidad(document.getElementById('cantidad').value)
    }

    function consultaProd() {
        var consultaProd = [document.getElementById('consulta').value]
        console.log(consultaProd)

    }

    // const mensajeEjemplo = () => {
    //     Swal.fire({
    //         title: "Gestión de ventas",
    //         text: "Venta eliminada",
    //         icon: "succes",
    //         button: "Aceptar"
    //     })
    // }
    const estado2 = sessionStorage.getItem('estado');
    const role = sessionStorage.getItem('rol');
    return (
        <div>
            <Navbar2 />
            {estado2=='activo' && ( role=='vendedor' || role=='administrador')?<div>
            <header className='py-2 bg-primary text-white'>
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <h1><i className="fas fa-pencil-alt"></i>Ventas </h1>
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
                    <div className="col-md-5 ml-auto">
                        <div className="col">
                            <div class="input-group">
                                {/* <select className="form-select" id="inputGroupSelect">
                                    <option selected>Buscar por...</option>
                                    <option value="1">Identificador de la venta</option>
                                    <option value="2">Identificación cliente</option>
                                    <option value="3">Nombre cliente</option>
                                </select> */}

                                <input className="form-control" type="text" placeholder="Buscar por" aria-label="Buscar" aria-describedby="button-addon2" onChange={(e) => buscar(e)} />
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
                                <div className="card-header"><h4>Ventas de VentaSoft</h4></div>
                            </div>

                            <table className="table -table-striped card-text text-center">
                                <thead class="table-dark text-white ">
                                    <tr>
                                        <th>Identificador venta</th>
                                        <th className="col-md-1">Fecha</th>
                                        <th>CódigoProducto</th>
                                        <th>Precio Unitario</th>
                                        <th>Cantidad</th>
                                        <th>Identificación Cliente</th>
                                        <th className="col-md-1">Nombre Cliente</th>
                                        <th>Nombre vendedor </th>
                                        <th>Estado </th>
                                        <th>Total</th>
                                        <th className="col-md-2">Opciones </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        ventas.map((venta, i) => (
                                            <tr key={venta._id} >
                                                <td>{venta._id}</td>
                                                <td>{venta.fecha}</td>
                                                <td>{venta.codigoProducto}</td>
                                                <td>{venta.precioUni}</td>
                                                <td>{venta.cantidad}</td>
                                                <td>{venta.clienteId}</td>
                                                <td>{venta.nombreCliente}</td>
                                                <td>{venta.nombreVendedor}</td>
                                                <td>{venta.estado}</td>
                                                <td>{venta.totalPago}</td>
                                                <td>
                                                    <button className='btn btn-warning mr-1' onClick={() => eliminar(venta._id)} >Eliminar</button>
                                                    <Link className='btn btn-danger mr-1' to={'/editVentas/' + venta._id}>Editar</Link>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                                {/* <tr>
                                    <th>Totales</th>

                                </tr> */}
                            </table>
                        </div>
                    </div>
                </div>
            </section>
            </div> :   <Acceso/> }                

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
                                <div className="form-group">
                                    <div className="col-md-5 row">
                                        <label>Fecha</label>
                                        <input type='date' className='form-control' required onChange={(e) => setFecha(e.target.value)} />
                                    </div>
                                </div>

                                {/* <div className='py-3 '>
                                    <div className="row">
                                        <div className="col-md-5 ">
                                            <label className="form-label">Código Producto</label> */}
                                            {/* <input value={codigoProducto} type="text" className='form-control' required onChange={(e) => setCodigoProducto(e.target.value)} /> */}
                                            {/*
                                            <input value={codigoProducto} type="text" className='form-control' required onChange={(e) => setPrecioUni(e.target.value)} /> */}

                                            {/* <select name='producto' className='form-control' value={codigoProducto} defaultValue='' required id='codProducto' onChange={(e) => setCodigoProducto(e.target.value)} >
                                                <option disabled value=''>
                                                    Seleccione un producto
                                                </option>
                                                {
                                                    productos.map((producto) => {
                                                        return (
                                                            <option
                                                                key={producto._id}
                                                                value={producto.precio + ',' + producto.nombre}>
                                                                {`${producto.nombre}${producto.precio}`}
                                                                {/* {`${producto.nombre}    ${producto.precio} `} */}

                                                            {/* </option>
                                                            
                                                        );
                                                    })
                                                }
                                                <label>{productos.nombre}</label>
                                            </select>
                                        </div>
                                    </div>
                                </div> */} 


                                <div className='md-3'>
                                    <div className="row">
                                        <div className="col-md-5 ">
                                            <label>Nombre producto</label>
                                            <div className="form-group">
                                                {/* <input type='text' className='form-control' required onChange={(e) => setNombreProducto(e.target.value)} /> */}

                                                <select name='producto' className='form-control' value={codigoProducto} defaultValue='' required id='codProducto' onChange={(e) => setCodigoProducto(e.target.value)} >
                                                    <option disabled value=''>
                                                        Seleccione un producto
                                                    </option>
                                                    {
                                                        productos.map((producto) => {
                                                            return (
                                                                <option
                                                                    key={producto._id}
                                                                    value={producto.nombre}>
                                                                    {`${producto.nombre} ${producto.precio}`}

                                                                    {/* {`${producto.nombre}    ${producto.precio} `} */}
                                                                    
                                                                </option>
                                                                
                                                            );
                                                        })                                                        
                                                    }
                                                console.log(option.value)
                                                </select>
                                                
                                            </div>
                                        </div>

                                        <div className="col-md-5">
                                            <label className="form-label">Precio Unitario</label>
                                            <input value={codigoProducto.precio} type="number" id="precio" className='form-control' required onChange={(e) => setPrecioUni(calcular)} />
                                        </div>

                                    </div>

                                    <div className='py-3'>
                                        <div className="row">
                                            <div className="col-md-5">
                                                <label className="form-label">Cantidad</label>
                                                <input value={cantidad} type="number" id="cantidad" className='form-control' required onChange={() => setCantidad(calcular)} />
                                            </div>

                                            <div className="col-md-5 ">
                                                <label>Total a pagar</label>
                                                <input type='number' className='form-control' required id="total" onChange={() => setTotal(calcular)} />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="md-3">
                                    <div className="row">
                                        <div className="col-md-5 ">
                                            <label>Identificación Cliente</label>
                                            <input type='text' className='form-control' required onChange={(e) => setClienteId(e.target.value)} />
                                        </div>

                                        <div className="col-md-5 ">
                                            <label>Nombre cliente</label>
                                            <input type='text' className='form-control' required onChange={(e) => setNombreCliente(e.target.value)} />
                                        </div>
                                    </div>
                                </div>


                                <div className='py-3 '>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>Nombre vendedor</label>
                                            <select name='vendedor' className='form-control' defaultValue='' required id="nomVendedor" onChange={(e) => setNombreVendedor(e.target.value)}>
                                                <option disabled value=''>
                                                    Seleccione un Vendedor
                                                </option>
                                                {vendedores.map((vendedor) => {
                                                    return <option key={vendedor._id} value={vendedor.nombre}>{`${vendedor.nombre}`}</option>;
                                                })}
                                            </select>
                                        </div>
                                    </div>

                                <div className="py-3">
                                    <div className="row">
                                    <div className="col-md-6 ">
                                            <label>Estado</label>
                                            <select className='form-control' onChange={(e) =>
                                                setEstadoSelect(e.target.value)}>
                                                {
                                                    estado.map(estado => (
                                                        <option key={estado}>
                                                            {estado}
                                                        </option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                <div className="py-3">
                                    <button className='btn btn-primary' type='submit' >Guardar</button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div >



    )
}
