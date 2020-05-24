import React, { Component } from 'react';
import Img from './img';
import ImagenPrueba from '../../assets/images/prueba.jpg';
import { Container, Row, Col} from 'react-bootstrap';

export default class detalleImg extends Component {
    render() {
        var imagenes = (this.props.imgs);
        if(imagenes !== undefined){
            var firstPicture = <Col><Img src={imagenes[0] !== undefined ? imagenes[0].pic : ImagenPrueba} className="foto-taza" descripcion={imagenes[0] !== undefined ? imagenes[0].updated_at : "Imagen de producto "} /></Col>;
            var otherPictures = [];
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
