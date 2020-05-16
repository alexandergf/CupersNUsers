import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import ListGroup from 'react-bootstrap/ListGroup';
import Col from 'react-bootstrap/Col';

export default class descripcionProducto extends Component {
    render() {
        return (
            <Row>
                <Col sm={12} className="description-list">
                    <ListGroup>
                        <li>{this.props.descr}</li>
                    </ListGroup>
                </Col>
            </Row>
        )
    }
}
