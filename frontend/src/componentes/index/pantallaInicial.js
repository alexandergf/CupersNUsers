import React, { Component } from 'react';
import { Container, Col, Row} from 'react-bootstrap';
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
        this._isMounted = false;
    }
    componentDidMount = () => {
        this._isMounted = true;
        this.refreshProducts();
    }

    componentDidUpdate = () => {
        if(this.props.match.params.idCat !== this.state.idCat){
            this.refreshProducts();
        }
    }

    refreshProducts = () => {
        if(this.props.match.params.idCat === undefined || this.props.match.params.idCat === null){
            this.getProd(-1, "Todos los productos");
        }else{
            this.getProd(this.props.match.params.idCat, this.props.match.params.nameCat);
        }
    }

    getProd = async (id, nameCategory) => {
        if(this._isMounted) this.setState({productos: await getProductByCategory(id), categoryName: nameCategory, idCat: id});
    }

    componentWillUnmount = () => {
        this._isMounted = false;
    }

    render() {
        return (
            <Container fluid>
                <Row>
                    <Col>
                        <Row>
                            <Productos categoria={this.state.categoryName} productosBy={this.state.productos} />
                        </Row>
                    </Col>
                </Row>
            </Container>
        )
    }
}
