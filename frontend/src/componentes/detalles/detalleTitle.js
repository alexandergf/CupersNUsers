import React, { Component } from 'react';
import CorazonImg from '../../assets/images/heart.png';
import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';

export default class detalleTitle extends Component {
    render() {
        return (
            <div className="title">
                <Col md="auto"><h3>{this.props.name}</h3></Col><Col md="auto"><button className="heartToBasket"><Image src={CorazonImg} alt="Corazon" thumbnail/></button></Col>
            </div>
        )
    }
}
