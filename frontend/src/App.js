import React from 'react';
import './assets/css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Nav from './componentes/nav/Nav';
import Footer from './componentes/footer/Footer';
import CuerpoTazas from './componentes/usosTazas/CuerpoTazas';


function App() {
  return (
    <div className="App">

      <nav className="NavCss"><Nav/></nav>

      <div>
        <CuerpoTazas/>
      </div>

      <footer><Footer/></footer>
    </div>
  );
}

export default App;
