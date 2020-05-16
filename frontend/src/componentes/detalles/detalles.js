import React, { Component } from 'react';
import DetalleImg from './detalleImg';
import DetalleText from './detalleText';
import Opiniones from '../opiniones/opiniones';
import '../../assets/css/detalles.css';
import {Container,Card,Row,CardDeck} from 'react-bootstrap';
import { instance } from '../../database/config';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
export default class detalles extends Component {
    constructor(props){
        super(props);
        this.state = {
            product: [],
        }
    }

    componentDidMount = () => {
        axios.post("/product/detail", {"product_id": this.props.productId}, instance)
        .then((response) => {
            this.setState({
                product: response.data.data
            })
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    componentDidUpdate = () => {
        if(this.props.log){
            this.props.logOut(false);
        } 
    }

    render() {
        if(this.props.log){
            return(<Redirect to="/" />)
        } 
        return (
            <Container className="general-container">
                <Row className="detail-first-line">
                    <CardDeck>
                        <Card><Card.Body><DetalleImg imgs={this.state.product.pics} /></Card.Body></Card>
                        <Card><Card.Body><DetalleText producto={this.state.product} id={this.props.productId} /></Card.Body></Card>
                    </CardDeck>
                </Row>
                <Row>
                    <Card className="card-opinion"><Card.Body><Opiniones id={this.props.productId} /></Card.Body></Card> 
                </Row>
            </Container>
        )
    }
}
