import React, { Component } from 'react';
import ReactBootstrap, { Container, Col, Row, Button, Form, FormControl } from 'react-bootstrap';
import { BsList } from 'react-icons/bs';
import { RiAdminLine } from 'react-icons/ri';
import { BsBook } from 'react-icons/bs';
import { AiOutlineUser, AiOutlineShoppingCart } from 'react-icons/ai';
import Logo from '../../assets/images/logo.png'
import '../../assets/css/navNFooter.css';

class Nav extends Component {

    render() {
        return (
            <div className="Nav">

                <Container className="Contenedor">
                    <Row>
                        <Col xs={2}>
                            <img src={Logo} alt="Logo" className="LogoImagen"/>
                        </Col>
                        <Col xs={1}>
                            <Button variant="light" className="fa fa-bars"><BsList /></Button>{' '}
                        </Col>
                        <Col xs={3}>
                            <Form inline>
                                <FormControl type="text" placeholder="¿Que estas buscando?" className="mr-sm-2" />
                            </Form>
                        </Col>
                        <Col xs={6}>

                            <Container className="Botones">
                                <Row>
                                    <Col xs={3}>
                                        <Button variant="danger" className="fa fa-bars"><RiAdminLine /></Button>{' '}
                                    </Col>
                                    <Col xs={3}>
                                        <Button variant="light" className="fa fa-bars"><BsBook /></Button>{' '}
                                    </Col>
                                    <Col xs={3}>
                                        <Button variant="light" className="fa fa-bars"><AiOutlineUser /></Button>{' '}
                                    </Col>
                                    <Col xs={3}>
                                        <Button variant="light" className="fa fa-bars"><AiOutlineShoppingCart /></Button>{' '}
                                    </Col>
                                </Row>
                                <Row>

                                    <Col xs={3}>
                                        <p>Administrador</p>
                                    </Col>

                                    <Col xs={3}>
                                        <p>Usos de tazas</p>
                                    </Col>

                                    <Col xs={3}>
                                        <p>Iniciar sesion</p>
                                    </Col>

                                    <Col xs={3}>
                                        <p>Carrito</p>
                                    </Col>

                                </Row>
                            </Container>


                        </Col>
                    </Row>
                </Container>

            </div>
        );
    }

}

export default Nav;