import React, { Component } from 'react';
import {Container,Col,Row} from 'react-bootstrap';
import Productos from '../productos/contenedorProductos';
import MenuDesplegable from './menuDesplegable';
export default class pantallaInicial extends Component {
    render() {
        return (
            <Container fluid>
                <Row>
                    <Col sm={10}>
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
