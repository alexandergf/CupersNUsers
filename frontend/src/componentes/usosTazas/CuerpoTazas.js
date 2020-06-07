import React, { Component } from 'react';
import { Container, Col, Row, Card } from 'react-bootstrap';
import '../../assets/css/usosTazas.css';
import { Redirect } from 'react-router-dom';
import TituloUsosTazas from './TituloUsosTazas';
import UsoTaza from './UsoTaza';
import { getUsesCup } from '../../database/functions';

export default class cuerpoTazas extends Component {
    constructor(props){
        super(props);
        this.state = {
            usos: []
        }
    }

    componentDidMount = () => {
        this.getUses();
    }

    getUses = async () => {
        let result = await getUsesCup();
        if(result[1] === false){
            this.actualizar(result[0]);
        }else{
            console.log(result[0]);
        }
    }

    componentDidUpdate = () => {
        if(this.props.log){
            this.props.logOut(false);
        } 
    }

    actualizar = (usosTazas) => {
        this.setState({
            usos: usosTazas
        })
    }

    listaUsos = () => {
        let tabla = [];
        let usos = this.state.usos.map((us,index) => 
                <UsoTaza key={us.id.toString()} num={index+1} texto={us.use} />
            );
        
        for (let i = 0; i < usos.length; i+=2) {
            
            tabla.push(
                <Row key={i}>
                    <Col xl={{span:4, offset:1}} md={6} xs={12} className="textoTazas" key={i.toString()+"-col"}>
                        {usos[i]}  
                    </Col>
                    <Col xl={{span:4, offset:2}} md={6} xs={12} className="textoTazas" key={i.toString()+"-col2"}>
                        {usos[i+1]}  
                    </Col>
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
            <Container fluid className="uso-tazas-container">
                <Row>
                    <Col xl={{span:10, offset:1}} xs={12}>
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