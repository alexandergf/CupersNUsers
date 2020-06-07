import React, { Component } from 'react'
import { Row, Col, Button, InputGroup } from 'react-bootstrap';

export default class contador extends Component {
    constructor(props){
        super(props);
        this.state = {
            cont: 1,
            desabilitarResta: true
        }
        this.actualizarCont = this.actualizarCont.bind(this);
        this.sumar = this.sumar.bind(this);
        this.restar = this.restar.bind(this);
    }

    sumar = () =>{
        this.setState(() => ({
            cont: this.state.cont+1,
            desabilitarResta: false
        }));
        this.actualizarCont(this.state.cont+1);
    }

    restar = () =>{
        if(this.state.cont !== 1){
            this.setState(() => ({
                cont: this.state.cont-1
            }));
            this.actualizarCont(this.state.cont-1);
        }else{
            this.setState(() => ({
                desabilitarResta: true
            }));
        }
    }

    actualizarCont = (value) => {
        this.props.actualizar(value);
    }

    render() {
        return (
            <Row className="cash-line">
                <Col xl={2} md={5} xs={5} className="cash">{this.props.price+ " €"}</Col>
                <Col xl={{span: 4, offset: 2}} md={7} xs={7} className="cont-btns">
                    <span className="cant">Cant:</span>
                    <InputGroup className="mb-3" size="sm">
                        <InputGroup.Prepend>
                            <Button variant="outline-secondary" onClick={this.restar} disabled={this.state.desabilitarResta}>-</Button>
                        </InputGroup.Prepend>
                        <InputGroup.Text>{this.state.cont}</InputGroup.Text>
                        <InputGroup.Append>
                            <Button variant="outline-secondary" onClick={this.sumar}>+</Button>
                        </InputGroup.Append>
                    </InputGroup>
                </Col>
            </Row>
        )
    }
}
