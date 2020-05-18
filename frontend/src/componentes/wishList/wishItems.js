import React, { Component } from 'react';
import WishItem from './wishItem';
import { Container, Row, Col } from 'react-bootstrap';

export default class wishItems extends Component {
    getReviews = () =>{
        
    }

    redireccionar = (id) => {
        this.props.red(id);
    }

    render() {
        var productosList = this.props.productos.map((producto,index) =>
            <Col sm={3} key={producto.id+"-col-product-wish"}>
                <Container onClick={()=>this.redireccionar(producto.id)} className="container-item-wish"><WishItem title={producto.name} precio={producto.price+" €"} estrellas="3.8" unidades={producto.stock} img={producto.pics} /></Container>
            </Col>
        )
        return (
            <Container fluid className="items-wish">
                <Row>
                    {productosList}
                </Row>
            </Container>
        )
    }
}
