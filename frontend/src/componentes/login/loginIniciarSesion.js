import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';

export default class loginIniciarSesion extends Component {
    render() {
        return (
            <Container fluid>
                <Form>
                    <Form.Group controlId="logInEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" />
                    </Form.Group>

                    <Form.Group controlId="logInPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" />
                    </Form.Group>
                    <Button variant="success" type="submit">
                        Iniciar Sesión
                    </Button>
                </Form>
                <Row className="forgivePassword"><a href="#">¿Has olvidado la contraseña?</a></Row>
            </Container>
        )
    }
}
