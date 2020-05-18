import React, { Component } from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import WishItems from './wishItems';
import { instance } from '../../database/config';
import axios from 'axios';

export default class wishList extends Component {
    constructor(props){
        super(props);
        this.state = {
            productos: [],
            zeroProductos: false
        }
    }

    componentDidMount = () => {
        let montarProductos = this.montarProductos;
        axios.post('/user/getWishlist', {}, instance)
          .then(function (response) {
                montarProductos(response.data.data);
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    montarProductos = (products) => {
        if(products.length === 0){
            this.setState({zeroProductos: true});
        }else{
            this.setState({
                productos: products
            });
        }
    }

    redireccionar = (id) => {
        this.props.red(id);
    }

    deleteItemWishList = (id) => {
        let montarProductos = this.montarProductos;
        axios.post('/wishlist/toggleProduct', {"product_id": id}, instance)
          .then(function (response) {
                if(response.data.data){
                    montarProductos(response.data.data);
                }
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    render() {
        return (
            <Container fluid className="wish-perfil">
                <Card>
                    <Card.Title><h3 className="wish-title">Lista de deseos <Button>Añadir todo al carrito</Button></h3></Card.Title>
                    <Card.Body>
                        {this.state.zeroProductos? "No hay productos en la lista de deseados.":<WishItems delete={this.deleteItemWishList.bind(this)} red={this.redireccionar.bind(this)} productos={this.state.productos} />}
                    </Card.Body>
                </Card>
            </Container>
        )
    }
}
