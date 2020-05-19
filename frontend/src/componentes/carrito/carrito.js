import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Articulos from './articulos';
import Total from './totalCarrito';
import '../../assets/css/carrito.css';
import { instance } from '../../database/config';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

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
        let este = this;
        axios.post('/user/getCart', {}, instance)
          .then(function (response) {
                este.montarProductos(response.data.data);
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    montarProductos = (prod) => {
        let totalPrecio = 0;
        prod.forEach(product => {
            if(product.product !== null)
                totalPrecio += product.quantity * product.product.price
        });
        this.setState({
            productos: prod,
            total: totalPrecio
        })
        
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
