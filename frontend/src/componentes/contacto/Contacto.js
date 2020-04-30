import React, { Component } from 'react';
import { Container, Col, Button, Form, Card } from 'react-bootstrap';
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
                                        <Form.Control type="text" />
                                    </Col>
                                </Form.Group>
                                <Form.Group className="Formulario">
                                    <Form.Label>Mensaje:</Form.Label>
                                    <Col xs={12}>
                                        <Form.Control as="textarea" rows="3" />
                                    </Col>
                                </Form.Group>
                                <Button variant="primary" type="submit" className="Submit">Enviar Consulta</Button>
                            </Form>
                        </Col>
                    </Card.Body>
                </Card>
            </Container>
        )
    }

}

export default Contacto;