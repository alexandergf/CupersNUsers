import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Articulos from './articulos';
import Total from './totalCarrito';
import '../../assets/css/carrito.css';
import { instance } from '../../database/config';
import axios from 'axios';


export default class carrito extends Component {
    constructor(props){
        super(props);
        this.state = {
            productos: []
        }
    }

    componentDidMount = () => {
        axios.post('/user/getCart', {
            
          }, instance)
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    render() {
        return (
            <Container fluid className="carrito">
                <Row>
                    <Col sm={9}>
                        <Articulos />
                    </Col>
                    <Col sm={3}>
                        <Total totalPrecio="17" />
                    </Col>
                </Row>

            </Container>
        )
    }
}
