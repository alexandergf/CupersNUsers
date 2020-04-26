import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import EditarPerfil from '../editarPerfil/editarPerfil';
import AdminPerfil from './adminPerfil';
import Row from 'react-bootstrap/Row';
import '../../assets/css/perfil.css';

export default class perfil extends Component {
    render() {
        return (
            <Container fluid>
                <Row>
                    <Col xs={3}>
                        <AdminPerfil user="PabloB1990" />
                    </Col>
                    <Col xs={9}>
                        <EditarPerfil />
                    </Col>
                </Row>
            </Container>
        )
    }
}
