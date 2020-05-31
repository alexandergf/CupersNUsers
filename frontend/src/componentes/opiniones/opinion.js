import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Estrellas from '../estrellas/estrellas';

export default class opinion extends Component {
    render() {    
        return (
            <Container>
                <Row>
                    <Col sm={2}>{this.props.nameUser}</Col>
                </Row>
                <Row>
                    <Col sm={2}><Estrellas numStars={this.props.numStars} /></Col><Col sm={{span: 2,offset:8}}>{this.props.fecha}</Col>
                </Row>
                <Row>
                    <Col sm={2}>"{this.props.opinion}"</Col>
                </Row>
            </Container>
        )
    }
}
