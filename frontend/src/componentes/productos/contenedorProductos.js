import React, { Component } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import Producto from './producto';
import { Link } from 'react-router-dom';


export default class contenedorProductos extends Component {

    sendResponseItem = (value, productId) => {
        this.props.callback(value,productId);
    }

    render() {
        var productosRender = this.props.productosBy.map((product,index) => 
            <Col sm={4} key={product.id+"-col-producto"}>
                <Link to="/Detail" onClick={() => this.sendResponseItem(false, product.id)}><Producto img={product.pics} title={product.name} precio={product.price} estrellas={4} key={product.id+"-producto"} /></Link>
            </Col>
        )
        var zeroResult = <Col sm={4}> <p>No se han encontrado resultados.</p></Col>
        return (
            <Card className="contenedor-productos">
                <Card.Title><h3>{this.props.categoria === "Todos" ? "Todos los productos" : this.props.categoria}</h3></Card.Title>
                <Card.Body>
                    <Row>
                        {this.props.productosBy.length !== 0 ? productosRender : zeroResult}
                    </Row>
                </Card.Body>
            </Card>
        )
    }
}
