import React, { Component } from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Opinion from './opinion';
import Estrellas from '../estrellas/estrellas';
import ImagenTest from '../../assets/images/prueba.jpg';

export default class opiniones extends Component {
    render() {
        const opiniones = [];
        for(let i = 1; i<=5;i++){
            opiniones.push(
            <Row className="opinion-row">
                <Col sm={1}><Image src={ImagenTest} roundedCircle width="20px" /></Col>
                <Col sm={11}><Opinion nameUser="Pablo22" opinion="Gran trabajo" fecha="12-05-2020" numStars="3.6" /></Col>
            </Row>);            
        }  
        return (
            <Container fluid>
                <Row className="opiniones-row"><Col sm={2}><h3>Opiniones</h3></Col><Col sm={{span: 2, offset: 8}}><Estrellas numStars="4.8" /></Col></Row>
                {opiniones}
            </Container>
        )
    }
}
