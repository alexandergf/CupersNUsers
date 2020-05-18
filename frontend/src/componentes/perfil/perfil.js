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
    constructor(props){
        super(props);
        this.state = {
            out: false,
            num: 1
        }
    }
    componentDidUpdate = () => {
        if(this.props.log){
            this.props.logOut(false);
        } 
    }

    redireccionar = (id) => {
        this.setState({out: true, num: id});
    }

    render() {
        if(this.props.log){
            return(<Redirect to="/" />)
        }else if(this.state.out){
            return(<Redirect to={"/Detail/"+this.state.num} />)
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
                                    <WishList red={this.redireccionar.bind(this)} />
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
