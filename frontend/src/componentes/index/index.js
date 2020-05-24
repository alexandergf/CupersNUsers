import React, { Component } from 'react';
import { Container, Row, Col, Collapse } from 'react-bootstrap';
import '../../assets/css/indexMain.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { userGetCart, getCateorys } from '../../database/functions';
// Componentes
import Nav from '../nav/Nav';
import MenuDesplegable from './menuDesplegable';
import PantallaInicial from './pantallaInicial';
import UsoTazas from '../usosTazas/CuerpoTazas';
import Login from '../login/login';
import Footer from '../footer/Footer';
import Perfil from '../perfil/perfil';
import Detail from '../detalles/detalles';
import Productos from '../productos/productos';
import Carrito from '../carrito/carrito';

export default class index extends Component {
    constructor(props){
        super(props);
        this.state = {
            categorias: [],
            activeLateralMenu: true,
            logOut: false,
            productosCarrito: []
        }
        this.lateralMenu = React.createRef();
        this.functionLogOut = this.functionLogOut.bind(this);
        this.actualizarCarrito = this.actualizarCarrito.bind(this);
        this.refreshCarrito = this.refreshCarrito.bind(this);
    }

    componentDidMount = () => {
        this.refreshCarrito();
        this.iniCategorias();
    }

    getStateLaterañMenu = (activo, mode) => {
        if(mode){
            this.setState({
                activeLateralMenu: !this.state.activeLateralMenu
            });
        }else{
            this.setState({
                activeLateralMenu: activo
            });
        }
    }

    iniCategorias = async () => {
        this.setState({categorias: await getCateorys()});
    }

    refreshCarrito = async () => {
        let result = await userGetCart();
        if(result[1] === false) this.actualizarCarrito(result[0]);        
    }

    functionLogOut = (value) => {
        this.setState({
            logOut: value,
            productosCarrito: []
        })
    }

    actualizarCarrito = (productos) => {
        this.setState({
            productosCarrito: productos
        })
    }
    
    render() {
        return (
            <Router>
                <Container fluid className="main-app">
                    <Row>
                        <Nav deleteFromCartCard={this.actualizarCarrito.bind(this)} 
                            productosCarrito={this.state.productosCarrito} 
                            callback={this.getStateLaterañMenu.bind(this)} 
                            logOut={this.functionLogOut.bind(this)} />
                    </Row>
                    <Row className={"row-second-line " + (!this.state.activeLateralMenu?"active":"")}>
                        <Col className={"col-menu-desplegable "} ref={this.lateralMenu} >
                            <MenuDesplegable cat={this.state.categorias} />
                        </Col>
                        <Col className="special-background" sm={(!this.state.activeLateralMenu?"12":"10")}>
                            <Switch>
                                <Route path="/UsoTazas" render={(props)=>
                                    <UsoTazas {...props} 
                                    log={this.state.logOut} 
                                    logOut={this.functionLogOut.bind(this)} />
                                } />
                                <Route path="/EditarPerfil" render={(props)=>
                                    <Perfil {...props} 
                                    log={this.state.logOut} 
                                    logOut={this.functionLogOut.bind(this)} 
                                    callback={this.actualizarCarrito.bind(this)} />
                                } /> 
                                <Route path="/Login" render={(props) =>
                                    <Login {...props} 
                                    callback={this.refreshCarrito}/>
                                } />
                                <Route path="/Detail/:productId" render={(props) =>
                                    <Detail {...props} 
                                        callback={this.actualizarCarrito.bind(this)} 
                                        log={this.state.logOut} 
                                        logOut={this.functionLogOut.bind(this)} />
                                } />
                                <Route path="/Productos/:searchWord" render={(props) => 
                                    <Productos {...props} 
                                        log={this.state.logOut} 
                                        logOut={this.functionLogOut.bind(this)} />
                                } />
                                <Route path="/Carrito" render={(props) => 
                                    <Carrito {...props} 
                                    callback={this.actualizarCarrito.bind(this)} 
                                    log={this.state.logOut} 
                                    logOut={this.functionLogOut.bind(this)} />
                                } />
                                <Route path="/" exact render={(props) => 
                                    <PantallaInicial {...props} />
                                } /> 
                                <Route path="/:idCat/:nameCat" exact render={(props) => 
                                    <PantallaInicial {...props} />
                                } /> 
                            </Switch>
                        </Col>
                    </Row>
                    <Row className="row-footer">
                        <Footer />
                    </Row>
                </Container>
            </Router>
        )
    }
}
