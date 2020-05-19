import React, { Component } from 'react';
import { Container, Row, Image } from 'react-bootstrap';
import ImagenPrueba from '../../assets/images/prueba.jpg';
import Estrellas from '../estrellas/estrellas';
import { instance } from '../../database/config';
import axios from 'axios';

export default class wishItem extends Component {
    constructor(props){
        super(props);
        this.state = {
            estrellas: 0
        }
    }
    componentDidMount = () => {
        axios.post("/product/getReviews",{"product_id": this.props.id}, instance)
        .then((response) => {
            console.log(response);
            let point = 0;
            response.data.data.map((opinion,index) => 
                point+=opinion.rate
            )
            point/=response.data.data.length;
            this.setState({
                estrellas: point
            })
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    render() {
        return (
            <Container className="item-wish">
                <Row><Image src={this.props.img[0] !== undefined ? this.props.img[0].pic : ImagenPrueba} descripcion={this.props.img[0] !== undefined ? this.props.img[0].updated_at : "Imagen de producto "} roundedCircle width="120em" height="120em"/></Row>
                <Row className="title-item">{this.props.title}</Row>
                <Row className="cash-item">{this.props.precio}</Row>
                <Row><Estrellas numStars={this.state.estrellas} /></Row>
                <Row className="u-item">{this.props.unidades} stock.</Row>
            </Container>
        )
    }
}
