import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Panel from './panelBuscadorProductos';
import CProductos from './contenedorProductos';
import '../../assets/css/productos.css';
import { Redirect } from 'react-router-dom';
import { getProductByName } from '../../database/functions';

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
            search: this.props.match.params.searchWord
        })
        this.handleOnChange();
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
                        <Panel />
                    </Col>
                    <Col xs={9} md={10}>
                        <CProductos productosBy={this.state.products} categoria={"Busqueda: "+(this.state.search !== "" ? this.state.search : "Todos los productos")} />
                    </Col>
                </Row>
            </Container>
        )
    }
}
