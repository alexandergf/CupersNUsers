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
                    <Col sm={2}>{this.props.nameUser}</Col>
                </Row>
                <Row>
                    <Col sm={2}><Estrellas numStars={this.props.numStars} /></Col><Col sm={{span: 2,offset:8}}>{fechaFormatted}</Col>
                </Row>
                <Row>
                    <Col>"{this.props.opinion}"</Col>
                </Row>
            </Container>
        )
    }
}
