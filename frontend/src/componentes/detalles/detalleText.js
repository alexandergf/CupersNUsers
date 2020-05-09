import React, { Component } from 'react';
import DescripcionProducto from './descripcionProducto';
import Colors from './colors';
import Title from './detalleTitle';
import BottomDetail from './bottomDetail';
import Contador from './contador';
import Container from 'react-bootstrap/Container';

export default class detalleText extends Component {
    render() {
        var producto = (this.props.producto);
        return (
            <Container fluid>
                <Title name={producto.name} />
                <Contador price={producto.price} />
                <DescripcionProducto descr={producto.description} />
                <Colors />
                <BottomDetail idOpinion={this.props.id}/>
            </Container>
        )
    }
}
