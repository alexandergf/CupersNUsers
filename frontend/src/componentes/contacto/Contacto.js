import React, { Component } from 'react';
import ReactBootstrap, { Container, Col, Row, Button, Form, FormControl } from 'react-bootstrap';
import '../../assets/css/Contacto.css';

class Contacto extends Component {

    render() {
        return (
            <div className="Contacto">
                <Container>
                    <Row>
                        <Col xs={12} className="ContactoTitulo">
                            <h3>Contacto</h3>
                        </Col>
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
                    </Row>
                </Container>

            </div>
        )
    }

}

export default Contacto;