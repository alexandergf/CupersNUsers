import React, { Component } from 'react';
import Img from './img';
import ImagenPrueba from '../../assets/images/prueba.jpg';
import { Container, Row, Col} from 'react-bootstrap';

export default class detalleImg extends Component {
    constructor(props){
        super(props);
        this.state = {
            src: ImagenPrueba
        }
        this.handleClickToChange = this.handleClickToChange.bind(this);
    }

    handleClickToChange = (source) => {
        this.setState({src: source})
    }

    componentDidUpdate = () => {
        if(this.state.src === ImagenPrueba && this.props.imgs !== undefined){
            this.setState({src: this.props.imgs[0].pic})
        }
    }

    render() {
        var imagenes = (this.props.imgs);
        if(imagenes !== undefined){
            var firstPicture = <Col className="foto-taza"><Img src={imagenes[0] !== undefined ? this.state.src : ImagenPrueba} descripcion={imagenes[0] !== undefined ? imagenes[0].updated_at : "Imagen de producto "} /></Col>;
            var otherPictures = [];
            imagenes.map((img,index) => 
                otherPictures.push(<Col sm={3} key={"img-other-col-"+index} onClick={() => this.handleClickToChange(img.pic)}><Img src={img.pic} descripcion={img.updated_at} /></Col>)
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
