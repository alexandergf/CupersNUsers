import React, { Component } from 'react';
import { Container, CardColumns, Card } from 'react-bootstrap';
import LogIn from './loginIniciarSesion';
import SignUp from './signUp';
import '../../assets/css/login.css';
import { Redirect } from 'react-router-dom';

export default class login extends Component {
    constructor(props){
        super(props);
        this.state = {
            log: false
        }
    }

    actualizarLog = (value) => {
        this.props.callback();
        this.setState({
            log: value
        })
    }

    render() {
        if(this.state.log){
            return(<Redirect to="/" />)
        } 
        return (
            <Container className="login-main">
                <CardColumns>
                    <Card className="login">
                        <Card.Header>Iniciar Sesión</Card.Header>
                        <Card.Body><LogIn actualizar={this.actualizarLog.bind(this)} /></Card.Body>
                    </Card>
                    <Card className="signup">
                        <Card.Header>Crear Cuenta</Card.Header>
                        <Card.Body><SignUp actualizar={this.actualizarLog.bind(this)} /></Card.Body>
                    </Card>
                </CardColumns>
            </Container>
        )
    }
}
