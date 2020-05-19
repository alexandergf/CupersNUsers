import React, { Component } from 'react';
import { Container, Card, ListGroup, Image, Col, Row } from 'react-bootstrap';
import ImagenTest from '../../assets/images/prueba.jpg';
import { 
    Link
} from 'react-router-dom';
import { instance } from '../../database/config';
import axios from 'axios';

export default class adminPerfil extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: "",
            pic: ""
        }
    }
    componentDidMount = () => {
        let infoUser = this.infoUser;
        axios.post("/user/detail", {}, instance)
        .then((response) => {
            infoUser(response.data.data);
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    infoUser = (data) => {
        this.setState({
            name: data.name,
            pic: data.pic
        })
    }
    render() {
        return (
            <Container fluid className="admin-perfil">
                <Card>
                    <Card.Header><Row><Col xs={1}><Image src={this.state.pic !== null && this.state.pic !== undefined ? this.state.pic : ImagenTest} alt={this.state.pic !== null && this.state.pic !== undefined ? this.state.pic : "ImagenTest"} roundedCircle width="30px" height="30px"/></Col><Col xs={10}>{this.state.name}</Col></Row></Card.Header>
                    <Card.Body>
                        <ListGroup variant="flush">
                            <Link to="/EditarPerfil"><ListGroup.Item>Editar Perfil</ListGroup.Item></Link>
                            <Link to="/Pedidos"><ListGroup.Item>Mis Pedidos</ListGroup.Item></Link>
                            <Link to="/WishList"><ListGroup.Item>Lista de Deseos</ListGroup.Item></Link>
                            <Link to="/Opinion"><ListGroup.Item>Opiniones</ListGroup.Item></Link>
                            <Link to="/Contacto"><ListGroup.Item>Contacto</ListGroup.Item></Link>
                        </ListGroup>
                    </Card.Body>
                </Card>
            </Container>
        )
    }
}
