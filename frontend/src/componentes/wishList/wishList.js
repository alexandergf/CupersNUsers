import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import WishItems from './wishItems';

export default class wishList extends Component {
    render() {
        return (
            <Container fluid className="wish-perfil">
                <Card>
                    <Card.Title><h3 className="wish-title">Lista de deseos <Button>Añadir todo al carrito</Button></h3></Card.Title>
                    <Card.Body>
                        <WishItems />
                    </Card.Body>
                </Card>
            </Container>
        )
    }
}
