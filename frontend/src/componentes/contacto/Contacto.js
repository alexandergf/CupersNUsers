import React, { Component } from 'react';
import { Container, Col, Button, Form, Card } from 'react-bootstrap';
import axios from 'axios';
import '../../assets/css/Contacto.css';

class Contacto extends Component {

    render() {
        return (
            <Container fluid className="Contacto">
                <Card>
                    <Card.Title><h3 className="ContactoTitulo">Contacto</h3></Card.Title>
                    <Card.Body>
                        <Col xs={12}>
                            <Form>
                                <Form.Group className="Formulario">
                                    <Form.Label>
                                        Asunto:
                                    </Form.Label>
                                    <Col xs={5}>
                                        <Form.Control type="text" ref={(c) => this.asunto = c} />
                                    </Col>
                                </Form.Group>
                                <Form.Group className="Formulario">
                                    <Form.Label>Mensaje:</Form.Label>
                                    <Col xs={12}>
                                        <Form.Control as="textarea" rows="3" ref={(c) => this.mensaje = c} />
                                    </Col>
                                </Form.Group>
                            </Form>
                            <button className="button" onClick={this.pruebaNazi}>Enviar consulta2</button>
                        </Col>
                    </Card.Body>
                </Card>
            </Container>
        )
    }

}

export default Contacto;