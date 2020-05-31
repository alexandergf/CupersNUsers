import React, { Component } from 'react';
import ItemPedido from './itemPedido';
import { Container, Row, Col, Button } from 'react-bootstrap';

export default class itemsPedidos extends Component {
    render() {
        let productos = this.props.products !== undefined ? this.props.products.map((producto, index) => 
            <Row key={"item-pedido-index-"+producto.product_id+"-"+index}>
                <Col className="item-pedido">
                    <ItemPedido nombre="Taza de prueba" precio="6,50" unidades="2" />
                </Col>
                <Col className="item-pedido-btn">
                    <Button onClick={() => alert(producto.product_id)}>Opinar</Button>
                </Col>
            </Row>
        ):null;
        return (
            <Container className="items-pedidos">
                {productos}
            </Container>
        )
    }
}
