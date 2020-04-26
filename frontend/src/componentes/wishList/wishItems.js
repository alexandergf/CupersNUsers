import React, { Component } from 'react';
import WishItem from './wishItem';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default class wishItems extends Component {
    render() {
        return (
            <Container fluid className="items-wish">
                <Row>
                    <Col sm={3}>
                        <a href="#"><WishItem title="Taza 1" precio="8,90 €" estrellas="3.8" unidades="1" /></a>
                    </Col>

                    <Col sm={3}>
                        <a href="#"><WishItem title="Taza 2" precio="6,90 €" estrellas="5" unidades="1" /></a>
                    </Col>

                    <Col sm={3}>
                        <a href="#"><WishItem title="Taza 3" precio="7,90 €" estrellas="2.5" unidades="1" /></a>
                    </Col>

                    <Col sm={3}>
                        <a href="#"><WishItem title="Taza 4" precio="8,90 €" estrellas="3.8" unidades="1" /></a>
                    </Col>
                </Row>
            </Container>
        )
    }
}
