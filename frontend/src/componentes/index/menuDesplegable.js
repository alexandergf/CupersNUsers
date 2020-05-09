import React, { Component } from 'react'
import {Container,Card,ListGroup} from 'react-bootstrap';
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

    searchCategorie = (id,name) => {
        this.props.getCategoria(id,name);
    }

    render() {
        var categorias = this.state.categorias.map((cat,index) => 
            <div><ListGroup.Item key={cat.id} onClick={() => this.searchCategorie(cat.id,cat.name)} >{cat.name}</ListGroup.Item></div>
        )
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
