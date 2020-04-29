import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Producto from './producto';
import Row from 'react-bootstrap/Row';


export default class contenedorProductos extends Component {
    constructor(props){
        super(props);
        this.state = {
            productos: [
                ["Taza de café 1","7,90","3.8"],
                ["Taza de café 2","6,90","4.9"],
                ["Taza de café 3","5,90","4.7"],
                ["Taza de café 4","4,90","2.4"],
                ["Taza de café 5","3,90","1.8"],
                ["Taza de café 6","8,90","2.8"]
            ]
        }
    }
    render() {
        const productosRender = [];
        const arrayProductos = this.state.productos;
        for(let i = 0; i<arrayProductos.length;i++){
            productosRender.push(
                <Col sm={4} key={i+"-col-producto"}>
                    <Producto title={arrayProductos[i][0]} precio={arrayProductos[i][1]} estrellas={arrayProductos[i][2]} key={i+"-producto"} />
                </Col>
            );
        }
        return (
            <Card className="contenedor-productos">
                <Card.Title><h3>{this.props.categoria}</h3></Card.Title>
                <Card.Body>
                    <Row>
                        {productosRender}
                    </Row>
                </Card.Body>
            </Card>
        )
    }
}
