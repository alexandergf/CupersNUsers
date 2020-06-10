import React, { Component } from 'react';
import { Row, ListGroup, Col } from 'react-bootstrap';

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
