import React, { Component } from 'react';
import { Form, Container, Button, Modal} from 'react-bootstrap';
import axios from 'axios';
import { instance } from '../../database/config';
import {Redirect} from 'react-router-dom';

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
            log: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChange(event) {   
        const target = event.target;
        const value = target.value; 
        const name = target.name;
        this.setState({
            [name]: value
        });  
    }

    handleSubmit(event) {
        event.preventDefault();
        let state = this.state;
        let responseCreateCount = this.responseCreateCount
        axios.post('/user/register', {
            name: state.name,
            surnames: state.surnames,
            phone: state.phone,
            direction: state.direction,
            email: state.email,
            password: state.password
          }, instance)
          .then(function (response) {
              console.log(response);
            if(response.data.data.email !== null && response.data.data.email !== undefined){
                responseCreateCount(true);
            }else{
                responseCreateCount(false);
            }
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    responseCreateCount = (verify) => {
        if(verify){
            this.setState({create: true});
        }else{
            this.setState({failCreate: true});
        }
    }

    redirect = () => {
        this.setState({create: false, log: true});
    }

    render() {
        const errorCreateCount = <Modal show={this.state.failCreate} onHide={() => this.setState({failCreate: false})}>
            <Modal.Header closeButton>
            <Modal.Title>Error</Modal.Title>
            </Modal.Header>
            <Modal.Body>El email ya esta registrado o algunos de los campos no ha sido correctamente rellenados.</Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={() => this.setState({failCreate: false})}>
                    Vale
                </Button>
            </Modal.Footer>
        </Modal>;

        const acceptCreateCount = <Modal show={this.state.create} onHide={() => this.redirect()}>
            <Modal.Header closeButton>
            <Modal.Title>Felicidades</Modal.Title>
            </Modal.Header>
            <Modal.Body>La cuenta se ha creado correctamente, ahora inicia sesión.</Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={() => this.redirect()}>
                    Vale
                </Button>
            </Modal.Footer>
        </Modal>;
        if(this.state.log){
            return(<Redirect to="/" />)
        } 
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
                {errorCreateCount}
                {acceptCreateCount}
            </Container>
        )
    }
}
