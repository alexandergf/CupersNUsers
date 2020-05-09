import React, { Component } from 'react';
import { Container, Col, Row, Button, FormControl, Image, InputGroup } from 'react-bootstrap';
import { BsList } from 'react-icons/bs';
import { RiAdminLine } from 'react-icons/ri';
import { BsBook } from 'react-icons/bs';
import { AiOutlineUser, AiOutlineShoppingCart } from 'react-icons/ai';
import Logo from '../../assets/images/logo.png'
import '../../assets/css/navNFooter.css';
import { GiMagnifyingGlass } from 'react-icons/gi';
import { Link } from 'react-router-dom';

class Nav extends Component {
    constructor(props){
        super(props);
        this.state = {
            admin: false,
            logIn: false
        };
        this.updatePerfil = this.updatePerfil.bind(this);
    }

    componentWillMount = () => {
        this.updatePerfil();
    }

    componentDidUpdate = () => {
        this.updatePerfil();
    }

    sendResponseLateralMenu = (value,mode) => {
        this.props.callback(value,mode);
    }

    updatePerfil = () => {
        if(sessionStorage.getItem('token') && this.state.logIn === false) this.setState({logIn: true});
    }
    render() {
        const enlaceAdmin = <a href="https://cupersnusers.vestidosaraya.com/admin/login"><Button variant="danger" className="fa fa-bars"><RiAdminLine /></Button><p>Administrador</p></a>;
        return (
            <div className="Nav">
                <Container className="Contenedor" fluid>
                    <Row>
                        <Col xs={2}>
                            <Link to="/"><Image src={Logo} alt="Logo" className="LogoImagen" onClick={() => this.sendResponseLateralMenu(true,false)}/></Link>
                        </Col>
                        <Col xs={1}>
                            <Button variant="light" className="btn-menu-desplegable" onClick={() => this.sendResponseLateralMenu(true, true)}><BsList className="btn-menu-desplegable-icono" /></Button>
                        </Col>
                        <Col xs={5}>
                            <InputGroup>
                                <FormControl type="text" placeholder="¿Que estas buscando?" className="mr-sm-2" />
                                <InputGroup.Append>
                                    <Button variant="light"><GiMagnifyingGlass className="btn-lupa" /></Button>
                                </InputGroup.Append>
                            </InputGroup>
                        </Col>
                        <Col xs={4} className="Botones">
                            <Row>
                                <Col xs={3}>
                                    {this.state.admin ? enlaceAdmin : null}
                                </Col>
                                <Col xs={3}>
                                    <Link to="/UsoTazas"><Button variant="light" className="fa fa-bars" onClick={() => this.sendResponseLateralMenu(false,false)}><BsBook /></Button>
                                    <p>Usos de tazas</p></Link>
                                </Col>
                                <Col xs={3}>
                                    <Link to={this.state.logIn ? "/EditarPerfil" : "/Login"}><Button variant="light" className="fa fa-bars" onClick={() => this.sendResponseLateralMenu(false,false)}><AiOutlineUser /></Button>
                                    <p>Iniciar sesion</p></Link>
                                </Col>
                                <Col xs={3}>
                                    <Button variant="light" className="fa fa-bars"><AiOutlineShoppingCart /></Button>
                                    <p>Carrito</p>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }

}

export default Nav;