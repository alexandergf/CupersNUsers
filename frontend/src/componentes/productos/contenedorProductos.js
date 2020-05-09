import React, { Component } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import Producto from './producto';
import { instance } from '../../database/config';
import axios from 'axios';

export default class contenedorProductos extends Component {
    constructor(props){
        super(props);
        this.state = {
            productos: []
        }
    }

    componentDidMount = () => {
        let categoria = this.props.categoria;
        let direccion = "";
        let data = {};
        if(categoria === "Todos"){
            direccion = "/product/getAll";
        }else{
            data.category_id = categoria;
            direccion = "/product/getByCategory";
        }

        axios.get(instance.baseURL+direccion, data, instance)
        .then((response) => {
            this.setState({
                productos: response.data.data
            })
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    render() {
        const productosRender = [];
        const arrayProductos = this.state.productos;
        for(let i = 0; i<arrayProductos.length;i++){
            productosRender.push(
                <Col sm={4} key={i+"-col-producto"}>
                    <Producto title={arrayProductos[i].name} precio={arrayProductos[i].price} estrellas={4} key={arrayProductos[i].id+"-producto"} />
                </Col>
            );
        }
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
