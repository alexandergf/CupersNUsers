import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Panel from './panelBuscadorProductos';
import CProductos from './contenedorProductos';
import '../../assets/css/productos.css';

export default class productos extends Component {
    render() {
        return (
            <Container fluid className="main-productos">
                <Row>
                    <Col xs={2}>
                        <Panel />
                    </Col>
                    <Col xs={10}>
                        <CProductos categoria="Tazas de café" totalProductos="5" />
                    </Col>
                </Row>
            </Container>
        )
    }
}
