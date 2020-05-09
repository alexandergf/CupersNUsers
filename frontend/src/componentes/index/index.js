import React, { Component } from 'react';
import { Container, Row, Col} from 'react-bootstrap';
import '../../assets/css/indexMain.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// Componentes
import Nav from '../nav/Nav';
import MenuDesplegable from './menuDesplegable';
import PantallaInicial from './pantallaInicial';
import UsoTazas from '../usosTazas/CuerpoTazas';
import Login from '../login/login';
import Footer from '../footer/Footer';
import Perfil from '../perfil/perfil';

export default class index extends Component {
    constructor(props){
        super(props);
        this.state = {
            activeLateralMenu: true,
            category: "Todos"
        }
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
    
    render() {
        return (
            <Router>
                <Container fluid className="main-app">
                    <Row>
                        <Nav callback={this.getStateLaterañMenu.bind(this)} />
                    </Row>
                    <Row className="row-second-line">
                        {this.state.activeLateralMenu ? <Col sm={2} className="col-menu-desplegable"><MenuDesplegable /></Col> : null}
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
                                <Route path="/">
                                    <PantallaInicial categoriaProduct={this.state.category} />
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
