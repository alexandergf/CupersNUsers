import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import ImagenTest from '../../assets/images/prueba.jpg';
import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

export default class adminPerfil extends Component {
    render() {
        return (
            <Container fluid className="admin-perfil">
                <Card>
                    <Card.Header><Row><Col xs={1}><Image src={ImagenTest} roundedCircle width="30px" height="30px"/></Col><Col xs={10}>{this.props.user}</Col></Row></Card.Header>
                    <Card.Body>
                        <ListGroup variant="flush">
                            <ListGroup.Item><a href="#">Editar Perfil</a></ListGroup.Item>
                            <ListGroup.Item><a href="#">Mis Pedidos</a></ListGroup.Item>
                            <ListGroup.Item><a href="#">Lista de Deseos</a></ListGroup.Item>
                            <ListGroup.Item><a href="#">Opiniones</a></ListGroup.Item>
                            <ListGroup.Item><a href="#">Contacto</a></ListGroup.Item>
                        </ListGroup>
                    </Card.Body>
                </Card>
            </Container>
        )
    }
}
