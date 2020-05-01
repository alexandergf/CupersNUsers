import React, { Component } from 'react';
import { Container, Card, ListGroup, Image, Col, Row } from 'react-bootstrap/Container';
import ImagenTest from '../../assets/images/prueba.jpg';
import { 
    Link
} from 'react-router-dom';

export default class adminPerfil extends Component {
    render() {
        return (
            <Container fluid className="admin-perfil">
                <Card>
                    <Card.Header><Row><Col xs={1}><Image src={ImagenTest} roundedCircle width="30px" height="30px"/></Col><Col xs={10}>{this.props.user}</Col></Row></Card.Header>
                    <Card.Body>
                        <ListGroup variant="flush">
                            <ListGroup.Item><Link to="/EditarPerfil">Editar Perfil</Link></ListGroup.Item>
                            <ListGroup.Item><Link to="/Pedidos">Mis Pedidos</Link></ListGroup.Item>
                            <ListGroup.Item><Link to="/WishList">Lista de Deseos</Link></ListGroup.Item>
                            <ListGroup.Item><Link to="/Opinion">Opiniones</Link></ListGroup.Item>
                            <ListGroup.Item><Link to="/Contacto">Contacto</Link></ListGroup.Item>
                        </ListGroup>
                    </Card.Body>
                </Card>
            </Container>
        )
    }
}
