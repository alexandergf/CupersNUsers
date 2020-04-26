import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ItemPedido from './itemPedido';
import ItemsPedidos from './itemsPedidos';


export default class pedido extends Component {
    render() {
        return (
            <Container fluid className="pedidos-perfil">
                <Card className="card-pedido">
                    <Card.Title>Realizado: {this.props.fecha} | {this.props.unidades} unidades</Card.Title>
                    <Card.Body>
                        <Row className="first-line-pedido">
                            <Col sm={2}>
                                Nº de pedido: {this.props.numPedido}
                            </Col>
                            <Col sm={3} className="first-line-pedido-enlaces">
                                <a href="#">Detalles pedido</a>
                                <a href="#">Ver factura</a>
                            </Col>
                        </Row>
                        <Row className="second-line-pedido">
                            <Row>
                                <Col>
                                    Entrega prevista: {this.props.fechaEntrega}<br />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    Estado: {this.props.estado}<br />
                                </Col>
                                    
                            </Row>
                            <Row>
                                <Col className="seguimiento-pedido">
                                    <span><a href="#">Seguimiento</a></span><br />
                                </Col>    
                            </Row>
                        </Row>
                        <ItemsPedidos />
                    </Card.Body>
                </Card>
            </Container>
        )
    }
}
