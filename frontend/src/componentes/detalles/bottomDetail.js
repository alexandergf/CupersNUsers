import React, { Component } from 'react';
import CarritoImg from '../../assets/images/carrito.png';
import {Row,Col,Image,Button} from 'react-bootstrap';
import Estrellas from '../estrellas/estrellas';
import { instance } from '../../database/config';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class bottomDetail extends Component {
    constructor(props){
        super(props);
        this.state = {
            opinions: 0,
            nOpinions: 0,
            rate: 0
        }
        this.addCart = this.addCart.bind(this);
    }

    componentDidMount = () => {
        axios.post("/product/getReviews",{"product_id": this.props.idOpinion}, instance)
        .then((response) => {
            let point = 0;
            response.data.data.map((opinion,index) => 
                point+=opinion.rate
            )
            point/=response.data.data.length;
            this.setState({
                opinions: response.data.data,
                nOpinions: response.data.data.length,
                rate: point
            })
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    addCart = () => {
        let este = this;
        axios.post('/cart/toggleProduct', {
            "product_id": this.props.idOpinion,
            "quantity": this.props.cant
          }, instance)
          .then(function (response) {
                este.props.callback(response.data.data);
          })
          .catch(function (error) {
            if (error.response.status === 401) {
                alert('No estas logeado');
            }
            console.log(error);
          });
    }

    render() {
        return (
            <Row className="bottom-detail">
                <Col md={3} sm={3}><Row className="Opiniones"><span>{this.state.nOpinions} Opiniones</span></Row><Row className="star-row"><Estrellas numStars={this.state.rate} /></Row></Col>
                <Col className="carrito" xl={{span: 5, offset: 1}} lg={6} md={6} sm={6}><Button className="btn-carrito" onClick={() => this.addCart()}><Image src={CarritoImg} alt="Carrito" width="18px" />Añadir al carrito</Button></Col>
                <Col className="comprar" sm={3}><Link to="/Carrito" className="btn-comprar">Comprar</Link></Col>
            </Row>
        )
    }
}
