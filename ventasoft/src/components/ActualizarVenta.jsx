import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import Swal from 'sweetalert2'
import Navbar2  from './Navbar2'

export default function ActualizarVentas (props) {
    const [fecha, setFecha] = useState('')
    const [ventaId, setVentaId] = useState('')
    const [codigoProducto, setCodigoProducto] = useState('')
    const [cantidad, setCantidad] = useState('')
    const [precioUni, setPrecioUni] = useState('')
    const [clienteId, setClienteId] = useState('')
    const [nombreCliente, setNombreCliente] = useState('')
    const [vendedorId, setVendedorId] = useState('')
    const [nombreVendedor, setNombreVendedor] = useState('')
    const [estado, setEstado] = useState('')
    const [total, setTotal] = useState('')
    const [estadoSelect, setEstadoSelect] = useState('')


    
    const [ventas, setVentas] = useState([])


    useEffect(() => {
        //verVentas()
        setEstado(['En proceso', 'Cancelada', 'Entregada'])
        setEstadoSelect('En proceso')

    }, [])

    const verVentas = async () => {
    const id = props.match.params.id
    const token = sessionStorage.getItem('token')
        const respuesta = await Axios.get('http://localhost:4000/ventas//verVentass', {
        headers: { 'autorizacion': token }
        })
        console.log(respuesta.data)
        setFecha(respuesta.data)
        setVentaId(respuesta.data)
        setCodigoProducto(respuesta.data)
        setCantidad(respuesta.data)
        setPrecioUni(respuesta.data)
        setClienteId(respuesta.data)
        setNombreCliente(respuesta.data)
        setVendedorId(respuesta.data)
        setNombreVendedor(respuesta.data)
        setEstado(respuesta.data)
        setTotal(respuesta.data)
        setEstadoSelect(respuesta.data)

        const mensaje = respuesta.data.mensaje
        Swal.fire({
            icon: 'succes',
            title: mensaje,
            showConfirmButton: false
        })  

    console.log(respuesta.data)    
    setVentas(respuesta.data)
    }

 
    const actualizar = async (e) => {
        e.preventDefault()
        const id = props.match.params.id
        const token = sessionStorage.getItem('token')
    const venta = {
        fecha,
        ventaId,
        codigoProducto,
        cantidad,
        precioUni,
        clienteId,
        nombreCliente,
        vendedorId,
        nombreVendedor,
        estado: estadoSelect,
        total
    }
    
        const respuesta = await Axios.put('http://localhost:4000/ventas/actualizar/' + id, venta, {
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
        var Box1 = document.getElementById('precio').value;
        var Box2 = document.getElementById('cantidad').value;
        var result = document.getElementById('total');
        var myResult = Box1 * Box2;
        result.value = myResult;
        setTotal(result.value = myResult);
        console.log(myResult)
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
                                        <div className="col-md-5 ">
                                            <label className="form-label">Fecha</label>
                                            <input type="date" className='form-control' required onChange={(e) => setFecha(e.target.value)} />
                                        </div>
                                    </div>
                                </div>

                                <div className='md-3'>
                                    <div className="row">
                                        <div className="col-md-5 ">
                                            <label className="form-label">Código Producto</label>
                                            <input type="number" className='form-control'  required onChange={(e) => setCodigoProducto(e.target.value)} />
                                        </div>

                                        <div className="col-md-4">
                                            <label className="form-label">Precio Unitario</label>
                                            <input type="number" id="precio" className='form-control' required onChange={(e) => setPrecioUni(e.target.value)} />
                                        </div>

                                        <div className="col-md-3">
                                            <label className="form-label">Cantidad</label>
                                            <input type="number" id="cantidad" className='form-control' required onChange={(e) => setCantidad(e.target.value)} />
                                        </div>
                                    </div>
                                </div>
                                
                                <div className='md-3'>
                                    <div className="col-md-5">
                                        <label className="form-label">Total a pagar</label>
                                        <input type="number" className='form-control' id="total" required onChange={() => setTotal(calcular)} />
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


                                <div className='md-3'>
                                    <div className="col-md-5">
                                        <label className="form-label">Estado</label>
                                        {/*<select className='md-3' onChange={(e) => setEstadoSelect(e.target.value)}>
                                                            {
                                                                estado.map(estado => (
                                                                    <option key={estado}>
                                                                        {estado}
                                                                    </option>
                                                                ))} 
                                                            </select>*/}

                                        <select className="form-select" required id="select" >

                                            <option selected ></option>
                                            <option value="1">En proceso</option>
                                            <option value="2">Cancelada</option>
                                            <option value="3">Entregada</option>
                                        </select>
                                    </div>
                                </div>

                                {/* <div className="md-3">
                                                        <button className="btn btn-primary" type="submit" >Guardar</button>
                                                    </div>  */}


                                <div className="py-md-3">
                                    <button className="btn btn-warning" type="submit">Actualizar</button>
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