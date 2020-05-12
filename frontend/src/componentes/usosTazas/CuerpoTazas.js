import React, { Component } from 'react';
import { Container, Col, Row, Card } from 'react-bootstrap';
import '../../assets/css/usosTazas.css';
import { Redirect } from 'react-router-dom';
import TituloUsosTazas from './TituloUsosTazas';
import UsoTaza from './UsoTaza';
import axios from 'axios';
import { instance } from '../../database/config';

class cuerpoTazas extends Component {
    constructor(props){
        super(props);
        this.state = {
            usos: []
        }
    }

    componentDidMount = () => {
        let actualizar = this.actualizar;
        axios.post('/cup/getUses', {}, instance)
          .then(function (response) {
            actualizar(response.data.data);
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    actualizar = (usosTazas) => {
        this.setState({
            usos: usosTazas
        })
    }

    listaUsos = () => {
        let tabla = [];
        let usos = [];

        usos = this.state.usos.map((us,index) => 
                <Col xs={{span:4, offset:1}} className="textoTazas" key={us.id.toString()+"-col"}>
                    <UsoTaza key={us.id.toString()} num={index+1} texto={us.use} />
                </Col>    
            )
        
        for (let i = 0; i < usos.length; i+=2) {
            
            tabla.push(
                <Row key={i}>
                    {usos[i]}  
                    {usos[i+1]}  
                </Row>
            );
        }

        return tabla;
    }

    render() {
        if(this.props.log){
            return(<Redirect to="/" />)
        } 
        return (
            <Container fluid>
                <Row>
                    <Col xs={{span:10, offset:1}}>
                        <Card>
                            <Card.Body>
                                <TituloUsosTazas />
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                {this.listaUsos()}
            </Container>
        )
    }

}

export default cuerpoTazas;