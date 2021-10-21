import React from "react";
import GoogleLogin from 'react-google-login';

function google() {
    const respuestaGoogle=(respuesta)=>{
        console.log(respuesta)
        console.log(respuesta.profileObj.name)
    }
    return (
        <div>
            <br/><br/>
            <GoogleLogin
                clientId="503743295569-f7kotl2jk1gtlukrnbt81rktcqhn0u19.apps.googleusercontent.com"
                buttonText="Iniciar sesion"
                onSuccess={respuestaGoogle}
                onFailure={respuestaGoogle}
                cookiePolicy={'single_host_origin'}
            />,
        </div>
    )
}

export default google