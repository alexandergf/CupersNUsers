import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Estrellas from '../estrellas/estrellas';

export default class opinion extends Component {
    render() {   
        let fecha = new Date(this.props.fecha);
        let fechaFormatted = fecha.getUTCDate() + "/" + (fecha.getMonth()+1) + "/" + fecha.getFullYear(); 
        return (
            <Container>
                <Row>
                    <Col xl={2} md={3}>{this.props.nameUser}</Col>
                </Row>
                <Row>
                    <Col xl={2} md={5} xs={'auto'} className="opinion-col-star">
                        <Estrellas numStars={this.props.numStars} />
                    </Col>
                    <Col xl={{span: 2,offset:8}} md={{span: 4,offset:3}} xs={'auto'} className="fecha-opinion-row">
                        {fechaFormatted}
                    </Col>
                </Row>
                <Row>
                    <Col>"{this.props.opinion}"</Col>
                </Row>
            </Container>
        )
    }
}
