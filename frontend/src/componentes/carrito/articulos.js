import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Image from 'react-bootstrap/Image';
import ImagenTest from '../../assets/images/prueba.jpg';

export default class articulos extends Component {
    constructor(props){
        super(props);
        this.state = {
            productos: [
                {imagen: "", nombre: "Taza de cafe 1", precio: "7.9", unidades:"1"},
                {imagen: "", nombre: "Taza de cafe 2", precio: "6.9", unidades:"2"},
                {imagen: "", nombre: "Taza de cafe 3", precio: "4.9", unidades:"3"},
                {imagen: "", nombre: "Taza de cafe 4", precio: "3.9", unidades:"4"}
            ]
        }
    }
    render() {
        const tabla = [];
        const productosState = this.state.productos;
        for (let i = 0; i < productosState.length; i++) {
            tabla.push(
                <tr>
                    <td><Image src={ImagenTest} roundedCircle width="100em" height="100em" />{productosState[i].nombre}</td>
                    <td>{productosState[i].precio}</td>
                    <td>{productosState[i].unidades}</td>
                    <td>{Math.round(((parseFloat(productosState[i].precio)*parseInt(productosState[i].unidades))+ Number.EPSILON)*100)/100} €</td>
                    {/*Formula redondeo: Math.round((num + Number.EPSILON) * 100) / 100*/}
                </tr>
            );
        }
        return (
            <Container fluid className="articulos-carrito">
                <Card>
                    <Card.Title>
                        <h4>({productosState.length}) Artículos en tu carrito</h4>
                    </Card.Title>
                    <Card.Body>
                        <Table responsive>
                            <thead>
                                <tr>
                                    <th>ARTICULO</th>
                                    <th>PRECIO</th>
                                    <th>UNIDADES</th>
                                    <th>TOTAL</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tabla}
                            </tbody>
                        </Table>
                    </Card.Body>
                    <Card.Footer>
                        <Button className="btn-vaciar-cesta">Vaciar cesta</Button>
                        <Button className="btn-seguir-comprando">Seguir comprando</Button>
                    </Card.Footer>
                </Card>
            </Container>
        )
    }
}
