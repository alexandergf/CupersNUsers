import React, { Component } from 'react';
import { Container, Card, Form } from 'react-bootstrap';

export default class elementoPanel extends Component {
    render() {
        return (
            <Container fluid className="elemento-panel">
                <Card>
                    <Card.Title>{this.props.name}</Card.Title>
                    <Card.Body>
                        <Form>
                            <Form.Group controlId={this.props.name+"-checkbox"}>
                                {this.props.filas.map((fila,index) => {
                                    return (
                                        <Form.Check type="checkbox" label={fila} />
                                    );
                                })}
                            </Form.Group>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        )
    }
}
