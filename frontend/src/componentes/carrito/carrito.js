import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Articulos from './articulos';
import Total from './totalCarrito';
import '../../assets/css/carrito.css';
import { Redirect } from 'react-router-dom';
import { userGetCart } from '../../database/functions';

export default class carrito extends Component {
    constructor(props){
        super(props);
        this.state = {
            productos: [],
            total: 0
        }
        this.actualizarProductos = this.actualizarProductos.bind(this);
    }

    componentDidMount = () => {
        this.getCart();
    }

    getCart = async() => {
        this.montarProductos(await userGetCart());
    }

    montarProductos = (prod) => {
        if(prod[1] !== true){
            let totalPrecio = 0;
            prod[0].forEach(product => {
                if(product.product !== null)
                    totalPrecio += product.quantity * product.product.price
            });
            this.setState({
                productos: prod[0],
                total: totalPrecio
            })
        }
    }

    actualizarProductos = (prod) => {
        this.setState({
            productos: prod,
            total: 0
        })
        this.props.callback(prod);
    }

    componentDidUpdate = () => {
        if(this.props.log){
            this.props.logOut(false);
        } 
    }

    render() {
        if(this.props.log){
            return(<Redirect to="/" />)
        } 
        return (
            <Container fluid className="carrito">
                <Row>
                    <Col sm={9}>
                        <Articulos callback={this.actualizarProductos.bind(this)} products={this.state.productos} />
                    </Col>
                    <Col sm={3}>
                        <Total totalPrecio={this.state.total.toFixed(2)} />
                    </Col>
                </Row>

            </Container>
        )
    }
}
