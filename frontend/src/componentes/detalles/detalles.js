import React, { Component } from 'react';
import DetalleImg from './detalleImg';
import DetalleText from './detalleText';
import '../../assets/css/detalles.css';

export default class detalles extends Component {
    render() {
        return (
            <div className="detail">
                <DetalleImg />
                <DetalleText />
            </div>
        )
    }
}
