import React, { Component } from 'react';
import {Row,Col,Container} from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import Opinion from './opinion';
import Estrellas from '../estrellas/estrellas';
import ImagenTest from '../../assets/images/prueba.jpg';
import { getOpinions } from '../../database/functions';

export default class opiniones extends Component {
    constructor(props){
        super(props);
        this.state = {
            opinions: null,
            rate: 0
        }
    }

    componentDidMount = () => {
        this.getOpiniones();
    }

    getOpiniones = async () => {
        let result = await getOpinions(this.props.id);
        this.setState({
            opinions: result[0],
            rate: result[1]
        })
    }
    render() {
        var opiniones = [];
        if(this.state.opinions !== null && this.state.opinions.length !== 0){
            this.state.opinions.map((opinion,index) => 
                opiniones.push(
                    <Row className="opinion-row" key={"opinion-row-"+index}>
                        <Col sm={1}><Image src={opinion.user.pic !== null ? opinion.user.pic : ImagenTest} roundedCircle width="20px" /></Col>
                        <Col sm={11}><Opinion nameUser={opinion.user.name} opinion={opinion.description} fecha={opinion.updated_at} numStars={opinion.rate} /></Col>
                    </Row>
                )  
            );
        }else{
            opiniones.push(
                <Col sm={12} key={"no-opinions"}>No hay opiniones sobre el producto.</Col>
            )
        }
        return (
            <Container fluid>
                <Row className="opiniones-row"><Col sm={2}><h3>Opiniones</h3></Col><Col sm={{span: 2, offset: 8}}><Estrellas numStars={this.state.rate} /></Col></Row>
                {opiniones}
            </Container>
        )
    }
}
