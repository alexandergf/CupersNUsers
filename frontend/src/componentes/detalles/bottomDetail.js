import React, { Component } from 'react';
import CarritoImg from '../../assets/images/carrito.png';
import { Row, Col, Image, Button, Modal } from 'react-bootstrap';
import Estrellas from '../estrellas/estrellas';
import { Redirect } from 'react-router-dom';
import { getOpinions, cartItem } from '../../database/functions';

function LogIn(props){
    return (
        <>
            <Modal show={props.showLogin} onHide={() => props.onHide()} animation={false}>
                <Modal.Header closeButton>
                <Modal.Title>Ups</Modal.Title>
                </Modal.Header>
                <Modal.Body>{props.errorMessage}</Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={() => props.onHide()}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={() => props.redirect}>
                        Logearse
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default class bottomDetail extends Component {
    constructor(props){
        super(props);
        this.state = {
            opinions: 0,
            nOpinions: 0,
            showLogin: false,
            redirectLogin: false,
            redirectCart: false,
            errorMessage: ""
        }
        this.addCart = this.addCart.bind(this);
    }

    componentDidMount = () => {
        this.getOpiniones();
    }

    getOpiniones = async () => {
        let result = await getOpinions(this.props.idProducto);
        this.setState({
            opinions: result[0],
            nOpinions: result[0].length
        })
    }

    addCart = async () => {
        let result = await cartItem(this.props.idProducto, this.props.cant);
        if(result[1] === false){
            this.props.callback(result[0]);
        }else{
            this.setState({
                errorMessage: "Para añadir a la lista de deseos tienes que estar logeado.",
                showLogin: result[1]
            })
        }
    }

    buyItem = async () => {
        let result = await cartItem(this.props.idProducto, this.props.cant);
        if(result[1] === false){
            this.props.callback(result[0]);
            this.setState({redirectCart: true});
        }else{
            this.setState({
                showLogin: result[1],
                errorMessage: "Para comprar un producto tienes que estar logeado.",
            })
        }
    }

    render() {
        if(this.state.redirectLogin === true){
            return <Redirect to="/Login" />
        }else if(this.state.redirectCart === true){
            return <Redirect to="/Carrito" />
        }
        return (
            <Row className="bottom-detail">
                <LogIn 
                    showLogin={this.state.showLogin} 
                    onHide={() => this.setState({showLogin: false})} 
                    errorMessage={this.state.errorMessage} 
                    redirect={() => this.setState({redirectLogin: true})}
                />
                <Col md={3} sm={3}><Row className="Opiniones"><span>{this.state.nOpinions} Opiniones</span></Row><Row className="star-row"><Estrellas numStars={this.props.estrellas} /></Row></Col>
                <Col className="carrito-col-btn" xl={{span: 5, offset: 1}} lg={6} md={6} sm={6}><Button className="btn-carrito" onClick={() => this.addCart()}><Image src={CarritoImg} alt="Carrito" width="18px" />Añadir al carrito</Button></Col>
                <Col className="comprar" sm={3}><Button className="btn-comprar" variant="success" onClick={() => this.buyItem()} >Comprar</Button></Col>
            </Row>
        )
    }
}
