import React from 'react';
import logo from './assets/images/logo.svg';
import './assets/css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// Nav

import Nav from './componentes/nav/Nav';
import Footer from './componentes/footer/Footer';


function App() {
  return (
    <div className="App">

      <nav className="NavCss"><Nav/></nav>

      <footer><Footer/></footer>
    </div>
  );
}

export default App;
