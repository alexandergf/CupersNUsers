import React, { Component } from 'react';
import Color from './color';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default class colors extends Component {
    render() {
        return (
            <Row className="colors">
                <Col className="color-item">
                    <span>Colors: </span>
                    <Color color="red" />
                    <Color color="blue" />
                    <Color color="yellow" />
                    <Color color="green" />
                    <Color color="white" />
                </Col>
            </Row>
        )
    }
}
