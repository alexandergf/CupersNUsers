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
import { Link, Redirect } from 'react-router-dom';
import Cart from './tarjetaCarrito';

class Nav extends Component {
    constructor(props){
        super(props);
        this.state = {
            admin: false,
            logIn: false,
            search: "",
            cart_show: false,
            show: false,
            auxLogIn: true
        };
        this.buttonSend = React.createRef();
        this.updatePerfil = this.updatePerfil.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
        this.searchWords = this.searchWords.bind(this);
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
            this.searchWords();
            this.buttonSend.current.click();
        }
    }

    searchWords = () => {
        this.sendResponseLateralMenu(false,false);
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

    logOutFunction = () => {
        this.setState({show: false, logIn: false, auxLogIn: false});
        sessionStorage.removeItem('token');
        this.props.logOut(true);
    }

    deleteFromCart = (prod) => {
        this.props.deleteFromCartCard(prod);
    }

    render() {
        const enlaceAdmin = <Col xs={2}>
                <a href="https://cupersnusers.vestidosaraya.com/admin/login">
                    <Button variant="danger" className="fa fa-bars">
                        <RiAdminLine />
                    </Button>
                </a>
            </Col>;    
            
        const enlaceLogOut = <Col xs={2}>
                <Button variant="light" className="fa fa-bars" onClick={() => this.setState({show: true})}><FiLogOut /></Button>
                <Modal show={this.state.show} onHide={() => this.setState({show: false})}>
                    <Modal.Header closeButton>
                    <Modal.Title>Cerrar Sesión</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Seguro que quieres cerrar la sesión?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.setState({show: false})}>
                            Cancelar
                        </Button>
                        <Button variant="primary" onClick={() => this.logOutFunction()}>
                            Salir
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Col>;
        
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
                        <Col xs={6}>
                            <InputGroup>
                                <FormControl type="text" placeholder="¿Que estas buscando?" className="mr-sm-2" onChange={this.handleOnChange} onKeyDown={this.handleKeyPress}/>
                                <InputGroup.Append>
                                    <Link to="/Productos" ref={this.buttonSend} onClick={()=>this.searchWords()}><Button variant="light"><GiMagnifyingGlass className="btn-lupa" /></Button></Link>
                                </InputGroup.Append>
                            </InputGroup>
                        </Col>
                        <Col xs={3} className="Botones">
                            <Row className="btn-row">
                                {this.state.admin ? enlaceAdmin : null}
                                <Col xs={2}>
                                    <Link to="/UsoTazas">
                                        <Button variant="light" className="fa fa-bars" onClick={() => this.sendResponseLateralMenu(false,false)}>
                                            <BsBook />
                                        </Button>
                                    </Link>
                                </Col>
                                <Col xs={2}>
                                    <Link to={this.state.logIn ? "/EditarPerfil" : "/Login"}>
                                        <Button variant="light" className="fa fa-bars" onClick={() => this.sendResponseLateralMenu(false,false)}>
                                            <AiOutlineUser />
                                        </Button>
                                    </Link>
                                </Col>
                                <Col xs={2}>
                                    <Link to="/Carrito">
                                        <Button variant="light" className="fa fa-bars" onMouseEnter={() => this.setState({cart_show: true})} onClick={() => this.sendResponseLateralMenu(false,false)}>
                                            <AiOutlineShoppingCart />
                                        </Button>
                                    </Link>
                                </Col>
                                {this.state.cart_show ? <Cart deleteFromCartCard={() => this.deleteFromCart.bind(this)} productos={this.props.productosCarrito} show={this.state.cart_show} calltoclose={() => this.setState({cart_show: false})} />:null}
                                {this.state.logIn ? enlaceLogOut : null}
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }

}

export default Nav;