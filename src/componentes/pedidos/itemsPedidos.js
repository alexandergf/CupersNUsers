import React, { Component } from 'react';
import ItemPedido from './itemPedido';
import { Container, Row, Col, Button, Modal, Form } from 'react-bootstrap';
import { setReview } from '../../database/functions';
import MoonLoader from "react-spinners/MoonLoader";
import { FaStar } from 'react-icons/fa';

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
    const [rating, setRating] = React.useState(null);
    const [hover, setHover] = React.useState(null);
    let descr = React.useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        props.handleValues(descr.current.value,rating);
    }

    return (
        <>
            <Modal show={props.show} onHide={() => props.onHide()} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Opinion al respecto</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="Formulario">
                            <Form.Label>
                                Puntuacion:
                            </Form.Label>
                            <Col className="star-opinion-user" as={Row}>
                                {[...Array(5)].map((star,i) => {
                                    const ratingValue = i+1;
                                    return (
                                        <label key={"star-"+i}>
                                            <input 
                                                type="radio" 
                                                name="rating" 
                                                value={ratingValue} 
                                                onClick={() => setRating(ratingValue)} 
                                            />
                                            <FaStar 
                                                className="star" 
                                                color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"} 
                                                size={50} 
                                                onMouseEnter={() => setHover(ratingValue)}
                                                onMouseLeave={() => setHover(null)}
                                            />
                                        </label>
                                    );
                                })}
                            </Col>
                        </Form.Group>
                        <Form.Group className="Formulario">
                            <Form.Label>Mensaje:</Form.Label>
                            <Col xs={12}>
                                <Form.Control type="text" name="descripcion" ref={descr} required />
                            </Col>
                        </Form.Group>
                        <Button variant="primary" type="submit" className="Submit">Enviar Opinion</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}

function Confirm(props) {
    return (
        <>
            <Modal {...props}>
                <Modal.Header closeButton>
                    <Modal.Title>Bien</Modal.Title>
                </Modal.Header>
                <Modal.Body>La opinion se ha enviado correctamente.</Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => props.onHide()}>Vale</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

function Error(props) {
    return (
        <>
            <Modal {...props}>
                <Modal.Header closeButton>
                    <Modal.Title>Ups!</Modal.Title>
                </Modal.Header>
                <Modal.Body>Ha habido un problema con tu opinion.</Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => props.onHide()}>Vale</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default class itemsPedidos extends Component {
    constructor(props){
        super(props);
        this.state = {
            show: false,
            showOpinion: false,
            idOpinar: -1,
            showConfirm: false,
            showError: false
        }
    }

    darTuOpinion = async (descr, rate) => {
        this.setState({show: true, showOpinion: false});
        if(this.state.idOpinar !== -1){
            let result = await setReview(this.state.idOpinar,rate,descr);
            if(result[1] === false){
                this.setState({show: false, showConfirm: true});
            }else{
                this.setState({show: false, showError: true});
            }
        }
        
    }

    redireccionarLink = (id) => {
        this.props.red(id);
    }

    render() {
        let productos = this.props.products !== undefined ? this.props.products.map((producto, index) => 
            <Row key={"item-pedido-index-"+producto.product_id+"-"+index}>
                <Col className="item-pedido" xl={'auto'} md={'auto'} xs={'auto'}>
                    <ItemPedido 
                        nombre={producto.product.name} 
                        precio={producto.product.price} 
                        unidades={producto.quantity} 
                        imagen={producto.product.pics[0].pic}
                        redireccionar={this.redireccionarLink.bind(this)}
                        id={producto.product_id}
                    />
                </Col>
                <Col className="item-pedido-btn" xl={'auto'} md={'auto'} xs={'auto'}>
                    <Button onClick={() => this.setState({showOpinion: true, idOpinar: producto.product_id})}>Opinar</Button>
                    <ModalOpinion show={this.state.showOpinion} onHide={() => this.setState({showOpinion:false})} handleValues={this.darTuOpinion.bind(this)} />
                    <Wait show={this.state.show} onHide={() => this.setState({show:false})} animation={false}/>
                    <Confirm show={this.state.showConfirm} onHide={() => this.setState({showConfirm:false})} animation={false}/>
                    <Error show={this.state.showError} onHide={() => this.setState({showError:false})} animation={false}/>
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
