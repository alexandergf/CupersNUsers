import React, { Component } from 'react';
import { Container, Card, Button, Modal, Toast } from 'react-bootstrap';
import WishItems from './wishItems';
import { instance } from '../../database/config';
import axios from 'axios';

export default class wishList extends Component {
    constructor(props){
        super(props);
        this.state = {
            productos: [],
            zeroProductos: false,
            show: false,
            failRemove: false,
            remove: false,
            showCart: false
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

    deleteAllWishItems = () => {
        this.setState({show: true})
    }

    totalRemove = () => {
        let resultRemove = this.resultRemove;
        axios.post('/wishlist/deleteAll', {}, instance)
          .then(function (response) {
            resultRemove(true);
          })
          .catch(function (error) {
            resultRemove(false);
          });
    }

    resultRemove = (value) => {
        if(value){
            this.setState({remove: true, show: false, productos: [], zeroProductos: true});
        }else{
            this.setState({failRemove: true, show: false});
        }
    }

    addAllItemsWish = () => {
        let props = this.props;
        this.state.productos.map((product,index)=>
            axios.post('/cart/toggleProduct', {
                "product_id": product.id,
                "quantity": 1
            }, instance)
            .then(function (response) {
                props.callback(response.data.data);
            })
            .catch(function (error) {
            console.log(error);
            })
        )
        this.setState({showCart: true})
    }

    render() {
        const modalRemove = <Modal show={this.state.show} onHide={() => this.setState({show: false})}>
            <Modal.Header closeButton>
            <Modal.Title>Confirmación</Modal.Title>
            </Modal.Header>
            <Modal.Body>Seguro que quieres borrar todos los articulos de la lista de deseos?</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => this.setState({show: false})}>
                    Cancelar
                </Button>
                <Button variant="primary" onClick={() => this.totalRemove()}>
                    Si, estoy de acuerdo
                </Button>
            </Modal.Footer>
        </Modal>;

        const errorRemove = <Modal show={this.state.failRemove} onHide={() => this.setState({failRemove: false})}>
            <Modal.Header closeButton>
            <Modal.Title>Ups</Modal.Title>
            </Modal.Header>
            <Modal.Body>Algo no ha ido bien.</Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={() => this.setState({failRemove: false})}>
                    Vale
                </Button>
            </Modal.Footer>
        </Modal>;

        const acceptRemove = <Modal show={this.state.remove} onHide={() => this.setState({remove: false})}>
            <Modal.Header closeButton>
            <Modal.Title>Bien</Modal.Title>
            </Modal.Header>
            <Modal.Body>La lista se ha vaciado con exito.</Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={() => this.setState({remove: false})}>
                    Vale
                </Button>
            </Modal.Footer>
        </Modal>;

        const cartProduct = <Toast className="toast-title" onClose={() => this.setState({showCart:false})} show={this.state.showCart} delay={3000} autohide>
            <Toast.Header>
            <img
                src="holder.js/20x20?text=%20"
                className="rounded mr-2"
                alt=""
            />
            <strong className="mr-auto">Lista de deseos</strong>
            </Toast.Header>
            <Toast.Body>Productos añadidos al carrito.</Toast.Body>
        </Toast>;

        return (
            <Container fluid className="wish-perfil">
                {cartProduct}
                <Card>
                    <Card.Title>
                        <h3 className="wish-title">Lista de deseos 
                        <Container>
                            <Button className="btn-delete-all" onClick={() => this.deleteAllWishItems()}>Borrar todos los productos</Button>
                            <Button className="btn-add-all" onClick={() => this.addAllItemsWish()}>Añadir todo al carrito</Button>
                        </Container>
                        </h3>
                    </Card.Title>
                    <Card.Body>
                        {this.state.zeroProductos? "No hay productos en la lista de deseados.":<WishItems delete={this.deleteItemWishList.bind(this)} red={this.redireccionar.bind(this)} productos={this.state.productos} />}
                    </Card.Body>
                </Card>
                {modalRemove}
                {errorRemove}
                {acceptRemove}
            </Container>
        )
    }
}
