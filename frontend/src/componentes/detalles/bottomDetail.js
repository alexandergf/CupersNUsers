import React, { Component } from 'react';
import CarritoImg from '../../assets/images/carrito.png';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Estrellas from './estrellas';

export default class bottomDetail extends Component {
    render() {
        return (
            <Row className="bottom-detail">
                <Col md={3} sm={3}><Row className="Opiniones"><span>2025 Opiniones</span></Row><Row className="star-row"><Estrellas numStars="4.8" /></Row></Col>
                <Col className="carrito" xl={{span: 5, offset: 1}} lg={6} md={6} sm={6}><a href="#" className="btn-carrito"><Image src={CarritoImg} alt="Carrito" width="18px" />Añadir al carrito</a></Col>
                <Col className="comprar" sm={3}><a href="#" className="btn-comprar">Comprar</a></Col>
            </Row>
        )
    }
}
