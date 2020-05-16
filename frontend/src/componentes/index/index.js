import React, { Component } from 'react';
import { Container, Row, Col} from 'react-bootstrap';
import '../../assets/css/indexMain.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { instance } from '../../database/config';
import axios from 'axios';
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
            activeLateralMenu: true,
            category: "Todos",
            productos: [],
            productid: 1,
            searchWordBar: "",
            logOut: false,
            productosCarrito: []
        }
        this.handleCategoria = this.handleCategoria.bind(this);
        this.functionLogOut = this.functionLogOut.bind(this);
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

    handleCategoria = (id,name) =>{
        this.setState({
            category: name
        });
        this.refreshProducts(id);
    }

    componentDidMount = () => {
        this.refreshProducts(-1);
        this.refreshCarrito();
    }

    refreshProducts = (id) => {
        let direccion =  (id === -1 ? "/product/getAll" : "/product/getByCategory");
        axios.post(direccion, {"category_id": id}, instance)
        .then((response) => {
            this.setState({
                productos: response.data.data
            })
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    refreshCarrito = () => {
        axios.post("/cart/toggleProduct",{}, instance)
        .then((response) => {
            this.setState({
                productosCarrito: response.data.data
            })
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    getItemDetailInfo = (activo, productId) => {
        this.setState({
            activeLateralMenu: activo,
            productid: productId
        });
    }

    searchBar = (searchWord) => {
        this.setState({
            searchWordBar: searchWord
        })
    }

    functionLogOut = (value) => {
        this.setState({
            logOut: value
        })
    }

    actualizarCarrito = () => {
        this.refreshCarrito();
    }
    
    render() {
        return (
            <Router>
                <Container fluid className="main-app">
                    <Row>
                        <Nav productosCarrito={this.state.productosCarrito} callback={this.getStateLaterañMenu.bind(this)} search={this.searchBar.bind(this)} getCategoria={this.handleCategoria} logOut={this.functionLogOut.bind(this)}/>
                    </Row>
                    <Row className="row-second-line">
                        {this.state.activeLateralMenu ? <Col sm={2} className="col-menu-desplegable"><MenuDesplegable getCategoria={this.handleCategoria.bind(this)} /></Col> : null}
                        <Col className="special-background">
                            <Switch>
                                <Route path="/UsoTazas">
                                    <UsoTazas log={this.state.logOut} logOut={this.functionLogOut.bind(this)} />
                                </Route>
                                <Route path="/EditarPerfil"> 
                                    <Perfil log={this.state.logOut} logOut={this.functionLogOut.bind(this)} />
                                </Route>
                                <Route path="/Login"> 
                                    <Login />
                                </Route>
                                <Route path="/Detail">
                                    <Detail callback={this.actualizarCarrito} log={this.state.logOut} productId={this.state.productid} logOut={this.functionLogOut.bind(this)} />
                                </Route>
                                <Route path="/Productos">
                                    <Productos log={this.state.logOut} logOut={this.functionLogOut.bind(this)} itemDetailInfo={this.getItemDetailInfo.bind(this)} searchWords={this.state.searchWordBar} />
                                </Route>
                                <Route path="/Carrito">
                                    <Carrito log={this.state.logOut} logOut={this.functionLogOut.bind(this)} />
                                </Route>
                                <Route path="/">
                                    <PantallaInicial itemDetailInfo={this.getItemDetailInfo.bind(this)} categoriaProduct={this.state.category} productos={this.state.productos} />
                                </Route>
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
