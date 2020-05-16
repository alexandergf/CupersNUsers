import React, { Component } from 'react';
import { Container, Button, Toast, ListGroup, Row, Col, Image } from 'react-bootstrap';
import ImagenTest from '../../assets/images/prueba.jpg';
import { Link } from 'react-router-dom';

export default class tarjetaCarrito extends Component {
    constructor(props){
        super(props);
        this.state = {
            unidades: 0,
            total: "0,00",
            products: this.props.productos
        }
    }

    componentDidUpdate = () => {
        if(this.state.products.length !== this.props.productos.length){
            this.setState({
                products: this.props.productos
            })
        }else if(!sessionStorage.getItem('token')){
            this.setState({
                productosCarrito: []
            }) 
        }
    }

    call = () => {
        this.props.calltoclose();
    }

    render() {
        var renderProducts = this.state.products.map((product,index) => 
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
                </Row>
            </ListGroup.Item>
        )
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
            </Container>
        )
    }
}
