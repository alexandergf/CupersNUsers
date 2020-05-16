import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { instance } from '../../database/config';

export default class signUp extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: null,
            surnames: null,
            phone: null,
            direction: null,
            email: null,
            password: null
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
        axios.post('/user/register', {
            name: state.name,
            surnames: state.surnames,
            phone: state.phone,
            direction: state.direction,
            email: state.email,
            password: state.password
          }, instance)
          .then(function (response) {
            //console.log(response.data.data);
            if(response.data.data.email[0] !==null){
                alert(response.data.data.email[0]);
            }else{
                alert("Bieeeeeen");
            }
            //if(response.data.data == null) Fallo inicio sesion
          })
          .catch(function (error) {
            console.log(error);
          });
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
            </Container>
        )
    }
}
