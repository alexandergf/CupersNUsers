import React, { Component } from 'react';
import WishItem from './wishItem';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default class wishItems extends Component {
    getReviews = () =>{
        
    }
    render() {
        var productosList = this.props.productos.map((producto,index) =>
            <Col sm={3} key={producto.id+"-col-product-wish"}>
                <a href="#"><WishItem title={producto.name} precio={producto.price+" €"} estrellas="3.8" unidades={producto.stock} img={producto.pics} /></a>
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
