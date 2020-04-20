import React, { Component } from 'react';
import DescripcionProducto from './descripcionProducto';
import Colors from './colors';
import Title from './detalleTitle';
import BottomDetail from './bottomDetail';
import Contador from './contador';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default class detalleText extends Component {
    render() {
        return (
            <Container fluid>
                <Row>
                    <Title name="Titulo de prueba" />
                </Row>
                <Row>
                    <Col sm><span className="cash">7'18 €</span></Col><Col sm><Contador /></Col>
                </Row>
                <DescripcionProducto />
                <Colors />
                <BottomDetail />
            </Container>
        )
    }
}
