import React, { Component } from 'react';
import { Container, Card } from 'react-bootstrap';
import Pedido from './pedido';

export default class pedidos extends Component {
    render() {
        return (
            <Container fluid className="pedidos-perfil">
                <Card>
                    <Card.Title className="especial-non-border"><h3 className="pedidos-title">Pedidos y facturas</h3></Card.Title>
                    <Card.Body>
                        <Pedido fecha="26/04/2020" unidades="2" numPedido="123456789" fechaEntrega="05/05/2020" estado="Enviado" />
                    </Card.Body>
                </Card>
            </Container>
        )
    }
}
