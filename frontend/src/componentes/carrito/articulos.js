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
            totalPrecio: 0
        }
    }

    calculoTotales = (productos) => {
        let quantity = 0;
        for(let i = 0; i < productos.length; i++){
            quantity += productos[i].quantity;
        }

        return quantity;
    }

    render() {
        const tabla =  this.props.products.map((product,index) => 
            <tr key={"table-row-"+index}>
                <td><Image src={product.product.pics[0] !== undefined ? product.product.pics[0].pic : ImagenTest} roundedCircle width="72em" height="72em" />{product.product.name}</td>
                <td>{product.product.price}</td>
                <td>{product.quantity}</td>
                <td>{product.product.price.toFixed(2) * product.quantity} €</td>
            </tr>
        )

        let total = this.calculoTotales(this.props.products);
        
        return (
            <Container fluid className="articulos-carrito">
                <Card>
                    <Card.Title>
                        <h4>({total}) Artículos en tu carrito</h4>
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
