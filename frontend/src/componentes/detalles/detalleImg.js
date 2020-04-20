import React, { Component } from 'react';
import Img from './img';
import ImagenPrueba from '../../assets/images/prueba.jpg';

export default class detalleImg extends Component {
    render() {
        return (
            <div className="detalleImg">
                <div className="main-img">
                    <Img src={ImagenPrueba} descripcion="Imagen de prueba" />
                </div>
                <div className="more-imgs">
                    <Img src={ImagenPrueba} descripcion="Imagen de prueba" />
                    <Img src={ImagenPrueba} descripcion="Imagen de prueba" />
                    <Img src={ImagenPrueba} descripcion="Imagen de prueba" />
                </div>
            </div>
        )
    }
}
