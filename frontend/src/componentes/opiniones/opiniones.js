import React, { Component } from 'react';
import { Row, Col, Container, Image } from 'react-bootstrap';
import Opinion from './opinion';
import Estrellas from '../estrellas/estrellas';
import { getOpinions } from '../../database/functions';
import ImagenUser from '../../assets/images/user-icon.png';

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
        if(result[0].length === 0){
            result[1] = 5;
        }
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
                        <Col sm={1}><Image src={opinion.user !== undefined ? opinion.user.pic : ImagenUser} roundedCircle width="20px" /></Col>
                        <Col sm={11}><Opinion nameUser={opinion.user !== undefined ? opinion.user.name : localStorage.getItem('name')} opinion={opinion.description} fecha={opinion.updated_at} numStars={opinion.rate} /></Col>
                    </Row>
                )  
            );
        }else{
            opiniones.push(
                <Row className="opinion-row" key="opinion-row-non">
                    <Col sm={12} key={"no-opinions"}>No hay opiniones.</Col>
                </Row>
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
