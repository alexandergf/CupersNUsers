import React, { Component } from 'react';
import { Container, Button, Toast, ListGroup, Row, Col, Image, Modal } from 'react-bootstrap';
import ImagenTest from '../../assets/images/prueba.jpg';
import { Link } from 'react-router-dom';
import { BsTrashFill } from 'react-icons/bs';
import { cartItem } from '../../database/functions';

function ErrorRemove(props){
    return (
        <>
            <Modal {...props}>
                <Modal.Header closeButton>
                <Modal.Title>Ups</Modal.Title>
                </Modal.Header>
                <Modal.Body>Algo no ha ido bien.</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => props.onHide()}>
                        Vale
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default class tarjetaCarrito extends Component {
    constructor(props){
        super(props);
        this.state = {
            unidades: 0,
            total: "0,00",
            products: this.props.productos,
            failRemove: false
        }
    }
    
    componentDidUpdate = (prevProps) => {
        if(prevProps.productos.length !== this.props.productos.length){
            this.setState({
                products: this.props.productos
            })
        }
    }

    call = () => {
        this.props.calltoclose();
    }

    deleteItemCart = async (id) => {
        let result = await cartItem(id, 0);
        if(result[1] === false){
            this.aux(result[0]);
        }else{
            this.setState({
                failRemove: result[1]
            });
        }
    }

    aux = (product) => {
        this.setState({products: product})
        this.props.deleteFromCartCard(product);
    }

    render() {
        var renderProducts = this.state.products !== undefined && this.state.products !== null ? this.state.products.map((product,index) => 
            <ListGroup.Item key={"item-listgroup-"+index}>
                <Row>
                <Col>
                    <Image src={product.product.pics[0] !== undefined ? product.product.pics[0].pic : ImagenTest} roundedCircle width="72em" height="72em" />
                </Col>
                <Col>
                    <Row>{product.product.name}</Row>
                    <Row>Cantidad: {product.quantity}</Row>
                    <Row>{product.product.price} €</Row>
                </Col>
                <Col><Button onClick={() => this.deleteItemCart(product.product.id)}><BsTrashFill /></Button></Col>
                </Row>
            </ListGroup.Item> 
        ): null;
        var totalPrice=0, totalQuantity=0;
        for(let i = 0; i < renderProducts.length;i++){
            totalPrice += this.state.products[i].product.price * this.state.products[i].quantity;
            totalQuantity += this.state.products[i].quantity;
        }
        return (
            <Container fluid className="carrito-cart">
                <Toast onClose={() => this.call()} show={this.props.show} >
                    <Toast.Header>
                        <strong className="mr-auto">Carrito</strong>
                    </Toast.Header>
                    <Toast.Body>
                        <ListGroup variant="flush" className="product-item-list">
                            {renderProducts}
                        </ListGroup>
                        <Container>
                            <Row className="row-unidades-total">
                                <Col>({totalQuantity}) Unidades</Col>
                                <Col><strong>TOTAL: {totalPrice.toFixed(2)} €</strong></Col>
                            </Row>
                            <Row>
                                <Link to="/Carrito"><Button className="btn-pedido">Realizar Pedido</Button></Link>
                            </Row>
                        </Container>
                    </Toast.Body>
                </Toast>
                <ErrorRemove show={this.state.failRemove} onHide={() => this.setState({failRemove: false})} animation={false} />
            </Container>
        )
    }
}
