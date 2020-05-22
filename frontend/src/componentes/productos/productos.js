import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Panel from './panelBuscadorProductos';
import CProductos from './contenedorProductos';
import '../../assets/css/productos.css';
import { Redirect } from 'react-router-dom';
import { getProductByName, getProductByCategory } from '../../database/functions';

export default class productos extends Component {
    constructor(props){
        super(props);
        this.state = {
            products: [],
            search: "",
            allProducts: []
        }
        this.handleOnChange = this.handleOnChange.bind(this);
        this.changeProducts = this.changeProducts.bind(this);
    }

    componentDidMount = () => {
        this.setState({
            search: this.props.match.params.searchWord
        })
        this.handleOnChange();
        this.allProducts();
    }

    componentDidUpdate = () => {
        if(this.props.match.params.searchWord !== this.state.search){
            this.setState({
                search: this.props.match.params.searchWord
            })
            this.handleOnChange();
        }
        
        if(this.props.log){
            this.props.logOut(false);
        } 
    }

    changeProducts = (filter) => {
        let prod = this.state.allProducts;
        let newProducts = [];
        if(filter.length === 0){
            this.setState({products: this.state.allProducts})
        }else{
            for (let index = 0; index < filter.length; index++) {
                switch(filter[index].name) {
                    case 'Categoría':
                        prod.filter(pr => pr.id === 1).map(pr=>(newProducts.push(pr)));
                        break;
                    case 'Precio':
                        prod = (this.filtraPorPrecio(prod,filter[index]));
                        break;
                    case 'Puntuación':
        
                        break;
                    case 'Stock':
                        prod = (this.filtrarPorStock(prod,filter[index]));
                        break;
                    default:
                        prod = prod;
                        break;
                }
                
            }
            this.setState({products: prod})
        }        
    }

    filtraPorPrecio = (prod, filter) => {
        let newArray = [];
        switch(filter.fil){
            case '< 5 €':
                prod.filter(pr => pr.price < 5).map(pr=>(newArray.push(pr)));
                break;
            case '5 - 10 €':
                prod.filter(pr => pr.price >= 5 && pr.price <= 10).map(pr=>(newArray.push(pr)));
                break;
            case '> 10 €':
                prod.filter(pr => pr.price > 10).map(pr=>(newArray.push(pr)));
                break;
            default:
                newArray = prod;
                break;
        }

        return (newArray);
    }

    filtrarPorStock = (prod, filter) => {
        let newArray = [];
        switch(filter.fil){
            case 'Disponible':
                prod.filter(pr => pr.price >= 1).map(pr=>(newArray.push(pr)));
                break;
            case 'Sin Stock':
                prod.filter(pr => pr.stock == 0).map(pr=>(newArray.push(pr)));
                break;
            case 'Fuera de Stock':
                prod.filter(pr => pr.stock == null || pr.stock == undefined).map(pr=>(newArray.push(pr)));
                break;
            default:
                newArray = prod;
                break;
        }

        return (newArray);
    }

    allProducts = async () => {
        let result = await getProductByCategory(-1);
        this.setState({
            allProducts: result
        })   
    }

    /*
        {nombre: "Categoría", elementos: ["Todas", "Tazas de plástico", "Tazas de acero", "Tazas everywhere"]},
                {nombre: "Precio", elementos: ["< 5 €", "5 - 10 €", "< 10 €"]},
                {nombre: "Puntuación", elementos: ["5 estrellas", "3 - 5 estrellas", "< 3 estrellas"]},
                {nombre: "Stock", elementos: ["Disponible", "Sin Stock", "Fuera de Stock"]}
    */

    handleOnChange = async () => {
        let result = await getProductByName(this.props.match.params.searchWord);
        if(result[1] === false){
            this.setState({
                products: result[0]
            })
        }else{
            console.log("Error");
        }
    }
    
    render() {
        if(this.props.log){
            return(<Redirect to="/" />)
        } 
        return (
            <Container fluid className="main-productos">
                <Row>
                    <Col xs={3} md={2}>
                        <Panel otraForma={this.changeProducts.bind(this)} />
                    </Col>
                    <Col xs={9} md={10}>
                        <CProductos productosBy={this.state.products} categoria={"Busqueda: "+(this.state.search !== "" ? this.state.search : "Todos los productos")} />
                    </Col>
                </Row>
            </Container>
        )
    }
}
