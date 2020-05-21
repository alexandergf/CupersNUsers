import React, { Component } from 'react';
import CarritoImg from '../../assets/images/carrito.png';
import { Row, Col, Image, Button, Modal } from 'react-bootstrap';
import Estrellas from '../estrellas/estrellas';
import { Link, Redirect } from 'react-router-dom';
import { getOpinions, cartItem } from '../../database/functions';

export default class bottomDetail extends Component {
    constructor(props){
        super(props);
        this.state = {
            opinions: 0,
            nOpinions: 0,
            rate: 0,
            showLogin: false,
            redirectLogin: false
        }
        this.addCart = this.addCart.bind(this);
    }

    componentDidMount = () => {
        this.getOpiniones();
    }

    getOpiniones = async () => {
        let result = await getOpinions(this.props.idOpinion);
        this.setState({
            opinions: result[0],
            nOpinions: result[0].length,
            rate: result[1]
        })
    }

    addCart = async () => {
        let result = await cartItem(this.props.idOpinion, this.props.cant);
        if(result[1] === false){
            this.props.callback(result[0]);
        }else{
            this.setState({
                showLogin: result[1]
            })
        }
    }

    render() {
        const logIn = <Modal show={this.state.showLogin} onHide={() => this.setState({showLogin: false})}>
            <Modal.Header closeButton>
            <Modal.Title>Ups</Modal.Title>
            </Modal.Header>
            <Modal.Body>Para añadir a la lista de deseos tienes que estar logeado.</Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={() => this.setState({showLogin: false})}>
                    Cancelar
                </Button>
                <Button variant="primary" onClick={() => this.setState({redirectLogin: true})}>
                    Logearse
                </Button>
            </Modal.Footer>
        </Modal>;
        if(this.state.redirectLogin === true){
            return <Redirect to="/Login" />
        }
        return (
            <Row className="bottom-detail">
                {logIn}
                <Col md={3} sm={3}><Row className="Opiniones"><span>{this.state.nOpinions} Opiniones</span></Row><Row className="star-row"><Estrellas numStars={this.state.rate} /></Row></Col>
                <Col className="carrito" xl={{span: 5, offset: 1}} lg={6} md={6} sm={6}><Button className="btn-carrito" onClick={() => this.addCart()}><Image src={CarritoImg} alt="Carrito" width="18px" />Añadir al carrito</Button></Col>
                <Col className="comprar" sm={3}><Link to="/Carrito" className="btn-comprar">Comprar</Link></Col>
            </Row>
        )
    }
}
