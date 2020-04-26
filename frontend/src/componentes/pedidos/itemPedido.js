import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
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
