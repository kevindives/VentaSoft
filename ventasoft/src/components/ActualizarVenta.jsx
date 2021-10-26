import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Axios from 'axios'
import Swal from 'sweetalert2'
import Navbar2 from './Navbar2'

export default function ActualizarVentas(props) {

    const [fecha, setFecha] = useState('')
    const [codigoProducto, setCodigoProducto] = useState([])
    const [nombreProducto, setNombreProducto] = useState('')
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
    const [vendedores, setVendedores] = useState([])


    useEffect(() => {
        obtenerVentas()
        obtenerProductos()
        obtenerVendedores()
        setEstado(['En proceso', 'Cancelada', 'Entregada'])
    }, [])


    const obtenerVentas = async () => {
        const id = props.match.params.id
        console.log(id)
        const token = sessionStorage.getItem('token')
        const respuesta = await Axios.get('http://localhost:4000/ventas/verventas/' + id,{
            headers: { 'autorizacion': token }
        })
        console.log(respuesta.data)
        setFecha(respuesta.data.fecha)
        setCodigoProducto(respuesta.data.codigoProducto)
        setCantidad(respuesta.data.cantidad)
        setPrecioUni(respuesta.data.precioUni)
        setClienteId(respuesta.data.clienteId)
        setNombreCliente(respuesta.data.nombreCliente)
        setNombreVendedor(respuesta.data.nombreVendedor)
        setEstadoSelect(respuesta.data.estado)
        setTotal(respuesta.data.totalPago)
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
        console.log(setProductos)
        //setNombreProdcucto(producto.nombre)

    }



    //http://localhost:4000/ventas//modificar/616a13ea892ab885d1d00122

    const actualizar = async (e) => {
        e.preventDefault()
        const id = props.match.params.id
        const token = sessionStorage.getItem('token')
        const venta = {fecha, codigoProducto, cantidad, precioUni, clienteId, nombreCliente,   nombreVendedor, estado:estadoSelect, totalPago
        }
            const respuesta = await Axios.put('http://localhost:4000/ventas/modificar/' + id, venta, {
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


    function calcular() {
        var resultado = document.getElementById('total');
        var myResult = document.getElementById('precio').value * document.getElementById('cantidad').value
        resultado.value = myResult;
        setTotal(resultado.value = myResult);
        setPrecioUni(document.getElementById('precio').value)
        setCantidad(document.getElementById('cantidad').value)

    }


    return (
        <div>
            <Navbar2/>
            <div className="container col-md-6 mt-4">
                <div className="card">
                    <div className="card-header">
                        <h3>Editar la venta </h3>
                        <div className="card-body">

                            <form onSubmit={actualizar}>

                               <div className='md-3'>
                                    <div className="row">
                                        <div className="col-md-6 ">
                                            <label className="form-label">Fecha</label>
                                            <input value = {fecha} type="date" className='form-control' required onChange={(e) => setFecha(e.target.value)} />
                                        </div>
                                    </div>
                                </div>

                                {/* <div className='py-3 '>
                                    <div className="row">
                                        <div className="col-md-6 ">
                                            <label className="form-label">Código Producto</label>

                                            {/* <input value={codigoProducto} type="text" className='form-control' required onChange={(e) => setPrecioUni(e.target.value)} /> 

                                            <select className='form-control' name='producto' value={codigoProducto} defaultValue='' required id='codProducto' onChange={(e) => setCodigoProducto(e.target.value)}>
                                                <option disabled value=''>
                                                    Seleccione un producto
                                                </option>
                                                {
                                                productos.map((producto) => {
                                                    return (
                                                        <option
                                                            key={producto._id}
                                                            value={producto.nombre}>
                                                            {`${producto.nombre +' $'+producto.precio}`}
                                                             {`${producto.nombre}    ${producto.precio} `}
                                                        </option>
                                                    );
                                                })
                                                };
                                            </select>
                                            <input value={codigoProducto} type="text" className='form-control' required onChange={(e) => setCodigoProducto(e.target.value)} />
                                        </div>
                                    </div>
                                </div>  */}

                                <div className='py-3'>
                                    <div className="row">
                                        <div className="col-md-6 ">
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

                                        <div className="col-md-6">

                                            <label className="form-label">Precio Unitario</label>
                                            <input value={precioUni} type="number" id="precio" className='form-control' required onChange={() => setPrecioUni(calcular)} />
                                    </div>
                                </div>
                            </div>


                                <div className='py-2'>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label className="form-label">Cantidad</label>
                                            <input value={cantidad} type="number" id="cantidad" className='form-control' required onChange={() => setCantidad(calcular)} />
                                            {/* //setCantidad(e.target.value)} /> */}
                                        </div>

                                    <div className="col-md-6 ">
                                        <label className="form-label">Total a pagar</label>
                                        <input value={totalPago} type="number" className='form-control' id="total" required onChange={() => setTotal(calcular)} />
                                    </div>
                                </div>
                                </div>


                                <div className="md-3">
                                    <div className="row">
                                    <div className="col-md-6 ">

                                    <label>Estado</label>
                                    <select value={estadoSelect} className='form-control' onChange={(e) => setEstadoSelect(e.target.value)}>
                                        {
                                            estado.map(setEstado => (
                                                <option key={setEstado} >
                                                    {setEstado}
                                                </option>
                                            ))
                                        }
                                    </select>
                                </div>
                            </div>
                        </div>

                                <div className='py-3'>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label className="form-label">Identificación cliente</label>
                                            <input value={clienteId}type="number" className='form-control' required onChange={(e) => setClienteId(e.target.value)} />
                                        </div>

                                        <div className="col-md-6">
                                            <label className="form-label">Nombre Cliente</label>
                                            <input value={nombreCliente} type="text" className='form-control' required onChange={(e) => setNombreCliente(e.target.value)} />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                <div className='md-3'>
                                    <div className="row">
                                        <label>Nombre vendedor</label>
                                            <select name='vendedor' className='form-control' value={nombreVendedor}defaultValue='' required id="nomVendedor" onChange={(e) => setNombreVendedor(e.target.value)}>
                                                <option disabled value=''>
                                                    Seleccione un Vendedor
                                                </option>
                                                    {vendedores.map((vendedor) => {
                                                        return <option key={vendedor._id} value={vendedor.nombre}>{`${vendedor.nombre}`}</option>;
                                                    })}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="py-3">
                                    <button className="btn btn-warning col-" type="submit">Actualizar</button>
                                    <Link className='btn btn-warning  m-lg-1' to={'/ventas/'}>Cancelar</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

//export default Actualizar