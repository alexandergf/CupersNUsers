import React, { Component } from 'react';
import { Form, Container, Button, Modal} from 'react-bootstrap';
import { createAccount } from '../../database/functions';
import MoonLoader from "react-spinners/MoonLoader";

function WaitAmoment(props){
    return(
        <>
            <Modal {...props}>
                <Modal.Header closeButton>
                <Modal.Title>Un momento</Modal.Title>
                </Modal.Header>
                <Modal.Body>Se está creando la cuenta...
                    <Container fluid className="container-icon-spinner">
                        <MoonLoader size={30} color={"#000000"} />
                    </Container>
                </Modal.Body>
            </Modal>
        </>
    )
}

function ErrorCreateCount(props){
    return (
        <>
            <Modal {...props}>
                <Modal.Header closeButton>
                <Modal.Title>Error</Modal.Title>
                </Modal.Header>
                <Modal.Body>El email ya esta registrado o algunos de los campos no ha sido correctamente rellenados.</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => props.onHide()}>
                        Vale
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

function AcceptCreateCount(props){
    return (
        <>
            <Modal {...props}>
                <Modal.Header closeButton>
                <Modal.Title>Felicidades</Modal.Title>
                </Modal.Header>
                <Modal.Body>La cuenta se ha creado correctamente, ahora inicia sesión.</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => props.onHide()}>
                        Vale
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default class signUp extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: null,
            surnames: null,
            phone: null,
            direction: null,
            email: null,
            password: null,
            failCreate: false,
            create: false,
            log: false,
            show: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
        this.setState({show: false});
        let dataUser = {};
        if(this.state.nombre !== null && this.state.nombre !== "") dataUser.name = this.state.nombre;
        if(this.state.apellidos !== null && this.state.nombre !== "") dataUser.surnames = this.state.apellidos;
        if(this.state.telefono !== null && this.state.nombre !== "") dataUser.phone = this.state.telefono;
        if(this.state.direction !== null && this.state.nombre !== "") dataUser.direction = this.state.direction;
        dataUser.direction = this.state.email;
        dataUser.direction = this.state.password;
        this.responseCreateCount(await createAccount(dataUser));
    }

    responseCreateCount = (verify) => {
        if(verify){
            this.setState({create: true, show: false});
        }else{
            this.setState({failCreate: true, show: false});
        }
    }

    redirect = () => {
        this.props.actualizar(true);
    }

    render() {
        return (
            <Container fluid>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="signUpNombre">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control type="text" name="name" onChange={this.handleChange} required />
                    </Form.Group>

                    <Form.Group controlId="signUpApellidos">
                        <Form.Label>Apellidos</Form.Label>
                        <Form.Control type="text" name="surnames" onChange={this.handleChange} />
                    </Form.Group>

                    <Form.Group controlId="signUpTlf">
                        <Form.Label>Teléfono</Form.Label>
                        <Form.Control type="tel" name="phone" onChange={this.handleChange} />
                    </Form.Group>

                    <Form.Group controlId="signUpDireccion">
                        <Form.Label>Dirección</Form.Label>
                        <Form.Control type="text" name="direction" onChange={this.handleChange} />
                    </Form.Group>

                    <Form.Group controlId="signUpEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" name="email" onChange={this.handleChange} required />
                    </Form.Group>

                    <Form.Group controlId="SignUpPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="password" onChange={this.handleChange} required />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Crear Usuario
                    </Button>
                </Form>
                <ErrorCreateCount show={this.state.failCreate} onHide={() => this.setState({failCreate: false})} animation={false} />
                <AcceptCreateCount show={this.state.create} onHide={() => this.redirect()} animation={false} />
                <WaitAmoment show={this.state.show} onHide={() => this.setState({show: false})} animation={false} />
            </Container>
        )
    }
}
