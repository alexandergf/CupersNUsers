import React, { Component } from 'react';
import { Container, Card, Button, Form, Row, Col } from 'react-bootstrap';
import { fabric } from 'fabric';
import { SketchPicker } from 'react-color';
import reactCSS from 'reactcss';
import '../../assets/css/personalizarTaza.css';

export default class tazaPersonalizada extends Component {
    constructor(props) {
        super(props);
        this.refs = {
          canvas: {}
        };
        this.state = {
            text: [],
            displayColorPicker: false,
            color: {
                r: '0',
                g: '0',
                b: '0',
                a: '1',
            }
        }
        this.formInput = React.createRef();
        this.addImageSrc = React.createRef();
        this.fontWeight = React.createRef();
        this.underL = React.createRef();
        this.canvas = null;
    }

    componentDidMount = () => {
        this.montarCanvas();
    }

    handleClick = () => {
        this.setState({ displayColorPicker: !this.state.displayColorPicker })
    };
    
    handleClose = () => {
        this.setState({ displayColorPicker: false })
    };
    
    handleChange = (color) => {
        this.setState({ color: color.rgb })
    };

    montarCanvas = () => {
        this.canvas= new fabric.Canvas('canvas',{
                backgroundColor: 'rgb(255,255,255)',
                selectionBorderColor: 'black',
                selectionLineWidth: 2,
                width: 500,
                height: 500
              });
        
        var rect = new fabric.Rect({
            top : 255,
            left : 100,
            width : 60,
            height : 70,
            fill : 'red'
        });
        this.canvas.add(rect);
    }

    añadirTexto = () => {
        var fontW=this.fontWeight.current.checked?'bold':'normal';
        let texto = new fabric.Text(this.formInput.current.value, {fontSize: 100,underline: this.underL.current.checked, fontWeight: fontW, left: 100, top: 100, fill: `rgba(${ this.state.color.r }, ${ this.state.color.g }, ${ this.state.color.b }, ${ this.state.color.a })`});
        this.canvas.add(texto);
        this.formInput.current.value = "";
    }

    addImage = () => {
        var canvas = this.canvas;
        var reader = new FileReader();
        reader.onload = function(event) {
            var imgObj = new Image();
            imgObj.src = event.target.result;
            imgObj.onload = function() {
                var image = new fabric.Image(imgObj);
                image.set({
                    left: 10,
                    top: 10,
                }).scale(0.3);
                canvas.add(image);
            };
        };
        reader.readAsDataURL(this.addImageSrc.current.files[0]);
    }

    render() {
        const styles = reactCSS({
            'default': {
              color: {
                width: '36px',
                height: '14px',
                borderRadius: '2px',
                background: `rgba(${ this.state.color.r }, ${ this.state.color.g }, ${ this.state.color.b }, ${ this.state.color.a })`,
              },
              swatch: {
                padding: '5px',
                background: '#fff',
                borderRadius: '1px',
                boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
                display: 'inline-block',
                cursor: 'pointer',
              },
              popover: {
                position: 'absolute',
                zIndex: '2',
              },
              cover: {
                position: 'fixed',
                top: '0px',
                right: '0px',
                bottom: '0px',
                left: '0px',
              },
            },
          });
        return (
            <Container className="taza-personalizada-container">
                <Card>
                    <Card.Title><h3>Personaliza tu Taza</h3></Card.Title>
                    <Card.Body>
                        <Row>
                            <Col>
                                <canvas id="canvas"></canvas>
                            </Col>
                            <Col>
                                <Container>
                                    <Form.Control type="text" name="name" ref={this.formInput} placeholder={'Escriba el texto que quiere añadir...'} />
                                    <div style={ styles.swatch } onClick={ this.handleClick }>
                                        <div style={ styles.color } />
                                    </div>
                                    { this.state.displayColorPicker ? <div style={ styles.popover }>
                                    <div style={ styles.cover } onClick={ this.handleClose }/>
                                        <SketchPicker color={ this.state.color } onChange={ this.handleChange } />
                                    </div> : null }
                                    <Form.Group>
                                        <Form.Check label="Negrita" ref={this.fontWeight} />
                                        <Form.Check label="Subrayado" ref={this.underL} />
                                    </Form.Group>
                                    <Button onClick={() => this.añadirTexto()}>Añadir texto</Button>
                                    <Form.File id="imafeToAdd" ref={this.addImageSrc}/>
                                    <Button onClick={this.addImage}>Añadir imagen</Button>
                                    <Button>Export file</Button>
                                </Container>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Container>
        )
    }
}
