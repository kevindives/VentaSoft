import React from 'react'
import GoogleLogin from 'react-google-login';
import Axios from 'axios'
import Swal from 'sweetalert2'
function LoginGoogle() {



    const respuestaGoogle = async (respuesta2) => {

        // console.log(respuesta2)
        // console.log(respuesta2.profileObj)
        const correo = respuesta2.profileObj.email
        const usuario = { correo }
        const respuesta = await Axios.post('/usuario/loginGoogle', usuario)
        const mensaje = respuesta.data.mensaje
        if (mensaje !== 'Bienvenido') {
            const nombre = respuesta2.profileObj.name
            const correo = respuesta2.profileObj.email
            const contrasena =respuesta2.profileObj.email
            const usuario = { nombre, correo,contrasena }
            const resp = await Axios.post('/usuario/crear', usuario)
            const menssage = resp.data.mensaje
            if (menssage !== 'Bienvenido') {
                Swal.fire({
                    icon: 'error',
                    title: mensaje,
                    showConfirmButton: false,
                    timer: 1500
                })
            } else {
                const token = resp.data.token
                const nombre = resp.data.nombre
                const idusuario = resp.data.id
                const estado = resp.data.estado
                const rol = resp.data.rol
                sessionStorage.setItem('token', token)
                sessionStorage.setItem('nombre', nombre)
                sessionStorage.setItem('idusuario', idusuario)
                sessionStorage.setItem('estado', estado)
                sessionStorage.setItem('rol', rol)
                window.location.href = '/home'
            }



        } else {
            const token = respuesta.data.token
            const nombre = respuesta.data.nombre
            const idusuario = respuesta.data.id
            const estado = respuesta.data.estado
            const rol = respuesta.data.rol
            sessionStorage.setItem('token', token)
            sessionStorage.setItem('nombre', nombre)
            sessionStorage.setItem('idusuario', idusuario)
            sessionStorage.setItem('estado', estado)
            sessionStorage.setItem('rol', rol)
            window.location.href = '/home'
        }
    }
    return (
        <div>
            <br /><br />

            <GoogleLogin

                clientId="503743295569-f7kotl2jk1gtlukrnbt81rktcqhn0u19.apps.googleusercontent.com"
                buttonText="Iniciar sesion"
                onSuccess={respuestaGoogle}
                onFailure={respuestaGoogle}
                cookiePolicy={'single_host_origin'}
            />

        </div>
    )
}

export default LoginGoogle