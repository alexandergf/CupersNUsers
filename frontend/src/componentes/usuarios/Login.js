import React, { Component } from 'react';
import ReactBootstrap, { Container, Col, Row, Button, Form, FormControl } from 'react-bootstrap';
import '../../assets/css/login.css'

export class Login extends Component {
    render() {
        return (
            <Container>
                <Col xs={12} className="tituloLogin">
                    <h5>Iniciar Sesión</h5>
                </Col>
                <Form>
                    <Form.Group className="email">
                        <Form.Label className="texto">
                            Email:
                        </Form.Label>
                        <Col xs={5}>
                            <Form.Control type="text" />
                        </Col>
                    </Form.Group>
                    <Form.Group className="email">
                        <Form.Label className="texto">
                            Contraseña:
                        </Form.Label>
                        <Col xs={5}>
                            <Form.Control type="password" />
                        </Col>
                    </Form.Group>
                    <Button variant="primary" type="submit" className="Submit">Iniciar sesión</Button>
                </Form>
                <Col xs={5}>
                    <a>Has olvidado la contraseña?</a>
                </Col>
            </Container>
        )
    }
}

export default Login


