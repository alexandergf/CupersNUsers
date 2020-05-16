import React, { Component } from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';

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
        }
        
    }

    actualizarCont = (value) => {
        this.props.actualizar(value);
    }

    render() {
        return (
            <Row className="cash-line">
                <Col sm={2} className="cash">{this.props.price+ " €"}</Col>
                <Col sm={{span: 4, offset: 2}} className="cont-btns">
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
