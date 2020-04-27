import React, { Component } from 'react';
import ReactBootstrap, { Container, Col, Row, Button, Form, FormControl } from 'react-bootstrap';
import '../../assets/css/usosTazas.css';

import TituloUsosTazas from './TituloUsosTazas';
import UsoTaza from './UsoTaza';

class cuerpoTazas extends Component {

    listaUsos = () => {
        let tabla = [];
        let usos = [];

        for (let i = 0; i < 120; i++) {
            usos.push(
                <Row>
                    <Col xs={1} />
                    <Col xs={4} className="textoTazas">
                        <UsoTaza />
                    </Col>
                    <Col xs={2} />
                    <Col xs={4}>
                        <UsoTaza />
                    </Col>
                    <Col xs={1} />
                </Row>
            );

        }
        tabla.push(usos);
        return tabla;

    }

    render() {
        return (

            <Container>
                <Row>
                    <Col xs={2}></Col>
                    <Col xs={8}>
                        <TituloUsosTazas />
                    </Col>
                    <Col xs={2}></Col>
                </Row>
                {this.listaUsos()}
            </Container>
        )
    }

}

export default cuerpoTazas;