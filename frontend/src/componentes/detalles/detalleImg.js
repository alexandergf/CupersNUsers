import React, { Component } from 'react';
import Img from './img';
import ImagenPrueba from '../../assets/images/prueba.jpg';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default class detalleImg extends Component {
    render() {
        var imagenes = (this.props.imgs);
        var firstPicture = <Col><Img src={imagenes !== undefined ? imagenes[0].pic : ImagenPrueba} descripcion={imagenes !== undefined ? imagenes[0].updated_at : "Imagen de producto "} /></Col>;
        var otherPictures = [];
        if(imagenes !== undefined){
            imagenes.map((img,index) => 
                index === 0 ? null : otherPictures.push(<Col sm={3}><Img src={img.pic} descripcion={img.updated_at} /></Col>)
            )
        }
        return (
            <Container fluid>
                <Row>
                    {firstPicture}
                </Row>
                <Row className="detalleImg-second-line">
                    {otherPictures !== undefined ? otherPictures : null}
                </Row>
            </Container>
        )
    }
}
