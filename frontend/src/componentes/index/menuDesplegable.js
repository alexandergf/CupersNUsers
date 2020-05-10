import React, { Component } from 'react'
import {Container,Card,ListGroup} from 'react-bootstrap';
import { instance } from '../../database/config';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class menuDesplegable extends Component {
    constructor(props){
        super(props);
        this.state = {
            categorias: []
        }
        this.searchCategorie = this.searchCategorie.bind(this);
    }

    componentDidMount = () => {
        axios.post('/product/getCategories', {}, instance)
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
            <Link to="/"><ListGroup.Item key={cat.id} onClick={() => this.searchCategorie(cat.id,cat.name)} >{cat.name}</ListGroup.Item></Link>
        )
        categorias.push(<Link to="/"><ListGroup.Item key={-1} onClick={() => this.searchCategorie(-1,"Todos")} >{"Todos los productos"}</ListGroup.Item></Link>);
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
