import React, { Component } from 'react';
import { Container, Row, Image } from 'react-bootstrap';
import ImagenPrueba from '../../assets/images/prueba.jpg';
import Estrellas from '../estrellas/estrellas';
import { getOpinions } from '../../database/functions';

export default class wishItem extends Component {
    constructor(props){
        super(props);
        this.state = {
            estrellas: 0
        }
    }
    componentDidMount = () => {
        this.getReviews(this.props.id);
    }

    getReviews = async (id) => {
        let result = await getOpinions(id);
        this.setState({
            estrellas: result[1]
        })
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
