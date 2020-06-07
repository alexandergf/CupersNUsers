import React, { Component } from 'react';
import { Container, Col, Button, Form, Card, Modal } from 'react-bootstrap';
import '../../assets/css/Contacto.css';
import { contactoMail } from '../../database/functions';
import MoonLoader from "react-spinners/MoonLoader";

function Wait(props) {
    return (
        <>
            <Modal {...props}>
                <Modal.Header closeButton>
                    <Modal.Title>Un momento</Modal.Title>
                </Modal.Header>
                <Modal.Body>Se esta enviando el mensaje...
                    <Container fluid className="container-icon-spinner">
                        <MoonLoader size={30} color={"#000000"} />
                    </Container>
                </Modal.Body>
            </Modal>
        </>
    );
}

function ErrorMail(props) {
    return (
        <>
            <Modal {...props}>
                <Modal.Header closeButton>
                <Modal.Title>Ups!</Modal.Title>
                </Modal.Header>
                <Modal.Body>El mensaje no ha podido ser enviado.</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => props.onHide()}>
                        Vale
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

function OkMail(props) {
    return (
        <>
            <Modal {...props}>
                <Modal.Header closeButton>
                    <Modal.Title>Bien</Modal.Title>
                </Modal.Header>
                <Modal.Body>El mensaje se ha enviado correctamente.</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => props.onHide()}>
                        Vale
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

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
                                    <Col xl={5} md={5} xs={12}>
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
                <Wait show={this.state.show} onHide={() => this.setState({show:false})} animation={false}/>
                <ErrorMail show={this.state.showError} onHide={() => this.setState({showError: false})} animation={false}/>
                <OkMail show={this.state.showOk} onHide={() => this.setState({showOk: false})} animation={false} />
            </Container>
        )
    }

}

export default Contacto;