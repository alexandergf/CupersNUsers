import React, { Component } from 'react';
import CarritoImg from '../../assets/images/carrito.png';

export default class bottomDetail extends Component {
    render() {
        return (
            <div className="bottomDetail">
                <div className="Opiniones">2025 Opiniones</div>
                <div className="carrito"><a href="#" className="btn-carrito"><img src={CarritoImg} alt="Carrito" />Añadir al carrito</a></div>
                <div className="comprar"><a href="#" className="btn-comprar">Comprar</a></div>
            </div>
        )
    }
}
