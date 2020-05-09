import React, { Component } from 'react'
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { instance } from '../../database/config';
import axios from 'axios';

export default class menuDesplegable extends Component {
    constructor(props){
        super(props);
        this.state = {
            categorias: []
        }
        this.searchCategorie = this.searchCategorie.bind(this);
    }

    componentDidMount = () => {
        axios.get(instance.baseURL+'/product/getCategories', {}, instance)
        .then((response) => {
            this.setState({
                categorias: response.data.data
            })
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    searchCategorie = () => {
        
    }

    render() {
        const categorias = [];
        const categoriasState = this.state.categorias;
        for (let i = 0; i < categoriasState.length; i++) {
            categorias.push(
                <a href=""><ListGroup.Item key={categoriasState[i].id} >{categoriasState[i].name}</ListGroup.Item></a>
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
