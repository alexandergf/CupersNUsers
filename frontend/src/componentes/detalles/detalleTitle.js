import React, { Component } from 'react';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import { FaHeart } from 'react-icons/fa';

export default class detalleTitle extends Component {
    render() {
        return (
            <Row className="title-detail">
                <Col md={6} className="title-title"><h3>{this.props.name}</h3></Col><Col md={{ span: 2, offset: 4 }} className="heartToBasket"><Button className="btn" variant="secondary"><FaHeart /></Button></Col>
            </Row>
        )
    }
}
