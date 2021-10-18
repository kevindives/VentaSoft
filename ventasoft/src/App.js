import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
// import Nav from './components/Nav';
import Login from './components/Login';
import { Registro } from './components/Registro';
import MHome from './components/MHome';
import Usuarios from './components/Usuarios'
import Actualizar from './components/Actualizar';
import Ventas from './components/Ventas'
import Productos from "./components/Productos"
import ActualizarProd from "./components/ActualizarProd"
import ActualizarVenta from './components/ActualizarVenta';

function App() {
  return (
    <Router>
      {/* <Nav /> */}
      <Route path='/' exact component={Login} />
      <Route path='/registrar' exact component={Registro} />
      <Route path='/home' exact component={MHome} />
      <Route path='/usuarios' exact component={Usuarios} />
      <Route path='/editar/:id' exact component={Actualizar} />
      <Route path='/ventas' exact component={Ventas}/>
      <Route path='/productos' exact component={Productos}/>
      <Route path='/editProductos/:id' exact component={ActualizarProd}/>
      <Route path='/editVentas/:id' exact component={ActualizarVenta}/>
     </Router>


  );
}

export default App;
