import React, { Component } from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import ImagenTest from '../../assets/images/prueba.jpg';

export default class itemPedido extends Component {
    render() {
        return (
            <Container className="item-pedido">
                <Row>
                    <Col className="col-img">
                        <Image src={ImagenTest} roundedCircle width="80em" height="80em" />
                    </Col>
                    <Col>
                        <div>{this.props.nombre}</div>
                        <div>{this.props.precio} <span className="item-unidades"> X {this.props.unidades} unidades</span></div>
                    </Col>
                </Row>
            </Container>
        )
    }
}
