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
            nombre: null,
            apellidos: null,
            telefono: null,
            direction: null,
            old_password: null,
            new_password: null,
            repeat_password: null
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmitPassword = this.handleSubmitPassword.bind(this);
        this.handleSubmitEdit = this.handleSubmitEdit.bind(this);
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
        if(this.state.new_password === this.state.repeat_password){
            axios.post('/user/changePassword', {
                "old_password": this.state.old_password,
                "password": this.state.new_password.toString()
              }, instance)
              .then(function (response) {
                (response.data.data !== null) ? alert("Contraseña cambiada.") : alert("La antigua contraseña no coincide.");
              })
              .catch(function (error) {
                console.log(error);
              });
        }else{
            alert("La contraseña repetida no coincide con la nueva.");
        }
    }

    handleSubmitEdit(event) {
        event.preventDefault();
        let dataUser = {};
        if(this.state.nombre !== null && this.state.nombre !== "") dataUser.name = this.state.nombre;
        if(this.state.apellidos !== null && this.state.nombre !== "") dataUser.surnames = this.state.apellidos;
        if(this.state.telefono !== null && this.state.nombre !== "") dataUser.phone = this.state.telefono;
        if(this.state.direction !== null && this.state.nombre !== "") dataUser.direction = this.state.direction;
        axios.post('/user/edit', dataUser, instance)
        .then(function (response) {
            console.log(response);
            (response.data.data !== null) ? alert("Bien.") : alert("Mal.");
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    render() {
        return (
            <Container fluid className="edit-perfil">
                <Card>
                    <Card.Title><h3 className="editPerfil-title">Editar Perfil</h3></Card.Title>
                    <Card.Body className="edit-card">
                        <Form onSubmit={this.handleSubmitEdit}>
                            <Form.Group controlId="editNombre">                                    
                            <Form.Label>Nombre:</Form.Label>
                                <Col lg={5}>
                                    <Form.Control type="text" name="nombre" onChange={this.handleChange} />
                                </Col>
                            </Form.Group>

                            <Form.Group controlId="editApellidos">
                                <Form.Label>Apellidos:</Form.Label>
                                <Form.Control type="text" name="apellidos" onChange={this.handleChange} />
                            </Form.Group>

                            <Form.Group controlId="editTlf">
                                <Form.Label>Teléfono:</Form.Label>
                                <Col lg={2}>
                                    <Form.Control lg={2} type="tel" name="telefono" onChange={this.handleChange} />
                                </Col>
                            </Form.Group>

                            <Form.Group controlId="editDireccion">
                                <Form.Label>Dirección:</Form.Label>
                                <Form.Control type="text" name="direction" onChange={this.handleChange} />
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
