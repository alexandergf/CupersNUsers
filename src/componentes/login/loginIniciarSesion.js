import React, { Component } from 'react';
import {Form, Container, Button, Row, Modal} from 'react-bootstrap';
import { instance } from '../../database/config';
import { userLog, forgotPass } from '../../database/functions';
import MoonLoader from "react-spinners/MoonLoader";

function WaitAmoment(props){
    return(
        <>
            <Modal {...props}>
                <Modal.Header closeButton>
                <Modal.Title>Un momento</Modal.Title>
                </Modal.Header>
                <Modal.Body>Cargando...
                    <Container fluid className="container-icon-spinner">
                        <MoonLoader size={30} color={"#000000"} />
                    </Container>
                </Modal.Body>
            </Modal>
        </>
    )
}

function ErrorLogin(props){
    return (
        <>
            <Modal {...props}>
                <Modal.Header closeButton>
                <Modal.Title>Error</Modal.Title>
                </Modal.Header>
                <Modal.Body>El email o la contraseña introducidos no son correctos</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => props.onHide()}>
                        Vale
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

function RecuperarPassword(props){
    return (
        <>
            <Modal show={props.show} onHide={() => props.onHide()} animation={false}>
                <Modal.Header closeButton>
                <Modal.Title>Recuperar contraseña</Modal.Title>
                </Modal.Header>
                <Modal.Body>Cual es tu email?<br /><input type="email" name="email" onChange={props.handleChange} /></Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => props.onHide()}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={() => props.forgotPassword()}>
                        Recuperar contraseña
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

function SuccessRecuperarPassword(props){
    return (
        <>
            <Modal {...props}>
                <Modal.Header closeButton>
                <Modal.Title>Recuperar contraseña</Modal.Title>
                </Modal.Header>
                <Modal.Body>Se te ha enviado un email a tu correo para cambiar la contraseña</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => props.onHide()}>
                        Vale
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default class loginIniciarSesion extends Component {
    constructor(props){
        super(props);
        this.state = {
            show: false,
            showConfirmation: false,
            showError: false,
            showCharge: false
        }
        this.email = React.createRef();
        this.password = React.createRef();
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleSubmit = async (event) => {
        event.preventDefault();
        this.setState({showCharge: true});
        let result = await userLog(this.email.current.value, this.password.current.value);
        result[1] === true ? this.setState({showError: result[1], showCharge: false}) : this.sendResponseData(result[0]);
    }

    sendResponseData = (value) => {
        sessionStorage.setItem('token', value);
        instance.headers.Authorization = "Bearer "+value;
        this.setState({showCharge: false});
        this.props.actualizar(true);
    }

    forgotPassword = async () => {
        let result = await forgotPass(this.state.email);
        console.log(result);
        this.setState({show: false,showConfirmation: true});
    }

    render() {
        return (
            <Container fluid>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="logInEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" name="email" ref={this.email} required />
                    </Form.Group>

                    <Form.Group controlId="logInPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="password" ref={this.password} required />
                    </Form.Group>
                    <Button variant="success" type="submit">
                        Iniciar Sesión
                    </Button>
                </Form>
                <Row className="forgivePassword"><Button onClick={() => this.setState({show: true})}>¿Has olvidado la contraseña?</Button></Row>
                <RecuperarPassword show={this.state.show} onHide={() => this.setState({show: false})} handleChange={this.handleChange} forgotPassword={this.forgotPassword}/>
                <SuccessRecuperarPassword show={this.state.showConfirmation} onHide={() => this.setState({showConfirmation: false})} animation={false} />
                <ErrorLogin show={this.state.showError} onHide={() => this.setState({showError: false})} animation={false} />
                <WaitAmoment show={this.state.showCharge} onHide={() => this.setState({showCharge: false})} animation={false} />
            </Container>
        )
    }
}
