import React, { Component } from 'react';
import { Container, Card, Button, Form, Row, Col, ListGroup } from 'react-bootstrap';
import { fabric } from 'fabric';
import { SketchPicker } from 'react-color';
import reactCSS from 'reactcss';
import '../../assets/css/personalizarTaza.css';
import CarritoImg from '../../assets/images/carrito.png';

export default class tazaPersonalizada extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listItems: [],
            itemsText: [],
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
        this.rowCanvas = React.createRef();
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
        var rowCanvas = this.rowCanvas.current;
        console.log(rowCanvas);
        this.canvas= new fabric.Canvas('canvas',{
                backgroundColor: 'rgb(255,255,255)',
                selectionBorderColor: 'black',
                selectionLineWidth: 2,
                width: rowCanvas.offsetWidth,
                height: rowCanvas.offsetHeight
        });
    }

    añadirTexto = () => {
        var fontW=this.fontWeight.current.checked?'bold':'normal';
        let texto = new fabric.Text(this.formInput.current.value, {fontSize: 100,underline: this.underL.current.checked, fontWeight: fontW, left: 0, top: 0, fill: `rgba(${ this.state.color.r }, ${ this.state.color.g }, ${ this.state.color.b }, ${ this.state.color.a })`});
        this.canvas.add(texto);
        this.state.listItems.push(texto);
        this.setState({itemsText: [...this.state.itemsText,texto.text]});
        this.formInput.current.value = "";
    }

    addImage = () => {
        var canvas = this.canvas;
        var reader = new FileReader();
        var este = this;
        reader.onload = function(event) {
            var imgObj = new Image();
            imgObj.src = event.target.result;
            imgObj.onload = function() {
                var image = new fabric.Image(imgObj);
                image.set({
                    left: 10,
                    top: 10,
                }).scale(0.3);
                console.log(image);
                este.state.listItems.push(image);
                este.setState({itemsText: [...este.state.itemsText,"Imagen"]});
                canvas.add(image);

            };
        };
        reader.readAsDataURL(this.addImageSrc.current.files[0]);
    }

    removeItem = (i) => {
        this.canvas.remove(this.state.listItems[i]);
        let listaTexto = this.state.listItems;
        listaTexto.splice(i,1);
        let listaItems = this.state.itemsText;
        listaItems.splice(i,1);
        this.setState({listItems: listaTexto, itemsText: listaItems});
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
                        <Row ref={this.rowCanvas}>
                            <canvas id="canvas"></canvas>
                        </Row>
                        <Row>
                            <Container>
                                <Row>
                                    <Col className="separation-col">
                                        <Form.Control type="text" name="name" ref={this.formInput} placeholder={'Escriba el texto que quiere añadir...'} />
                                        <Form.Group className="pers-text">
                                            <Form.Check label="Negrita" ref={this.fontWeight} />
                                            <Form.Check label="Subrayado" ref={this.underL} />
                                            <div style={ styles.swatch } onClick={ this.handleClick }>
                                                <div style={ styles.color } />
                                            </div>
                                            { this.state.displayColorPicker ? <div style={ styles.popover }>
                                            <div style={ styles.cover } onClick={ this.handleClose }/>
                                                <SketchPicker color={ this.state.color } onChange={ this.handleChange } />
                                            </div> : null }
                                            <Button onClick={() => this.añadirTexto()}>Añadir texto</Button>
                                        </Form.Group>
                                        <Form.Group className="pers-img">
                                            <Form.File id="imafeToAdd" ref={this.addImageSrc} label="Añadir Imagen" onChange={this.addImage}/>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <ListGroup variant="flush">
                                            {this.state.itemsText.length !== 0?<p>Elementos:</p>: null}
                                            {this.state.itemsText.map((item,i)=> 
                                            item !== null ?
                                                <ListGroup.Item key={item+" - "+i}>
                                                    {item}
                                                    <Button variant="danger" onClick={()=>this.removeItem(i)}>
                                                        Eliminar
                                                    </Button>
                                                </ListGroup.Item> : null
                                            )}
                                        </ListGroup>
                                        <Container className="btn-add-cart-container"><Button className="btn-add-cart"><img src={CarritoImg} alt="Carrito" width="18px" />Añadir al carrito</Button></Container>
                                    </Col>
                                </Row>
                            </Container>
                        </Row>
                    </Card.Body>
                </Card>
            </Container>
        )
    }
}
