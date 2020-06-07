import React, { Component } from 'react';
import { Container, Col, Row} from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import '../../assets/css/perfil.css';
// -- Imports de componentes -- //
import AdminPerfil from './adminPerfil';
import WishList from '../wishList/wishList';
import Opinion from '../opinion-perfil/opinionPerfil';
import Pedidos from '../pedidos/pedidos';
import EditarPerfil from '../editarPerfil/editarPerfil';
import Contacto from '../contacto/Contacto';

export default class perfil extends Component {
    constructor(props){
        super(props);
        this.state = {
            out: false,
            num: 1
        }
    }

    actualizarCarrito = (productos) => {
        this.props.callback(productos);
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
                <Container fluid className="container-perfil-general">
                    <Row>
                        <Col xl={3} md={3} xs={12}>
                            <AdminPerfil />
                        </Col>
                        <Col xl={9} md={9} xs={12}>
                            <Switch>
                                <Route path="/EditarPerfil" render={(props)=>
                                    <EditarPerfil {...props} />
                                } />
                                <Route path="/WishList" render={(props) => 
                                    <WishList {...props}
                                    red={this.redireccionar.bind(this)} 
                                    callback={this.actualizarCarrito.bind(this)} />
                                } />
                                <Route path="/Pedidos" render={(props) => 
                                    <Pedidos {...props}
                                    red={this.redireccionar.bind(this)} />
                                } />
                                <Route path="/Opinion" render={(props) => 
                                    <Opinion {...props} />
                                } />
                                <Route path="/Contacto" render={(props) => 
                                    <Contacto {...props} />
                                } />
                            </Switch>
                        </Col>
                    </Row>
                </Container>
            </Router>
        )
    }
}
