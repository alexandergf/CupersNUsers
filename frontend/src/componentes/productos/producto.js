import React, { Component } from 'react';
import Contenedor from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';
import Estrellas from '../estrellas/estrellas';
import ImagenTest from '../../assets/images/prueba.jpg';

export default class producto extends Component {
    render() {
        return (
            <Contenedor fluid className="producto">
                <Row><Image src={ImagenTest} roundedCircle width="180em" height="180em" /></Row>
                <Row className="title-row">{this.props.title}</Row>
                <Row className="price-row">{this.props.precio} €</Row>
                <Row><Estrellas numStars={this.props.estrellas} /></Row>
            </Contenedor>
        )
    }
}
