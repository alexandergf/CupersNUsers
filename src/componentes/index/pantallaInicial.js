import React, { Component } from 'react';
import { Container, Row } from 'react-bootstrap';
import Productos from '../productos/contenedorProductos';
import { getProductByCategory } from '../../database/functions';

export default class pantallaInicial extends Component {
    constructor(props){
        super(props);
        this.state = {
            productos: [],
            categoryName: "",
            idCat: -1
        }
    }
    componentDidMount = () => {
        this.refreshProducts();
    }

    componentDidUpdate = () => {
        if(this.props.match.params.idCat !== this.state.idCat){
            this.refreshProducts();
        }
    }

    refreshProducts = () => {
        this.getProd(this.props.match.params.idCat, this.props.match.params.nameCat);
    }

    getProd = async (id, nameCategory) => {
        if(this.props.match.params.idCat === undefined || this.props.match.params.idCat === null){
            this.setState({productos: await getProductByCategory(-1), categoryName: "Todos los productos", idCat: undefined});
        }else{
            this.setState({productos: await getProductByCategory(id), categoryName: nameCategory, idCat: id});
        }
    }

    render() {
        return (
            <Container fluid>
                <Row className="contenedor-productos-row">
                    <Productos categoria={this.state.categoryName} productosBy={this.state.productos} />
                </Row>                    
            </Container>
        )
    }
}
