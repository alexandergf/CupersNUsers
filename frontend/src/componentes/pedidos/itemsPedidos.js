import React, { Component } from 'react';
import ItemPedido from './itemPedido';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

export default class itemsPedidos extends Component {
    render() {
        return (
            <Container className="items-pedidos">
                <Row>
                    <Col className="item-pedido">
                        <ItemPedido nombre="Taza de prueba" precio="6,50" unidades="2" />
                    </Col>
                    <Col className="item-pedido-btn">
                        <Button>Opinar</Button>
                    </Col>
                </Row>
                <Row>
                    <Col className="item-pedido">
                        <ItemPedido nombre="Taza de prueba" precio="6,50" unidades="2" />
                    </Col>
                    <Col className="item-pedido-btn">
                        <Button>Opinar</Button>
                    </Col>
                </Row>
                <Row>
                    <Col className="item-pedido">
                        <ItemPedido nombre="Taza de prueba" precio="6,50" unidades="2" />
                    </Col>
                    <Col className="item-pedido-btn">
                        <Button>Opinar</Button>
                    </Col>
                </Row>
            </Container>
        )
    }
}
