import React, { Component } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import Producto from './producto';
import { Link } from 'react-router-dom';


export default class contenedorProductos extends Component {
    render() {
        var productosRender = this.props.productosBy.map((product,index) => 
            <Col sm={4} key={product.id+"-col-producto"}>
                <Link><Producto title={product.name} precio={product.price} estrellas={4} key={product.id+"-producto"} /></Link>
            </Col>
        )
        return (
            <Card className="contenedor-productos">
                <Card.Title><h3>{this.props.categoria === "Todos" ? "Todos los productos" : this.props.categoria}</h3></Card.Title>
                <Card.Body>
                    <Row>
                        {productosRender}
                    </Row>
                </Card.Body>
            </Card>
        )
    }
}
