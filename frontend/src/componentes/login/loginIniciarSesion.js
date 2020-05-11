import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import axios from 'axios';
import { instance } from '../../database/config';

export default class loginIniciarSesion extends Component {
    constructor(props){
        super(props);
        this.state = {
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
        var sendResponseData = this.sendResponseData;
        axios.post('/user/login', {
            email: this.state.email,
            password: this.state.password
          }, instance)
          .then(function (response) {
            //if(response.data.data == null) Fallo inicio sesion
            if(response.data.data !== null){
                sendResponseData(response.data.data.token);
            }else{
                alert("Error al iniciar sesión");
            }
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    sendResponseData = (value) => {
        sessionStorage.setItem('token', value);
        instance.headers.Authorization = "Bearer "+value;
        this.props.actualizar(true);
    }

    render() {
        return (
            <Container fluid>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="logInEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" name="email" onChange={this.handleChange} required />
                    </Form.Group>

                    <Form.Group controlId="logInPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="password" onChange={this.handleChange} required />
                    </Form.Group>
                    <Button variant="success" type="submit">
                        Iniciar Sesión
                    </Button>
                </Form>
                <Row className="forgivePassword"><a href="#">¿Has olvidado la contraseña?</a></Row>
            </Container>
        )
    }
}
