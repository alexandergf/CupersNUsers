import React, { Component } from 'react';
import Img from './img';
import ImagenPrueba from '../../assets/images/prueba.jpg';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default class detalleImg extends Component {
    render() {
        return (
            <Container fluid>
                <Row>
                    <Col><Img src={ImagenPrueba} descripcion="Imagen de prueba" /></Col>
                </Row>
                <Row>
                    <Col sm={3}><Img src={ImagenPrueba} descripcion="Imagen de prueba" /></Col>
                    <Col sm={3}><Img src={ImagenPrueba} descripcion="Imagen de prueba" /></Col>
                    <Col sm={3}><Img src={ImagenPrueba} descripcion="Imagen de prueba" /></Col>
                </Row>
            </Container>
        )
    }
}
