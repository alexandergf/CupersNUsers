import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';
import ImagenTest from '../../assets/images/prueba.jpg';
import Estrellas from '../estrellas/estrellas';

export default class wishItem extends Component {
    render() {
        return (
            <Container className="item-wish">
                <Row><Image src={ImagenTest} roundedCircle width="120em" height="120em"/></Row>
                <Row className="title-item">{this.props.title}</Row>
                <Row className="cash-item">{this.props.precio}</Row>
                <Row><Estrellas numStars={this.props.estrellas} /></Row>
                <Row className="u-item">{this.props.unidades} unidades.</Row>
            </Container>
        )
    }
}
