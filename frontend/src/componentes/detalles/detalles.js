import React, { Component } from 'react';
import DetalleImg from './detalleImg';
import DetalleText from './detalleText';
import Opiniones from '../opiniones/opiniones';
import '../../assets/css/detalles.css';
import { Container, Card, Row, CardDeck} from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { detailProduct } from '../../database/functions';

export default class detalles extends Component {
    constructor(props){
        super(props);
        this.state = {
            product: []
        }
    }

    componentDidMount = () => {
        this.getProductos();
    }

    getProductos = async () => {
        let prod = await detailProduct(this.props.match.params.productId);
        this.setState({
            product: prod
        })
    }

    componentDidUpdate = () => {
        if(this.props.log){
            this.props.logOut(false);
        } 
    }

    actualizarCarrito = (productos) => {
        this.props.callback(productos);
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
                        <Card><Card.Body><DetalleText callback={this.actualizarCarrito.bind(this)} producto={this.state.product} id={this.props.match.params.productId} /></Card.Body></Card>
                    </CardDeck>
                </Row>
                <Row>
                    <Card className="card-opinion"><Card.Body><Opiniones id={this.props.match.params.productId} /></Card.Body></Card> 
                </Row>
            </Container>
        )
    }
}
