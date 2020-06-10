import React, { Component } from 'react';
import WishItem from './wishItem';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { GrClose } from 'react-icons/gr';

export default class wishItems extends Component {
    redireccionar = (id) => {
        this.props.red(id);
    }

    deleteItemWish = (id) => {
        this.props.delete(id);
    }

    render() {
        var productosList = this.props.productos !== undefined && this.props.productos !== null ? this.props.productos.map((producto,index) =>
            <Col xl={'auto'} md={6} xs={12} key={producto.id+"-col-product-wish"}>
                <Row className="x-wish-item"><Button onClick={() => this.deleteItemWish(producto.id)}><GrClose /></Button></Row>
                <Container onClick={()=>this.redireccionar(producto.id)} className="container-item-wish"><WishItem title={producto.name} precio={producto.price+" €"} id={producto.id} unidades={producto.stock} img={producto.pics} estrellas={producto.average} /></Container>
            </Col>
        ) : null;
        return (
            <Container fluid className="items-wish">
                <Row>
                    {productosList}
                </Row>
            </Container>
        )
    }
}
