import React, { Component } from 'react';
import {Row,Col,Container} from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import Opinion from './opinion';
import Estrellas from '../estrellas/estrellas';
import ImagenTest from '../../assets/images/prueba.jpg';
import { instance } from '../../database/config';
import axios from 'axios';

export default class opiniones extends Component {
    constructor(props){
        super(props);
        this.state = {
            opinions: null,
            rate: 0
        }
    }

    componentDidMount = () => {
        let direccion = "";
        this.props.id === -1 ? direccion = "/user/getReviews" : direccion = "/product/getReviews";
        axios.get(instance.baseURL+direccion, {params:{product_id: this.props.id,}}, instance)
        .then((response) => {
            let point = 0;
            response.data.data.map((opinion,index) => 
                point+=opinion.rate
            )
            point/=response.data.data.length;
            this.setState({
                opinions: response.data.data,
                rate: point
            })
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    render() {
        var opiniones = [];
        if(this.state.opinions !== null){
            this.state.opinions.map((opinion,index) => 
                opiniones.push(
                    <Row className="opinion-row">
                        <Col sm={1}><Image src={opinion.user.pic !== null ? opinion.user.pic : ImagenTest} roundedCircle width="20px" /></Col>
                        <Col sm={11}><Opinion nameUser={opinion.user.name} opinion={opinion.description} fecha={opinion.updated_at} numStars={opinion.rate} /></Col>
                    </Row>
                )  
            );
        }
        return (
            <Container fluid>
                <Row className="opiniones-row"><Col sm={2}><h3>Opiniones</h3></Col><Col sm={{span: 2, offset: 8}}><Estrellas numStars={this.state.rate} /></Col></Row>
                {opiniones}
            </Container>
        )
    }
}
