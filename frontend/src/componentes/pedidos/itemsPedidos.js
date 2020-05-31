import React, { Component } from 'react';
import ItemPedido from './itemPedido';
import { Container, Row, Col, Button, Modal, Form } from 'react-bootstrap';
import { setReview } from '../../database/functions';
import MoonLoader from "react-spinners/MoonLoader";
import { BsStarFill } from 'react-icons/bs';

function Wait(props) {
    return (
        <>
            <Modal {...props}>
                <Modal.Header closeButton>
                    <Modal.Title>Un momento</Modal.Title>
                </Modal.Header>
                <Modal.Body>Se esta enviando la opinion...
                    <Container fluid className="container-icon-spinner">
                        <MoonLoader size={30} color={"#000000"} />
                    </Container>
                </Modal.Body>
            </Modal>
        </>
    );
}

function ModalOpinion(props) {
    const [estrellas, setEstrellas] = React.useState(0);
    return (
        <>
            <Modal show={props.show} onHide={() => props.onHide()} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Opinion al respecto</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="Formulario">
                            <Form.Label>
                                Puntuacion:
                            </Form.Label>
                            <Col xs={5} className="star-opinion-user" as={Row}>
                                <p>
                                    <input id="radio1" type="radio" name="estrellas" value="5" /><label for="radio1">★</label>
                                    <input id="radio2" type="radio" name="estrellas" value="4" /><label for="radio2">★</label>
                                    <input id="radio3" type="radio" name="estrellas" value="3" /><label for="radio3">★</label>
                                    <input id="radio4" type="radio" name="estrellas" value="2" /><label for="radio4">★</label>
                                    <input id="radio5" type="radio" name="estrellas" value="1" /><label for="radio5">★</label>
                                </p>
                                    
                            </Col>
                        </Form.Group>
                        <Form.Group className="Formulario">
                            <Form.Label>Mensaje:</Form.Label>
                            <Col xs={12}>
                                <Form.Control type="text" name="descripcion" required />
                            </Col>
                        </Form.Group>
                        <Button variant="primary" type="submit" className="Submit">Enviar Consulta</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default class itemsPedidos extends Component {
    constructor(props){
        super(props);
        this.state = {
            show: false,
            showOpinion: false
        }
    }

    mostrarModalDarTuOpinion = () => {

    }

    darTuOpinion = () => {

    }

    render() {
        let productos = this.props.products !== undefined ? this.props.products.map((producto, index) => 
            <Row key={"item-pedido-index-"+producto.product_id+"-"+index}>
                <Col className="item-pedido">
                    <ItemPedido nombre={producto.product.name} precio={producto.product.price} unidades={producto.quantity} imagen={producto.product.pics[0].pic} />
                </Col>
                <Col className="item-pedido-btn">
                    <Button onClick={() => this.setState({showOpinion: true})}>Opinar</Button>
                    <ModalOpinion show={this.state.showOpinion} onHide={() => this.setState({showOpinion:false})} />
                    <Wait show={this.state.show} onHide={() => this.setState({show:false})} animation={false}/>
                </Col>
            </Row>
        ):null;
        return (
            <Container className="items-pedidos">
                {productos}
            </Container>
        )
    }
}
