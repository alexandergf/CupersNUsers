import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default class totalCarrito extends Component {
    render() {
        return (
            <Container className="total-carrito">
                <Card>
                    <Card.Body>
                        <Row>
                            <Col sm={3}>
                                TOTAL
                            </Col>
                            <Col sm={3}>
                                {this.props.totalPrecio} €
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
                <Button className="btn-realizar-pedido">REALIZAR PEDIDO</Button>
            </Container>
        )
    }
}
