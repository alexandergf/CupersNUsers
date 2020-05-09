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

export default class index extends Component {
    constructor(props){
        super(props);
        this.state = {
            activeLateralMenu: true,
            category: "Todos",
            productos: []
        }
        this.handleCategoria = this.handleCategoria.bind(this);
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
    }

    refreshProducts = (id) => {
        let direccion =  (id === -1 ? "/product/getAll" : "/product/getByCategory");
        axios.get(instance.baseURL+direccion, {params:{category_id: id}}, instance)
        .then((response) => {
            this.setState({
                productos: response.data.data
            })
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    
    render() {
        return (
            <Router>
                <Container fluid className="main-app">
                    <Row>
                        <Nav callback={this.getStateLaterañMenu.bind(this)} />
                    </Row>
                    <Row className="row-second-line">
                        {this.state.activeLateralMenu ? <Col sm={2} className="col-menu-desplegable"><MenuDesplegable getCategoria={this.handleCategoria} /></Col> : null}
                        <Col className="special-background">
                            <Switch>
                                <Route path="/UsoTazas">
                                    <UsoTazas />
                                </Route>
                                <Route path="/EditarPerfil"> 
                                    <Perfil />
                                </Route>
                                <Route path="/Login"> 
                                    <Login />
                                </Route>
                                <Route path="/Detail">
                                    <Detail />
                                </Route>
                                <Route path="/">
                                    <PantallaInicial categoriaProduct={this.state.category} productos={this.state.productos} />
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
