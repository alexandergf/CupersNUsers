import React, { Component } from 'react'
import {Container,Card,ListGroup} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getCateorys } from '../../database/functions';
export default class menuDesplegable extends Component {
    constructor(props){
        super(props);
        this.state = {
            categorias: []
        }
        this.searchCategorie = this.searchCategorie.bind(this);
    }

    componentDidMount = () => {
        this.getCat();
    }

    getCat = async () => {
        this.setState({categorias: await getCateorys()});
    }

    searchCategorie = (id,name) => {
        this.props.getCategoria(id,name);
    }

    render() {
        var categorias = this.state.categorias.map((cat,index) => 
            <Link to="/" key={cat.id}><ListGroup.Item key={cat.id} onClick={() => this.searchCategorie(cat.id,cat.name)} >{cat.name}</ListGroup.Item></Link>
        )
        categorias.push(<Link to="/" key={-1}><ListGroup.Item key={-1} onClick={() => this.searchCategorie(-1,"Todos")} >{"Todos los productos"}</ListGroup.Item></Link>);
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
