import React, { Component } from 'react';
import {Container,Row,Col} from 'react-bootstrap';
import Panel from './panelBuscadorProductos';
import CProductos from './contenedorProductos';
import '../../assets/css/productos.css';
import { instance } from '../../database/config';
import axios from 'axios';

export default class productos extends Component {
    constructor(props){
        super(props);
        this.state = {
            products: [],
        }
    }

    componentDidMount = () => {
        console.log("Busqueda: "+this.props.searchWords);
        axios.post(instance.baseURL+"/product/getByName", {params:{name: this.props.searchWords}}, instance)
        .then((response) => {
            this.setState({
                products: response.data.data
            })
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    render() {
        return (
            <Container fluid className="main-productos">
                <Row>
                    <Col xs={3} md={2}>
                        <Panel />
                    </Col>
                    <Col xs={9} md={10}>
                        <CProductos productosBy={this.state.products} categoria={"Busqueda: "+this.props.searchWords} totalProductos="5" />
                    </Col>
                </Row>
            </Container>
        )
    }
}
