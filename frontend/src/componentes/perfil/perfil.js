import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
// -- Imports de componentes -- //
import AdminPerfil from './adminPerfil';
import WishList from '../wishList/wishList';
import Opinion from '../opinion-perfil/opinionPerfil';
import Pedidos from '../pedidos/pedidos';
import EditarPerfil from '../editarPerfil/editarPerfil';
import Contacto from '../contacto/Contacto';
import { 
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from 'react-router-dom';
import '../../assets/css/perfil.css';

export default class perfil extends Component {
    render() {
        if(this.props.log){
            return(<Redirect to="/" />)
        } 
        return (
            <Router>
                <Container fluid>
                    <Row>
                        <Col xs={3}>
                            <AdminPerfil user="PabloB1990" />
                        </Col>
                        <Col xs={9}>
                            <Switch>
                                <Route path="/EditarPerfil">
                                    <EditarPerfil />
                                </Route>
                                <Route path="/WishList">
                                    <WishList />
                                </Route>
                                <Route path="/Pedidos">
                                    <Pedidos />
                                </Route>
                                <Route path="/Opinion">
                                    <Opinion />
                                </Route>
                                <Route path="/Contacto">
                                    <Contacto />
                                </Route>
                            </Switch>
                        </Col>
                    </Row>
                </Container>
            </Router>
        )
    }
}
