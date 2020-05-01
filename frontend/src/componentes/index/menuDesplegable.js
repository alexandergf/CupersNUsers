import React, { Component } from 'react'
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

export default class menuDesplegable extends Component {
    constructor(props){
        super(props);
        this.state = {
            categorias: [
                "Tazas de café",
                "Tazas de plástico",
                "Tazas originales",
                "Tazas de acero",
                "Tazas de cerámica",
                "Tazas baratas",
                "Tazas temáticas",
                "Tazas para te",
                "Ofertas"
            ]
        }
    }
    render() {
        const categorias = [];
        const categoriasState = this.state.categorias;
        for (let i = 0; i < categoriasState.length; i++) {
            categorias.push(
                <ListGroup.Item key={i+"-itemCategoria"}><a href="">{categoriasState[i]}</a></ListGroup.Item>
            );
        }
        return (
            <Container fluid style={{padding: 0}} className="menu-desplegable">
                <Card>
                    <Card.Title>TODAS LAS CATEGORIAS</Card.Title>
                    <Card.Body>
                        <ListGroup variant="flush">
                            {categorias}
                        </ListGroup>
                    </Card.Body>
                </Card>
            </Container>
        )
    }
}
