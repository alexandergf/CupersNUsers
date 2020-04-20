import React, { Component } from 'react';
import DescripcionProducto from './descripcionProducto';
import Colors from './colors';
import Title from './detalleTitle';
import BottomDetail from './bottomDetail';

export default class detalleText extends Component {
    render() {
        return (
            <div className="detalleText">
                <Title name="Titulo de prueba" />
                <span className="cash">7'18 €</span>
                <DescripcionProducto />
                <Colors />
                <BottomDetail />
            </div>
        )
    }
}
