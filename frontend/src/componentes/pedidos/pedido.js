import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ItemsPedidos from './itemsPedidos';
import Button from 'react-bootstrap/Button';
import { MdKeyboardArrowDown } from 'react-icons/md';


export default class pedido extends Component {
    constructor(props){
        super(props);
        this.state = {
            active: false
        }
    }
    despliegue = () => {
        this.setState(() => ({
            active: !this.state.active,
        }));
    };

    facturaCompleta = () => {
        return(
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
        )
    }

    render() {
        return (
            <Container fluid className="pedidos-perfil">
                <Card className="card-pedido">
                    <Card.Title><Row className="row-title-pedido"><Col sm={4}>Realizado: {this.props.fecha} | {this.props.unidades} unidades</Col><Col sm={1}><Button onClick={this.despliegue}><MdKeyboardArrowDown /></Button></Col></Row></Card.Title>
                    {this.state.active?this.facturaCompleta():null}
                </Card>
            </Container>
        )
    }
}
