import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';

export default class editarPerfil extends Component {
    render() {
        return (
            <Container fluid className="edit-perfil">
                <Row>
                    <Card>
                        <Card.Body className="edit-card">
                            <h3 className="editPerfil-title">Editar Perfil</h3>
                            <Form>
                                <Form.Group controlId="editNombre">
                                    <Form.Label>Nombre:</Form.Label>
                                    <Col lg={5}>
                                        <Form.Control type="text" />
                                    </Col>
                                </Form.Group>

                                <Form.Group controlId="editApellidos">
                                    <Form.Label>Apellidos:</Form.Label>
                                    <Form.Control type="text" />
                                </Form.Group>

                                <Form.Group controlId="editTlf">
                                    <Form.Label>Teléfono:</Form.Label>
                                    <Col lg={2}>
                                        <Form.Control lg={2} type="tel" />
                                    </Col>
                                </Form.Group>

                                <Form.Group controlId="editDireccion">
                                    <Form.Label>Dirección:</Form.Label>
                                    <Form.Control type="text" />
                                </Form.Group>
                                <Button variant="success" type="submit">
                                    Editar
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Row>
                <Row>
                    <Card>
                        <Card.Body>
                            <h3 className="password-title">Contraseña</h3>
                            <Form>
                                <Form.Row>
                                    <Form.Group as={Col} controlId="oldPasswordEdit">
                                        <Form.Label>Antigua Contraseña:</Form.Label>
                                        <Form.Control type="text" />
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="newPasswordEdit">
                                        <Form.Label>Nueva Contraseña:</Form.Label>
                                        <Form.Control type="text" />
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="repeatNewPasswordEdit">
                                        <Form.Label>Repetir Contraseña:</Form.Label>
                                        <Form.Control type="text" />
                                    </Form.Group>
                                </Form.Row>
                                <div className="btn-save">
                                    <Button variant="success" type="submit" >
                                        Guardar
                                    </Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Row>
            </Container>
        )
    }
}
