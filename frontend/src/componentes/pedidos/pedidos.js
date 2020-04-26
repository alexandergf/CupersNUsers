import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Pedido from './pedido';

export default class pedidos extends Component {
    render() {
        return (
            <Container fluid className="pedidos-perfil">
                <Card>
                    <Card.Body>
                        <h3 className="pedidos-title">Pedidos y facturas</h3>
                        <Pedido fecha="26/04/2020" unidades="2" numPedido="123456789" fechaEntrega="05/05/2020" estado="Enviado" />
                    </Card.Body>
                </Card>
            </Container>
        )
    }
}
