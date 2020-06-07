import React, { Component } from 'react';
import { Container, Card, ListGroup, Image, Col, Row } from 'react-bootstrap';
import ImagenTest from '../../assets/images/user-icon.png';
import { Link } from 'react-router-dom';
import { getDetailUser } from '../../database/functions';

export default class adminPerfil extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: "",
            pic: ""
        }
    }
    componentDidMount = () => {
        this.getDetail();
    }

    getDetail = async () => {
        let result = await getDetailUser();
        if(result[1] === false){
            this.infoUser(result[0]);
            localStorage.setItem('name', result[0].name);
        }
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
                    <Card.Header>
                        <Row>
                            <Col xl={1} md={1}><Image src={this.state.pic !== null && this.state.pic !== undefined ? this.state.pic : ImagenTest} alt={this.state.pic !== null && this.state.pic !== undefined ? this.state.pic : "ImagenTest"} roundedCircle width="30px" height="30px"/></Col>
                            <Col xl={10} md={8}>{this.state.name}</Col>
                        </Row>
                    </Card.Header>
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
