import React, { Component } from 'react'
import { Container, Card, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default class menuDesplegable extends Component {
    render() {
        var categorias = this.props.cat.map((cat,index) => 
            <Link to={"/"+cat.id+"/"+cat.name} key={cat.id}><ListGroup.Item key={cat.id}>{cat.name}</ListGroup.Item></Link>
        )
        categorias.push(<Link to="/" key={-1}><ListGroup.Item key={-1}>{"Todos los productos"}</ListGroup.Item></Link>);
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
