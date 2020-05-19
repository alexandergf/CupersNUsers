import React, { Component } from 'react';
import Contenedor from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';
import Estrellas from '../estrellas/estrellas';
import ImagenTest from '../../assets/images/prueba.jpg';
import axios from 'axios';
import { instance } from '../../database/config';

export default class producto extends Component {
    constructor(props){
        super(props);
        this.state = {
            estrellas: 0
        }
    }
    /*componentDidMount = () => {
        axios.post("/product/getReviews",{"product_id": this.props.id}, instance)
        .then((response) => {
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
    }*/
    render() {
        return (
            <Contenedor fluid className="producto">
                <Row><Image src={this.props.img[0] !== undefined ? this.props.img[0].pic : ImagenTest} roundedCircle width="180em" height="180em" /></Row>
                <Row className="title-row">{this.props.title}</Row>
                <Row className="price-row">{this.props.precio} €</Row>
                <Row><Estrellas numStars={this.state.estrellas} /></Row>
            </Contenedor>
        )
    }
}
