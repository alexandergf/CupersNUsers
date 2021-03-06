import React, { Component } from 'react';
import { Container, Col, Row, Button, FormControl, Image, InputGroup, Modal } from 'react-bootstrap';
import { BsList } from 'react-icons/bs';
import { RiAdminLine } from 'react-icons/ri';
import { BsBook } from 'react-icons/bs';
import { FiLogOut } from 'react-icons/fi';
import { AiOutlineUser, AiOutlineShoppingCart } from 'react-icons/ai';
import Logo from '../../assets/images/logo.png'
import '../../assets/css/navNFooter.css';
import { GiMagnifyingGlass } from 'react-icons/gi';
import { Link } from 'react-router-dom';
import Cart from './tarjetaCarrito';
import { logOutFunctionDB } from '../../database/functions';

function EnlaceAdmin(){
    return (
        <Col xs={2}>
            <a href="https://cupersnusers.vestidosaraya.com/admin/login">
                <Button variant="danger" className="fa fa-bars">
                    <RiAdminLine />
                </Button>
            </a>
        </Col>
    )
}

function EnlaceLogOut(props){
    return (
        <Col xs={2}>
            <Button variant="light" className="fa fa-bars" onClick={() => props.showModal()}><FiLogOut /></Button>
            <Modal show={props.show} onHide={() => props.onHide()} animation={false}>
                <Modal.Header closeButton>
                <Modal.Title>Cerrar Sesión</Modal.Title>
                </Modal.Header>
                <Modal.Body>Seguro que quieres cerrar la sesión?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => props.onHide()}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={() => props.logOut()}>
                        Salir
                    </Button>
                </Modal.Footer>
            </Modal>
        </Col>
    )
}

export default class Nav extends Component {
    constructor(props){
        super(props);
        this.state = {
            admin: false,
            logIn: false,
            search: "",
            cart_show: false,
            show: false,
            auxLogIn: true,
            lateralMenu: true
        };
        this.buttonSend = React.createRef();
        this.formInput = React.createRef();
        this.lateralMenu = this.props.reference;
        this.updatePerfil = this.updatePerfil.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
        this.cartShow = this.cartShow.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    componentDidMount = () => {
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

    handleKeyPress = (event) => {
        if(event.keyCode === 13){
            this.borrarSearchBar()
            this.buttonSend.current.click();
        }
    }

    updatePerfil = () => {
        if(sessionStorage.getItem('token') && this.state.logIn === false) this.setState({logIn: true});
    }

    cartShow = (value) => {
        if(this.state.cart_show === true && this.state.sValue === false){
            this.setState({cart_show: value});
        }        
    }

    logOutFunction = () => {
        this.setState({show: false, logIn: false, auxLogIn: false});
        logOutFunctionDB();
        sessionStorage.removeItem('token');
        this.props.logOut(true);
    }

    deleteFromCart = (prod) => {
        this.props.deleteFromCartCard(prod);
    }

    borrarSearchBar = () => {
        this.formInput.current.value = "";
    }

    render() {            
        return (
            <div className="Nav">
                <Container className="Contenedor" fluid>
                    <Row>
                        <Col xl={2} md={2} xs={2} className="col-nav-logo">
                            <Link to="/"><Image src={Logo} alt="Logo" className="LogoImagen" /></Link>
                        </Col>
                        <Col xl={1} md={1} xs={1} >
                            <Button variant="light" className="btn-menu-desplegable" onClick={() => this.sendResponseLateralMenu(true, true)}><BsList className="btn-menu-desplegable-icono" /></Button>
                        </Col>
                        <Col xl={6} md={5} xs={2} className="search-bar">
                            <InputGroup>
                                <FormControl type="text" placeholder="¿Que estas buscando?" className="mr-sm-2" onChange={this.handleOnChange} onKeyDown={this.handleKeyPress} ref={this.formInput} />
                                <InputGroup.Append>
                                    <Link to={"/Productos/"+this.state.search} ref={this.buttonSend} onClick={() => this.borrarSearchBar()}><Button variant="light"><GiMagnifyingGlass className="btn-lupa" /></Button></Link>
                                </InputGroup.Append>
                            </InputGroup>
                        </Col>
                        <Col xl={3} className="Botones" md={4} xs={7} >
                            <Row className="btn-row">
                                {this.state.admin ? <EnlaceAdmin /> : null}
                                <Col xl={2} md={2} xs={3}>
                                    <Link to="/UsoTazas">
                                        <Button variant="light" className="fa fa-bars" onClick={() => this.sendResponseLateralMenu(false,false)}>
                                            <BsBook />
                                        </Button>
                                    </Link>
                                </Col>
                                <Col xl={2} md={2} xs={3}>
                                    <Link to={this.state.logIn ? "/EditarPerfil/EditarPerfil" : "/Login"}>
                                        <Button variant="light" className="fa fa-bars" onClick={() => this.sendResponseLateralMenu(false,false)}>
                                            <AiOutlineUser />
                                        </Button>
                                    </Link>
                                </Col>
                                <Col xl={2} md={2} xs={3}>
                                    <Link to="/Carrito">
                                        <Button variant="light" className="fa fa-bars" onMouseEnter={() => this.setState({cart_show: true})} onClick={() => this.sendResponseLateralMenu(false,false)}>
                                            <AiOutlineShoppingCart />
                                        </Button>
                                    </Link>
                                </Col>
                                {this.state.cart_show ? <Cart deleteFromCartCard={() => this.deleteFromCart.bind(this)} productos={this.props.productosCarrito} show={this.state.cart_show} calltoclose={() => this.setState({cart_show: false})} />:null}
                                {this.state.logIn ? <EnlaceLogOut 
                                                        show={this.state.show} 
                                                        onHide={() => this.setState({show: false})} 
                                                        logOut={() => this.logOutFunction()} 
                                                        showModal={()=>this.setState({show: true})} 
                                                        /> : null}
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }

}