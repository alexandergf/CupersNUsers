import React, { Component } from 'react';
import { Container, Card, Button, Row, Col, Modal } from 'react-bootstrap';
import { setOrder } from '../../database/functions';

function WaitAmoment(props){
    return(
        <>
            <Modal {...props}>
                <Modal.Header closeButton>
                <Modal.Title>Un momento</Modal.Title>
                </Modal.Header>
                <Modal.Body>Se le esta redirigiendo a una plataforma de pago.</Modal.Body>
            </Modal>
        </>
    )
}

function ErrorCart(props){
    return(
        <>
            <Modal {...props}>
                <Modal.Header closeButton>
                <Modal.Title>Ups!</Modal.Title>
                </Modal.Header>
                <Modal.Body>Ha habido un error con la plataforma de pago.</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => props.onHide()}>
                        Vale
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default class totalCarrito extends Component {
    constructor(props){
        super(props);
        this.state = {
            link: null,
            linkOpen: false,
            show: false,
            showError: false
        }
    }

    makeOrder = async () => {
        this.setState({show: true})
        let result = await setOrder();
        if(result !== "" && result !== null && result !== undefined){
            window.location.href = result; 
        }else{
            this.setState({show: false, showError: true})
        }
    }

    render() {            
        return (
            <Container className="total-carrito">
                <Card>
                    <Card.Body>
                        <Row className="row-total-price-cart">
                            <Col>
                                TOTAL
                            </Col>
                            <Col>
                                {this.props.totalPrecio} €
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
                <Button className="btn-realizar-pedido" onClick={this.makeOrder} disabled={this.props.products.length === 0 ? true : false}>REALIZAR PEDIDO</Button>
                <WaitAmoment show={this.state.show} onHide={() => this.setState({show: false})} animation={false} />
                <ErrorCart show={this.state.showError} onHide={() => this.setState({showError: false})} animation={false} />
            </Container>
        )
    }
}
