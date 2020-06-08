import React, { Component } from 'react';
import { Container, Card, Button, Form, Row, Col, ListGroup, Modal, InputGroup } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { fabric } from 'fabric';
import { SketchPicker } from 'react-color';
import reactCSS from 'reactcss';
import '../../assets/css/personalizarTaza.css';
import CarritoImg from '../../assets/images/carrito.png';
import { cartItem } from '../../database/functions';

function LogIn(props){
    return (
        <>
            <Modal show={props.showLogin} onHide={() => props.onHide()} animation={false}>
                <Modal.Header closeButton>
                <Modal.Title>Ups</Modal.Title>
                </Modal.Header>
                <Modal.Body>{props.errorMessage}</Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={() => props.onHide()}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={() => props.redirect}>
                        Logearse
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

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
            },
            showLogin: false,
            redirectLogin: false,
            errorMessage: "",
            cont: 1,
            desabilitarResta: true
        }
        this.formInput = React.createRef();
        this.addImageSrc = React.createRef();
        this.fontWeight = React.createRef();
        this.underL = React.createRef();
        this.rowCanvas = React.createRef();
        this.canvas = null;
        this.sumar = this.sumar.bind(this);
        this.restar = this.restar.bind(this);
    }

    componentDidMount = () => {
        this.montarCanvas();
    }

    sumar = () =>{
        this.setState(() => ({
            cont: this.state.cont+1,
            desabilitarResta: false
        }));
    }

    restar = () =>{
        if(this.state.cont !== 1){
            this.setState(() => ({
                cont: this.state.cont-1
            }));
        }else{
            this.setState(() => ({
                desabilitarResta: true
            }));
        }
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

    addToCart = async() => {
        var json = this.canvas.toJSON();
        let result = await cartItem(36, this.state.cont);
        if(result[1] === false){
            this.props.callback(result[0]);
        }else{
            this.setState({
                errorMessage: "Para añadir a la lista de deseos tienes que estar logeado.",
                showLogin: result[1]
            })
        }
        //console.log(json);
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
        if(this.state.redirectLogin === true){
            return <Redirect to="/Login" />
        }
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
                                            <p>Elementos:</p>
                                            {this.state.itemsText.length === 0?"No se han añadido elementos todavía.": null}
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
                                        <Container className="btn-add-cart-container">
                                            <InputGroup size="sm">
                                                <InputGroup.Prepend>
                                                    <Button variant="outline-secondary" onClick={this.restar} disabled={this.state.desabilitarResta}>-</Button>
                                                </InputGroup.Prepend>
                                                <InputGroup.Text>{this.state.cont}</InputGroup.Text>
                                                <InputGroup.Append>
                                                    <Button variant="outline-secondary" onClick={this.sumar}>+</Button>
                                                </InputGroup.Append>
                                            </InputGroup>
                                            <Button className="btn-add-cart" onClick={this.addToCart}>
                                                <img src={CarritoImg} alt="Carrito" width="18px" />
                                                Añadir al carrito
                                            </Button>
                                            <LogIn 
                                                showLogin={this.state.showLogin} 
                                                onHide={() => this.setState({showLogin: false})} 
                                                errorMessage={this.state.errorMessage} 
                                                redirect={() => this.setState({redirectLogin: true})}
                                            />
                                        </Container>
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
