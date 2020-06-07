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
            console.log(this.state.opinions)
            this.state.opinions.map((opinion,index) => 
                opiniones.push(
                    <Row className="opinion-row" key={"opinion-row-"+index}>
                        <Image src={opinion.user !== undefined ? (opinion.user.pic !== null ? opinion.user.pic : ImagenUser) : ImagenUser} roundedCircle width="40px" height="40px" />
                        <Opinion nameUser={opinion.user !== undefined ? opinion.user.name : localStorage.getItem('name')} opinion={opinion.description} fecha={opinion.updated_at} numStars={opinion.rate} />
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
                <Row className="opiniones-row">
                    <Col xl={2} md={3} xs={6}>
                        <h3>Opiniones</h3>
                    </Col>
                    <Col xl={{span: 2, offset: 8}} md={{span: 2, offset: 7}} xs={6}>
                        <Estrellas numStars={this.state.rate} />
                    </Col>
                </Row>
                {opiniones}
            </Container>
        )
    }
}
