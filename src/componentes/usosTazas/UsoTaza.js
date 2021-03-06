import React, { Component } from 'react';
import { Card } from 'react-bootstrap';

export default class usoTaza extends Component {
    render() {
        return (
            <Card>
                <Card.Title>
                    <div className="numero">
                        <h4>N. {this.props.num}</h4>
                    </div>
                </Card.Title>
                <Card.Body className="card-body-usoTaza">
                    <div className="usoTacero">
                        <p>{this.props.texto}</p>
                    </div>
                </Card.Body>
            </Card>
        )
    }
}