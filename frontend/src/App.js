import React from 'react';
import './assets/css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// Nav

import Nav from './componentes/nav/Nav';
import Footer from './componentes/footer/Footer';
import Contacto from './componentes/contacto/Contacto';


function App() {
  return (
    <div className="App">

      <nav className="NavCss"><Nav/></nav>

      <div>
        <Contacto/>
      </div>

      <footer><Footer/></footer>
    </div>
  );
}

export default App;
