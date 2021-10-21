import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Axios from 'axios'
import Swal from 'sweetalert2'
import Navbar2  from './Navbar2'

export default function ActualizarVentas(props) {
    
    const [fecha, setFecha] = useState('')
    const [codigoProducto, setCodigoProducto] = useState('')
    const [cantidad, setCantidad] = useState('')
    const [precioUni, setPrecioUni] = useState('')
    const [clienteId, setClienteId] = useState('')
    const [nombreCliente, setNombreCliente] = useState('')
    const [vendedorId, setVendedorId] = useState('')
    const [nombreVendedor, setNombreVendedor] = useState('')
    const [totalPago, setTotal] = useState('')
    const [estado, setEstado] = useState([])
    const [estadoSelect, setEstadoSelect] = useState('')
    const [ventas, setVentas] = useState([])
    const [productos, setProductos] = useState([])
    const [vendedores, setVendedores] = useState([])


    useEffect(() => {
        //obtenerProductos()
        //obtenerVendedores()   
        setEstado(['En proceso', 'Cancelada', 'Entregada'])
       // setEstadoSelect('En proceso')
        obtenerVentas()
        
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
        setVendedorId(respuesta.data.vendedorId)
        setNombreVendedor(respuesta.data.nombreVendedor)
        setEstadoSelect(respuesta.data.estado)
        setTotal(respuesta.data.totalPago)
     


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

        // const buscarVendedores = async (e) => {
        //     if (e.target.value === '') {
        //         return obtenerVendedores()
        //     }
        //     const buscar = e.target.value
        //     const token = sessionStorage.getItem('token')
        //     const respuesta = await Axios.get('http://localhost:4000/usuario/buscar/' + buscar, {
        //         headers: { 'autorizacion': token }
        //     })
        //     setVendedores(respuesta.data)
        // }



        // const buscarVentas = async (e) => {
        //     if (e.target.value === '') {
        //         return obtenerVentas()
        //     }
        //     const buscar = e.target.value
        //     console.log(buscar)
        //     const token = sessionStorage.getItem('token')
        //     const res = await Axios.get('http://localhost:4000/ventas/buscar/' + buscar, {
        //         haeaders: { 'autorizacion': token }
        //     })
        //     setVentas(res.data)
        //     console.log(res.data)
        // }

        // const buscarProductos = async (e) => {
        //     if (e.target.value === '') {
        //         return obtenerProductos()
        //     }
        //     const buscar = e.target.value
        //     const token = sessionStorage.getItem('token')
        //     const respuesta = await Axios.get('http://localhost:4000/producto/buscar/' + buscar, {
        //         headers: { 'autorizacion': token }
        //     })
        //     setProductos(respuesta.data)
        // }


    //     const mensaje = respuesta.data.mensaje
    //     Swal.fire({
    //         icon: 'succes',
    //         title: mensaje,
    //         showConfirmButton: false
    //     })  

    // console.log(respuesta.data)    
    // setVentas(respuesta.data)
    }

 



    //http://localhost:4000/ventas//modificar/616a13ea892ab885d1d00122

    const actualizar = async (e) => {
        e.preventDefault()
        const id = props.match.params.id

        const token = sessionStorage.getItem('token')
        const venta = {
            fecha,
            codigoProducto,
            cantidad,
            precioUni,
            clienteId,
            nombreCliente,
            vendedorId,
            nombreVendedor,
            estado:estadoSelect,
            totalPago
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
                                            <input value = {fecha} type="date" className='form-control' required onChange={(e) => setFecha(e.target.value)} />
                                        </div>
                                    </div>
                                </div>

                                <div className='md-3'>
                                    <div className="row">
                                        <div className="col-md-5 ">
                                            <label className="form-label">Código Producto</label>
                                            <input value = {codigoProducto} type="number" className='form-control'  required onChange={(e) => setCodigoProducto(e.target.value)} />
                                        </div>

                                        <div className="col-md-4">
                                            <label className="form-label">Precio Unitario</label>
                                            <input value={precioUni} type="number" id="precio" className='form-control' required
                                                onChange={(e) => setPrecioUni(calcular)} />
                                        </div>

                                        <div className="col-md-3">
                                            <label className="form-label">Cantidad</label>
                                            <input value={cantidad} type="number" id="cantidad" className='form-control' required onChange={() => setCantidad(calcular)} />
                                                {/* //setCantidad(e.target.value)} /> */}
                                        </div>
                                    </div>
                                </div>
                                <div className='md-3'>
                                    <div className="row">
                                        <div className="col-md-5 ">
                                        <label className="form-label">Total a pagar</label>
                                        <input value={totalPago} type="number" className='form-control' id="total" required onChange={() => setTotal(calcular)} />
                                        {/* <input value = {total} type="number" className='form-control' id="total" required onChange={() => setTotal(calcular)} /> */}
                                    </div>
                                </div>
                            </div>
                                <div className='md-3'>
                                    <div className="row">
                                        <div className="col-md-5">
                                            <label className="form-label">Identificación cliente</label>
                                            <input value={clienteId}type="number" className='form-control' required onChange={(e) => setClienteId(e.target.value)} />
                                        </div>

                                        <div className="col-md-7">
                                            <label className="form-label">Nombre Cliente</label>
                                            <input value={nombreCliente} type="text" className='form-control' required onChange={(e) => setNombreCliente(e.target.value)} />
                                        </div>
                                    </div>
                                </div>

                                <div className='md-3'>
                                    <div className="row">
                                        <div className="col-md-5">
                                            <label className="form-label">Identificación Vendedor</label>
                                            <input value = {vendedorId} type="number" className='form-control' required onChange={(e) => setVendedorId(e.target.value)} />
                                        </div>

                                        
                                        
                                        <div className="col-md-7">
                                            <label className="form-label">Nombre Vendedor</label>
                                            <input value={nombreVendedor} type="text" className='form-control' required onChange={(e) => setNombreVendedor(e.target.value)} />

                                             {/* <select value={nombreVendedor} name='vendedor' className='form-control' defaultValue='' required>
                                                <option disabled value=''>
                                                    Seleccione un Vendedor
                                                </option>
                                                {vendedores.map((vendedor) => {
                                                    return <option key={vendedor._id} value={vendedor._id}>{`${vendedor.nombre}`}</option>;

                                                })}
                                            </select> */}
                                            

                                            
                                        </div>

                                    </div>
                                </div>

                                 <div className="form-group">
                                    <label>Estado</label>
                                    <select value={estadoSelect}className='form-control' onChange={(e) =>
                                        setEstadoSelect(e.target.value)}>                                
                                            {
                                                estado.map(setEstado => (
                                                <option key={setEstado} >
                                                    {setEstado}
                                                </option>
                                                    ))
                                            }
                                    </select> 
                                    
                                </div>

                                <div className="form-group ">
                                {/* //<div className="py-md-3"> */}
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