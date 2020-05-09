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

export default class index extends Component {
    constructor(props){
        super(props);
        this.state = {
            active: true
        }
    }

    getStateLaterañMenu = (activo, mode) => {
        if(mode){
            this.setState({
                active: !this.state.active
            });
        }else{
            this.setState({
                active: activo
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
                        {this.state.active ? <Col sm={2} className="col-menu-desplegable"><MenuDesplegable /></Col> : null}
                        <Col className="special-background">
                            <Switch>
                                <Route path="/UsoTazas">
                                    <UsoTazas />
                                </Route>
                                <Route path="/Login"> 
                                    <Login />
                                </Route>
                                <Route path="/">
                                    <PantallaInicial />
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
