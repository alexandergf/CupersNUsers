import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Articulos from './articulos';
import Total from './totalCarrito';
import '../../assets/css/carrito.css';

export default class carrito extends Component {
    render() {
        return (
            <Container fluid className="carrito">
                <Row>
                    <Col sm={9}>
                        <Articulos />
                    </Col>
                    <Col sm={3}>
                        <Total totalPrecio="17" />
                    </Col>
                </Row>

            </Container>
        )
    }
}
