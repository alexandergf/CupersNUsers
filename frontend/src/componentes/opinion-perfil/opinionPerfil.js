import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Opiniones from '../opiniones/opiniones';

export default class opinionPerfil extends Component {
    render() {
        return (
            <Container fluid className="opinion-perfil">
                <Card>
                    <Card.Body>
                        <h3 className="opinion-title">Opiniones</h3>
                        <Opiniones />
                    </Card.Body>
                </Card>
            </Container>
        )
    }
}
