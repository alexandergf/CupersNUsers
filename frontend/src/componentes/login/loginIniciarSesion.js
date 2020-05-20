import React, { Component } from 'react';
import {Form, Container, Button, Row, Modal} from 'react-bootstrap';
import { instance } from '../../database/config';
import { userLog, forgotPass } from '../../database/functions';

export default class loginIniciarSesion extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: null,
            password: null,
            show: false,
            showConfirmation: false,
            showError: false
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
        let result = await userLog(this.state.email, this.state.password);
        result[1] === true ? this.setState({showError: result[1]}) : this.sendResponseData(result[0]);
    }

    sendResponseData = (value) => {
        sessionStorage.setItem('token', value);
        instance.headers.Authorization = "Bearer "+value;
        this.props.actualizar(true);
    }

    forgotPassword = async () => {
        let result = await forgotPass(this.state.email);
        console.log(result);
        this.setState({show: false,showConfirmation: true});
    }

    render() {
        const errorLogin = <Modal show={this.state.showError} onHide={() => this.setState({showError: false})}>
            <Modal.Header closeButton>
            <Modal.Title>Error</Modal.Title>
            </Modal.Header>
            <Modal.Body>El email o la contraseña introducidos no son correctos</Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={() => this.setState({showError: false})}>
                    Vale
                </Button>
            </Modal.Footer>
        </Modal>;
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
                <Row className="forgivePassword"><Button onClick={() => this.setState({show: true})}>¿Has olvidado la contraseña?</Button></Row>
                <Modal show={this.state.show} onHide={() => this.setState({show: false})}>
                    <Modal.Header closeButton>
                    <Modal.Title>Recuperar contraseña</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Cual es tu email?<br /><input type="email" name="email" onChange={this.handleChange} /></Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.setState({show: false})}>
                            Cancelar
                        </Button>
                        <Button variant="primary" onClick={() => this.forgotPassword()}>
                            Recuperar contraseña
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={this.state.showConfirmation} onHide={() => this.setState({showConfirmation: false})}>
                    <Modal.Header closeButton>
                    <Modal.Title>Recuperar contraseña</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Se te ha enviado un email a tu correo para cambiar la contraseña</Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={() => this.setState({showConfirmation: false})}>
                            Vale
                        </Button>
                    </Modal.Footer>
                </Modal>

                {errorLogin}
            </Container>
        )
    }
}
