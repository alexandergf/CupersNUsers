import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Articulos from './articulos';
import Total from './totalCarrito';
import '../../assets/css/carrito.css';
import { instance } from '../../database/config';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

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
