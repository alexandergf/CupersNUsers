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
import Cart from './tarjetaCarrito';

class Nav extends Component {
    constructor(props){
        super(props);
        this.state = {
            admin: false,
            logIn: false,
            search: "",
            cart_show: false,
            sValue: false
        };
        this.updatePerfil = this.updatePerfil.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
        this.searchWords = this.searchWords.bind(this);
        this.cartShow = this.cartShow.bind(this);
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

    handleOnChange = (event) => {
        const value = event.target.value; 
        this.setState({
            search: value
        })
    }

    searchWords = () => {
        this.sendResponseLateralMenu(false,false)
        this.props.search(this.state.search);
    }

    searchCategorie = (id,name) => {
        this.sendResponseLateralMenu(true,false);
        this.props.getCategoria(id,name);
    }

    updatePerfil = () => {
        if(sessionStorage.getItem('token') && this.state.logIn === false) this.setState({logIn: true});
    }

    cartShow = (value) => {
        if(this.state.cart_show === true && this.state.sValue === false){
            this.setState({cart_show: value});
        }        
    }
    render() {
        const enlaceAdmin = <a href="https://cupersnusers.vestidosaraya.com/admin/login"><Button variant="danger" className="fa fa-bars"><RiAdminLine /></Button><p>Administrador</p></a>;
        return (
            <div className="Nav">
                <Container className="Contenedor" fluid>
                    <Row>
                        <Col xs={2}>
                            <Link to="/"><Image src={Logo} alt="Logo" className="LogoImagen" onClick={() => this.searchCategorie(-1,"Todos los productos")}/></Link>
                        </Col>
                        <Col xs={1}>
                            <Button variant="light" className="btn-menu-desplegable" onClick={() => this.sendResponseLateralMenu(true, true)}><BsList className="btn-menu-desplegable-icono" /></Button>
                        </Col>
                        <Col xs={5}>
                            <InputGroup>
                                <FormControl type="text" placeholder="¿Que estas buscando?" className="mr-sm-2" onChange={this.handleOnChange} />
                                <InputGroup.Append>
                                    <Link to="/Productos" onClick={()=>this.searchWords()}><Button variant="light"><GiMagnifyingGlass className="btn-lupa" /></Button></Link>
                                </InputGroup.Append>
                            </InputGroup>
                        </Col>
                        <Col xs={4} className="Botones" onMouseLeave={() => setTimeout((()=>this.cartShow(false,false)),1000)}>
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
                                    <Link to="/Carrito"><Button variant="light" className="fa fa-bars" onMouseEnter={() => this.setState({cart_show: true})} onClick={() => this.sendResponseLateralMenu(false,false)}><AiOutlineShoppingCart /></Button>
                                    <p>Carrito</p></Link>
                                </Col>
                                {this.state.cart_show ? <Cart onMouseEnter={() => this.setState({sValue: true})} onMouseLeave={() => this.setState({sValue: false})} />:null}
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }

}

export default Nav;