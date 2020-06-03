import React, { Component } from 'react';
import { Container, Card, Button, Modal, Toast, Row, Col } from 'react-bootstrap';
import WishItems from './wishItems';
import { getWishList, addWishItem, deleteWishList, cartItem } from '../../database/functions';

function CartProductToast(props){
    return (
        <>
            <Toast className="toast-title" {...props}>
                <Toast.Header>
                <img
                    src="holder.js/20x20?text=%20"
                    className="rounded mr-2"
                    alt=""
                />
                <strong className="mr-auto">Lista de deseos</strong>
                </Toast.Header>
                <Toast.Body>Productos añadidos al carrito.</Toast.Body>
            </Toast>
        </>
    )
}

function ModalRemove(props){
    return (
        <>
            <Modal show={props.show} onHide={() => props.onHide()} animation={false}>
                <Modal.Header closeButton>
                <Modal.Title>Confirmación</Modal.Title>
                </Modal.Header>
                <Modal.Body>Seguro que quieres borrar todos los articulos de la lista de deseos?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => props.onHide()}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={() => props.totalRemove()}>
                        Si, estoy de acuerdo
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

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

function AcceptRemove(props){
    return (
        <>
            <Modal {...props}>
                <Modal.Header closeButton>
                <Modal.Title>Bien</Modal.Title>
                </Modal.Header>
                <Modal.Body>La lista se ha vaciado con exito.</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => props.onHide()}>
                        Vale
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

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
        this.getWishListUser();
    }

    getWishListUser = async () => {
        let result = await getWishList();
        if(result[1] === false){
            this.montarProductos(result[0]);
        }else{
            console.log(result[1]);
        }
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

    deleteItemWishList = async (id) => {
        let result = await addWishItem(id);
        if(result[1] === false){
            this.montarProductos(result[0]);
        }else{
            console.log(result[1]);
        }
    }

    deleteAllWishItems = () => {
        this.setState({show: true})
    }

    totalRemove = async () => {
        this.resultRemove(await deleteWishList());
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
        let result = false;
        this.state.productos.map(async(product,index)=>
            {
                result = await cartItem(product.id,1);
                result[1] === true ? props.callback(result[0]) : console.log(result[1]);
            }
        )
        this.setState({showCart: true})
    }

    render() {
        return (
            <Container fluid className="wish-perfil">
                <CartProductToast onClose={() => this.setState({showCart:false})} show={this.state.showCart} delay={3000} autohide />
                <Card>
                    <Card.Title>
                        <Container fluid>
                            <Row className="wish-title">
                                <Col>
                                    <h3>Lista de deseos</h3>
                                </Col>
                                <Col>
                                    <Button className="btn-delete-all" onClick={() => this.deleteAllWishItems()}>Borrar todos los productos</Button>
                                    <Button className="btn-add-all" onClick={() => this.addAllItemsWish()}>Añadir todo al carrito</Button>
                                </Col>
                            </Row>
                        </Container>
                    </Card.Title>
                    <Card.Body>
                        {this.state.zeroProductos? "No hay productos en la lista de deseados.":<WishItems delete={this.deleteItemWishList.bind(this)} red={this.redireccionar.bind(this)} productos={this.state.productos} />}
                    </Card.Body>
                </Card>
                <ModalRemove show={this.state.show} onHide={() => this.setState({show: false})} totalRemove={()=>this.totalRemove()} />
                <ErrorRemove show={this.state.failRemove} onHide={() => this.setState({failRemove: false})} animation={false} />
                <AcceptRemove show={this.state.remove} onHide={() => this.setState({remove: false})} animation={false} />
            </Container>
        )
    }
}
