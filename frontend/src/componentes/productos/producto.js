import React, { Component } from 'react';
import { Container, Row, Image } from 'react-bootstrap';
import Estrellas from '../estrellas/estrellas';
import ImagenTest from '../../assets/images/prueba.jpg';
import { getOpinions } from '../../database/functions';

export default class producto extends Component {
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
        //let result = await getOpinions(id);
        this.setState({
            estrellas: 1
        })
    }
    render() {
        return (
            <Container fluid className="producto">
                <Row><Image src={this.props.img[0] !== undefined ? this.props.img[0].pic : ImagenTest} roundedCircle width="180em" height="180em" /></Row>
                <Row className="title-row">{this.props.title}</Row>
                <Row className="price-row">{this.props.precio} €</Row>
                <Row><Estrellas numStars={this.state.estrellas} /></Row>
            </Container>
        )
    }
}
