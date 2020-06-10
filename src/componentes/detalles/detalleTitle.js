import React, { Component } from 'react';
import { Col, Button, Row, Toast, Modal } from 'react-bootstrap';
import { FaHeart } from 'react-icons/fa';
import { addWishItem } from '../../database/functions';
import { Redirect } from 'react-router-dom';

function LogIn(props){
    return (
        <>
            <Modal show={props.showLogin} onHide={() => props.onHide()} animation={false}>
                <Modal.Header closeButton>
                <Modal.Title>Ups</Modal.Title>
                </Modal.Header>
                <Modal.Body>Para añadir a la lista de deseos tienes que estar logeado.</Modal.Body>
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

function FavProduct(props){
    return (
        <>
            <Toast className="toast-title" {...props}>
                <Toast.Header>
                <img
                    src="holder.js/20x20?text=%20"
                    className="rounded mr-2"
                    alt=""
                />
                <strong className="mr-auto">Lista de deseos</strong>
                </Toast.Header>
                <Toast.Body>Producto añadido a la lista de deseos.</Toast.Body>
            </Toast>
        </>
    )
}

export default class detalleTitle extends Component {
    constructor(props){
        super(props);
        this.state = {
            show: false,
            showLogin: false,
            redirectLogin: false
        }
    }

    whishItem = async (id) => {
        let result = await addWishItem(id);
        if(result[1] === false){
            this.setState({
                show: true
            })
        }else{
            this.setState({
                showLogin: result[1]
            })
        }
    }

    render() {
        if(this.state.redirectLogin === true){
            return <Redirect to="/Login" />
        }
        return (
            <Row className="title-detail">
                <FavProduct onClose={() => this.setState({show:false})} show={this.state.show} delay={3000} autohide />
                <LogIn 
                    showLogin={this.state.showLogin} 
                    onHide={() => this.setState({showLogin: false})} 
                    redirect={() => this.setState({redirectLogin: true})}
                />
                <Col className="title-title"><h3>{this.props.name}</h3></Col><Col className="heartToBasket"><Button className="btn" variant="secondary" onClick={() => this.whishItem(this.props.id)}><FaHeart /></Button></Col>
            </Row>
        )
    }
}
