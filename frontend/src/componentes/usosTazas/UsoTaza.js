import React, { Component } from 'react';
import { Card } from 'react-bootstrap';

class usoTaza extends Component {

    render() {
        return (
            <Card>
                <Card.Title>
                    <div className="numero">
                        <h4>N. Tal</h4>
                    </div>
                </Card.Title>
                <Card.Body>
                    <div className="usoTacero">
                        <p>Texto ejemplo</p>
                    </div>
                </Card.Body>
            </Card>
        )
    }

}

export default usoTaza;