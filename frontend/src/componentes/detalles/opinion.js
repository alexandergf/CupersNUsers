import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Estrellas from './estrellas';

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
