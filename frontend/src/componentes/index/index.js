import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MenuDesplegable from './menuDesplegable';
import PantallaInicial from './pantallaInicial';
import '../../assets/css/indexMain.css';

export default class index extends Component {
    render() {
        return (
            <Container fluid style={{padding: 0}} className="main-app">
                <Row>
                    {/* Navegador */}
                </Row>
                <Row>
                    <Col sm={2}>
                        <MenuDesplegable />
                    </Col>
                    <Col sm={10}>
                        {/* Contenido principal */}
                        <PantallaInicial />
                    </Col>
                </Row>
            </Container>
        )
    }
}
