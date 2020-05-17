import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';
import ImagenPrueba from '../../assets/images/prueba.jpg';
import Estrellas from '../estrellas/estrellas';

export default class wishItem extends Component {
    render() {
        return (
            <Container className="item-wish">
                <Row><Image src={this.props.img[0] !== undefined ? this.props.img[0].pic : ImagenPrueba} descripcion={this.props.img[0] !== undefined ? this.props.img[0].updated_at : "Imagen de producto "} roundedCircle width="120em" height="120em"/></Row>
                <Row className="title-item">{this.props.title}</Row>
                <Row className="cash-item">{this.props.precio}</Row>
                <Row><Estrellas numStars={this.props.estrellas} /></Row>
                <Row className="u-item">{this.props.unidades} stock.</Row>
            </Container>
        )
    }
}
