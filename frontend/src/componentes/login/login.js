import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import CardColumns from 'react-bootstrap/CardColumns';
import Card from 'react-bootstrap/Card';
import LogIn from './loginIniciarSesion';
import SignUp from './signUp';
import '../../assets/css/login.css';

export default class login extends Component {
    render() {
        return (
            <Container className="login-main">
                <CardColumns>
                    <Card className="login">
                        <Card.Header>Iniciar Sesión</Card.Header>
                        <Card.Body><LogIn /></Card.Body>
                    </Card>
                    <Card className="signup">
                        <Card.Header>Crear Cuenta</Card.Header>
                        <Card.Body><SignUp /></Card.Body>
                    </Card>
                </CardColumns>
            </Container>
        )
    }
}
