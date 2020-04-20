import React, { Component } from 'react';
import DetalleImg from './detalleImg';
import DetalleText from './detalleText';
import Opiniones from './opiniones';
import '../../assets/css/detalles.css';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default class detalles extends Component {
    render() {
        return (
            <Container fluid>
                <Row>
                    <Col sm={6}><Card body><DetalleImg /></Card></Col>
                    <Col sm={6}><Card body><DetalleText /></Card></Col>
                </Row>
                <Row>
                    <Opiniones />
                </Row>
            </Container>
        )
    }
}
