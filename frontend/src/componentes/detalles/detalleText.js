import React, { Component } from 'react';
import DescripcionProducto from './descripcionProducto';
import Colors from './colors';
import Title from './detalleTitle';
import BottomDetail from './bottomDetail';
import Contador from './contador';
import Container from 'react-bootstrap/Container';

export default class detalleText extends Component {
    render() {
        return (
            <Container fluid>
                <Title name="Titulo de prueba" />
                <Contador />
                <DescripcionProducto />
                <Colors />
                <BottomDetail />
            </Container>
        )
    }
}
