import React, { Component } from 'react';
import { Col, Button, Row, Toast } from 'react-bootstrap';
import { FaHeart } from 'react-icons/fa';
import { instance } from '../../database/config';
import axios from 'axios';

export default class detalleTitle extends Component {
    constructor(props){
        super(props);
        this.state = {
            show: false
        }
    }

    whishItem = (id) => {
        let este=this;
        axios.post('/wishlist/toggleProduct', {"product_id": id}, instance)
          .then(function (response) {
                if(response.data.data){
                    este.setState({show: true})
                }
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    render() {
        const favProduct = <Toast onClose={() => this.setState({show:false})} show={this.state.show} delay={3000} autohide>
            <Toast.Header>
            <img
                src="holder.js/20x20?text=%20"
                className="rounded mr-2"
                alt=""
            />
            <strong className="mr-auto">Lista de deseos</strong>
            </Toast.Header>
            <Toast.Body>Producto añadido a la lista de deseos.</Toast.Body>
        </Toast>;
        return (
            <Row className="title-detail">
                {favProduct}
                <Col md={6} className="title-title"><h3>{this.props.name}</h3></Col><Col md={{ span: 2, offset: 4 }} className="heartToBasket"><Button className="btn" variant="secondary" onClick={() => this.whishItem(this.props.id)}><FaHeart /></Button></Col>
            </Row>
        )
    }
}
