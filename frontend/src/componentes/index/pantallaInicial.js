import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Productos from '../productos/contenedorProductos';

export default class pantallaInicial extends Component {
    render() {
        return (
            <Container fluid>
                <Row>

                </Row>
                <Row>
                    <Productos />
                </Row>
            </Container>
        )
    }
}
