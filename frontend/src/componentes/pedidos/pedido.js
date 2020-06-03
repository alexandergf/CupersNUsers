import React, { Component } from 'react';
import { Container, Card, Row, Col, Button, Table, Modal } from 'react-bootstrap';
import ItemsPedidos from './itemsPedidos';
import { MdKeyboardArrowDown, MdPayment } from 'react-icons/md';
import { RiBillLine } from 'react-icons/ri';

function DetallesPedido(props) {
    return (
        <>
            <Modal show={props.show} onHide={() => props.onHide()} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Detalles pedido</Modal.Title>
                </Modal.Header>
                <Modal.Body className="model-body-order">
                    <Row className="model-body-title-order">
                        Nº de pedido: {props.numPedido} | {props.nProd} artículo(s)
                    </Row>
                    <Row>
                        <Table responsive>
                            <thead>
                                <tr>
                                    <th><MdPayment /> Método de pago</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>PayPal</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Row>
                    <Row>
                        <Table responsive>
                            <thead>
                                <tr>
                                    <th><RiBillLine /> Resumen</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Subtotal de producto(s):</td>
                                    <td>{(props.totalCash-props.totalCash*(21/100)).toFixed(2)}€</td>
                                </tr>
                                <tr>
                                    <td>Envío:</td>
                                    <td>0.00€</td>
                                </tr>
                                <tr>
                                    <td>Impuestos:</td>
                                    <td>{(props.totalCash*(21/100)).toFixed(2)}€</td>
                                </tr>
                                <tr>
                                    <td>Total:</td>
                                    <td>{props.totalCash}€</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => props.onHide()}>Cerrar</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default class pedido extends Component {
    constructor(props){
        super(props);
        this.state = {
            active: false,
            show: false
        }
    }
    despliegue = () => {
        this.setState(() => ({
            active: !this.state.active,
        }));
    };

    facturaCompleta = () => {
        return(
            <Card.Body className={"card-body-animate "+ (this.state.active?"active":"")}>
                <Row className="first-line-pedido">
                    <Col>
                        Nº de pedido: {this.props.numPedido}
                    </Col>
                    <Col className="first-line-pedido-enlaces">
                        <Button className="detalles-pedido-btn" onClick={()=> this.setState({show: true})}>Detalles pedido</Button>
                        <DetallesPedido 
                            show={this.state.show} 
                            onHide={() => this.setState({show:false})} 
                            totalCash={this.props.totalCash} 
                            numPedido={this.props.numPedido} 
                            nProd={this.props.productos.length}
                        />
                        <Button className="ver-factura-btn">Ver factura</Button>
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
                </Row>
                <ItemsPedidos products={this.props.productos} red={this.redireccionarLink.bind(this)} />
            </Card.Body>
        )
    }

    redireccionarLink = (id) => {
        this.props.redirec(id);
    }

    render() {
        return (
            <Container fluid className="pedidos-perfil">
                <Card className={"card-pedido"}>
                    <Card.Title><Row className="row-title-pedido "><Col>Realizado: {this.props.fecha} | {this.props.unidades} unidades</Col><Col><Button onClick={this.despliegue}><MdKeyboardArrowDown /></Button></Col></Row></Card.Title>
                    {this.facturaCompleta()}
                </Card>
            </Container>
        )
    }
}
