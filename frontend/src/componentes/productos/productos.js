import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Panel from './panelBuscadorProductos';
import CProductos from './contenedorProductos';
import '../../assets/css/productos.css';
import { instance } from '../../database/config';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
export default class productos extends Component {
    constructor(props){
        super(props);
        this.state = {
            products: [],
            search: ""
        }
        this.handleOnChange = this.handleOnChange.bind();
    }

    componentDidMount = () => {
        
        this.setState({
            search: this.props.searchWords
        })
        this.handleOnChange();
    }

    componentDidUpdate = () => {
        if(this.props.searchWords !== this.state.search){
            this.setState({
                search: this.props.searchWords
            })
            this.handleOnChange();
        }
        
        if(this.props.log){
            this.props.logOut(false);
        } 
        
    }

    handleOnChange = () => {
        let direccion = this.props.searchWords !== "" ? "/product/getByName" : "/product/getAll";
        axios.post(direccion, {"name": this.props.searchWords}, instance)
        .then((response) => {
            this.setState({
                products: response.data.data
            })
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    getStateItem = (activo, productId) => {
        this.props.itemDetailInfo(activo,productId);
    }

    render() {
        if(this.props.log){
            return(<Redirect to="/" />)
        } 
        return (
            <Container fluid className="main-productos">
                <Row>
                    <Col xs={3} md={2}>
                        <Panel />
                    </Col>
                    <Col xs={9} md={10}>
                        <CProductos callback={this.getStateItem.bind(this)} productosBy={this.state.products} categoria={"Busqueda: "+(this.props.searchWords !== "" ? this.props.searchWords : "Todos los productos")} />
                    </Col>
                </Row>
            </Container>
        )
    }
}
