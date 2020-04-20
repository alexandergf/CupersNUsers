import React from 'react';
import logo from './assets/images/logo.svg';
import './assets/css/App.css';

// Nav

import Nav from './componentes/nav/Nav';
import Footer from './componentes/footer/Footer';


function App() {
  var nombre = "Pablo";
  return (
    <div className="App">
      <footer><Footer/></footer>
    </div>
  );
}

export default App;
