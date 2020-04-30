import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import ImagenTest from '../../assets/images/prueba.jpg';
import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
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
