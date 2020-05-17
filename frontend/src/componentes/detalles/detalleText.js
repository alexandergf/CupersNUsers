import React, { Component } from 'react';
import DescripcionProducto from './descripcionProducto';
import Colors from './colors';
import Title from './detalleTitle';
import BottomDetail from './bottomDetail';
import Contador from './contador';
import Container from 'react-bootstrap/Container';

export default class detalleText extends Component {
    constructor(props){
        super(props);
        this.state = {
            cont: 1
        }
        this.actualizarCont = this.actualizarCont.bind(this);
    }

    actualizarCont = (contador) => {
        this.setState({
            cont: contador
        })
    }

    actualizarCarrito = () => {
        this.props.callback();
    }

    render() {
        var producto = (this.props.producto);
        return (
            <Container fluid>
                <Title name={producto.name} id={this.props.id} />
                <Contador price={producto.price} actualizar={this.actualizarCont.bind(this)} />
                <DescripcionProducto descr={producto.description} />
                <Colors />
                <BottomDetail callback={this.actualizarCarrito} idOpinion={this.props.id} cant={this.state.cont} />
            </Container>
        )
    }
}
