import React, { Component } from 'react';
import DetalleImg from './detalleImg';
import DetalleText from './detalleText';
import Opiniones from '../opiniones/opiniones';
import '../../assets/css/detalles.css';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import CardDeck from 'react-bootstrap/CardDeck'

export default class detalles extends Component {
    render() {
        return (
            <Container className="general-container">
                <Row className="detail-first-line">
                    <CardDeck>
                        <Card><Card.Body><DetalleImg /></Card.Body></Card>
                        <Card><Card.Body><DetalleText /></Card.Body></Card>
                    </CardDeck>
                </Row>
                <Row>
                    <Card className="card-opinion"><Card.Body><Opiniones /></Card.Body></Card> 
                </Row>
            </Container>
        )
    }
}
