import React, { Component } from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';

export default class contador extends Component {
    constructor(props){
        super(props);
        this.state = {
            cont: 1
        }
    }

    sumar = () =>{
        this.setState(() => ({
            cont: this.state.cont+1
        }));
    }

    restar = () =>{
        this.setState(() => ({
            cont: this.state.cont-1
        }));
    }

    render() {
        return (
            <Row>
                <Col sm>Cant: </Col>
                <Col sm>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <Button variant="outline-secondary" onClick={this.restar}>-</Button>
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
