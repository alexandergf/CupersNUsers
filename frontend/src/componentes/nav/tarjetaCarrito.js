import React, { Component } from 'react';
import { Container, Card, Button } from 'react-bootstrap';

export default class tarjetaCarrito extends Component {
    render() {
        return (
            <Container fluid className="carrito-cart">
                <Card>
                    <Card.Body>UN objeto</Card.Body>
                    <Card.Footer><Button>Comprar</Button></Card.Footer>
                </Card>
            </Container>
        )
    }
}
