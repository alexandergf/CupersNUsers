import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import { instance } from '../../database/config';
import axios from 'axios';

export default class editarPerfil extends Component {
    constructor(props){
        super(props);
        this.state = {
            perfil: {

            },
            
                old_password: null,
                new_password: null,
                repeat_password: null
            
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmitPassword = this.handleSubmitPassword.bind(this);
    }

    handleChange(event) {   
        const target = event.target;
        const value = target.value; 
        const name = target.name;
        this.setState({
            [name]: value
        });  
        
    }

    handleSubmitPassword(event) {
        event.preventDefault();
        var statePassword = this.state.new_password;
        if(this.state.new_password === this.state.repeat_password){
            axios.post('/user/changePassword', {
                "old_password": this.state.old_password,
                "password": this.state.new_password.toString()
              }, instance)
              .then(function (response) {
                  console.log(response);
                  console.log(statePassword);
                //if(response.data.data == null) Fallo 
                (response.data.data !== null) ? alert("Contraseña cambiada.") : alert("La antigua contraseña no coincide.");
              })
              .catch(function (error) {
                  console.log(instance);
                console.log(error);
              });
        }else{
            alert("La contraseña repetida no coincide con la nueva.");
        }
    }

    render() {
        return (
            <Container fluid className="edit-perfil">
                <Card>
                    <Card.Title><h3 className="editPerfil-title">Editar Perfil</h3></Card.Title>
                    <Card.Body className="edit-card">
                        <Form>
                            <Form.Group controlId="editNombre">                                    
                            <Form.Label>Nombre:</Form.Label>
                                <Col lg={5}>
                                    <Form.Control type="text" />
                                </Col>
                            </Form.Group>

                            <Form.Group controlId="editApellidos">
                                <Form.Label>Apellidos:</Form.Label>
                                <Form.Control type="text" />
                            </Form.Group>

                            <Form.Group controlId="editTlf">
                                <Form.Label>Teléfono:</Form.Label>
                                <Col lg={2}>
                                    <Form.Control lg={2} type="tel" />
                                </Col>
                            </Form.Group>

                            <Form.Group controlId="editDireccion">
                                <Form.Label>Dirección:</Form.Label>
                                <Form.Control type="text" />
                            </Form.Group>
                            <Button variant="success" type="submit">
                                Editar
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Title><h3 className="password-title">Contraseña</h3></Card.Title>
                    <Card.Body>
                        <Form onSubmit={this.handleSubmitPassword}>
                            <Form.Row>
                                <Form.Group as={Col} controlId="oldPasswordEdit">
                                    <Form.Label>Antigua Contraseña:</Form.Label>
                                    <Form.Control type="password" name="old_password" onChange={this.handleChange} required />
                                </Form.Group>

                                <Form.Group as={Col} controlId="newPasswordEdit">
                                    <Form.Label>Nueva Contraseña:</Form.Label>
                                    <Form.Control type="password" name="new_password" onChange={this.handleChange} required />
                                </Form.Group>

                                <Form.Group as={Col} controlId="repeatNewPasswordEdit">
                                    <Form.Label>Repetir Contraseña:</Form.Label>
                                    <Form.Control type="password" name="repeat_password" onChange={this.handleChange} required />
                                </Form.Group>
                            </Form.Row>
                            <div className="btn-save">
                                <Button variant="success" type="submit" >
                                    Guardar
                                </Button>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        )
    }
}
