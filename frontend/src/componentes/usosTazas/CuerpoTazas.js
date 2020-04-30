import React, { Component } from 'react';
import { Container, Col, Row, Card } from 'react-bootstrap';
import '../../assets/css/usosTazas.css';

import TituloUsosTazas from './TituloUsosTazas';
import UsoTaza from './UsoTaza';

class cuerpoTazas extends Component {

    listaUsos = () => {
        let tabla = [];
        let usos = [];

        for (let i = 0; i < 120; i+=2) {
            usos.push(
                <Row>
                    <Col xs={{span:4, offset:1}} className="textoTazas">
                        <UsoTaza />
                    </Col>    
                    <Col xs={{span:4, offset:2}}>
                        <UsoTaza />
                    </Col>
                </Row>
            );

        }
        tabla.push(usos);
        return tabla;
    }

    render() {
        return (
            <Container fluid>
                <Row>
                    <Col xs={{span:10, offset:1}}>
                        <Card>
                            <Card.Body>
                                <TituloUsosTazas />
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                {this.listaUsos()}
            </Container>
        )
    }

}

export default cuerpoTazas;