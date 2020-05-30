import React, { Component } from 'react';
import { Container, Col, Button, Form, Card, Modal } from 'react-bootstrap';
import '../../assets/css/Contacto.css';
import { contactoMail } from '../../database/functions';
import MoonLoader from "react-spinners/MoonLoader";

class Contacto extends Component {
    constructor(props){
        super(props);
        this.state = {
            asunto: "",
            mensaje: "",
            show: false,
            showError: false,
            showOk: false
        }
    }

    handleChange = (event) => {   
        const target = event.target;
        const value = target.value; 
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        this.setState({show: true})
        let result = await contactoMail(this.state.asunto, this.state.mensaje);
        if(result === true){
            this.setState({show: false, showOk: true})
        }else{
            this.setState({show: false, showError: true})
        }
    }

    render() {
        const waitAmoment = <Modal show={this.state.show} onHide={() => this.setState({show: false})}>
                    <Modal.Header closeButton>
                    <Modal.Title>Un momento</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Se esta enviando el mensaje...
                        <Container fluid className="container-icon-spinner">
                            <MoonLoader size={30} color={"#000000"} />
                        </Container>
                    </Modal.Body>
                </Modal>;
        const errorMail = <Modal show={this.state.showError} onHide={() => this.setState({showError: false})}>
            <Modal.Header closeButton>
            <Modal.Title>Ups!</Modal.Title>
            </Modal.Header>
            <Modal.Body>El mensaje no ha podido ser enviado.</Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={() => this.setState({showError: false})}>
                    Vale
                </Button>
            </Modal.Footer>
        </Modal>;
        const okMail = <Modal show={this.state.showOk} onHide={() => this.setState({showOk: false})}>
            <Modal.Header closeButton>
            <Modal.Title>Bien</Modal.Title>
            </Modal.Header>
            <Modal.Body>El mensaje se ha enviado correctamente.</Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={() => this.setState({showOk: false})}>
                    Vale
                </Button>
            </Modal.Footer>
        </Modal>;
        return (
            <Container fluid className="Contacto">
                <Card>
                    <Card.Title><h3 className="ContactoTitulo">Contacto</h3></Card.Title>
                    <Card.Body>
                        <Col xs={12}>
                            <Form onSubmit={this.handleSubmit}>
                                <Form.Group className="Formulario">
                                    <Form.Label>
                                        Asunto:
                                    </Form.Label>
                                    <Col xs={5}>
                                        <Form.Control type="text" name="asunto" onChange={this.handleChange} required />
                                    </Col>
                                </Form.Group>
                                <Form.Group className="Formulario">
                                    <Form.Label>Mensaje:</Form.Label>
                                    <Col xs={12}>
                                        <Form.Control as="textarea" rows="3" name="mensaje" onChange={this.handleChange} required />
                                    </Col>
                                </Form.Group>
                                <Button variant="primary" type="submit" className="Submit">Enviar Consulta</Button>
                            </Form>
                        </Col>
                    </Card.Body>
                </Card>
                {waitAmoment}
                {errorMail}
                {okMail}
            </Container>
        )
    }

}

export default Contacto;