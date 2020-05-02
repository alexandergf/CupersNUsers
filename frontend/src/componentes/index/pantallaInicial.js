import React, { Component } from 'react';
import {Container,Col,Row} from 'react-bootstrap';
import Productos from '../productos/contenedorProductos';
export default class pantallaInicial extends Component {
    render() {
        return (
            <Container fluid>
                <Row>
                    <Col>
                        <Row>

                        </Row>
                        <Row>
                            <Productos />
                        </Row>
                    </Col>
                </Row>
            </Container>
        )
    }
}
