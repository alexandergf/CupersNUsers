import React, { Component } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import Producto from './producto';
import { Link } from 'react-router-dom';

export default class contenedorProductos extends Component {
    constructor(props){
        super(props);
        this.state = {
            loading: true, 
            products: []
        };
        this.timerID = null;
        this._mount = false;
    }
    
    componentDidMount = () => {
        this._mount = true;
        this.setState({products: this.props.productosBy});
        this.useEffect();
    }

    componentDidUpdate = () => {
        if(this.props.productosBy !== this.state.products){
           this.setState({products: this.props.productosBy, loading: true});
           this.useEffect();
        }
    }

    useEffect = () => {
        this.timerID = setTimeout(
            function() {
                if(this._mount){
                    this.setState({loading: false});
                }
                
            }
            .bind(this),
            3000
        );
    }

    componentWillUnmount = () => {
        this._mount = false;
        clearTimeout(this.timerID);
    }
    
    

    render() {
        var productosRender = this.props.productosBy.map((product,index) => 
            <Col sm={4} key={product.id+"-col-producto"}>
                <Link to={"/Detail/"+product.id}><Producto img={product.pics} title={product.name} precio={product.price} id={product.id} key={product.id+"-producto"} /></Link>
            </Col>
        )
        var zeroResult = <Col sm={4}> <p>No se han encontrado resultados.</p></Col>;
        var cargando = this.state.loading ? <Col sm={4}> <p>Cargando...</p></Col> : zeroResult;
        return (
            <Card className="contenedor-productos">
                <Card.Title><h3>{this.props.categoria === "Todos" ? "Todos los productos" : this.props.categoria}</h3></Card.Title>
                <Card.Body>
                    <Row>
                        {this.props.productosBy.length !== 0 ? productosRender : cargando }
                    </Row>
                </Card.Body>
            </Card>
        )
    }
}
