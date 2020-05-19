import React, { Component } from 'react';
import { Container, Button, Card, Table, Image, Modal} from 'react-bootstrap';
import ImagenTest from '../../assets/images/prueba.jpg';
import axios from 'axios';
import { instance } from '../../database/config';

export default class articulos extends Component {
    constructor(props){
        super(props);
        this.state = {
            totalPrecio: 0,
            show: false,
            failRemove: false,
            remove: false
        }
    }

    calculoTotales = (productos) => {
        let quantity = 0;
        for(let i = 0; i < productos.length; i++){
            quantity += productos[i].quantity;
        }

        return quantity;
    }

    removeItemsCart = () => {
        this.setState({show: true})
    }

    removeOneItem = (id) => {
        let setState = this.setState;
        let props = this.props;
        axios.post('/cart/toggleProduct', {
            "product_id": id,
            "quantity": 0
        }, instance)
          .then(function (response) {
              console.log(response);
            props.callback(response.data.data);
          })
          .catch(function (error) {
            setState({failRemove: true, show: false});
          });
    }

    totalRemove = () => {
        let resultRemove = this.resultRemove;
        axios.post('/cart/deleteAll', {}, instance)
          .then(function (response) {
            resultRemove(true);
          })
          .catch(function (error) {
            resultRemove(false);
          });  
    }

    resultRemove = (value) => {
        let prod = [];
        if(value){
            this.setState({remove: true, show: false});
        }else{
            this.setState({failRemove: true, show: false});
        }
        this.props.callback(prod);
    }

    render() {
        const modalRemove = <Modal show={this.state.show} onHide={() => this.setState({show: false})}>
            <Modal.Header closeButton>
            <Modal.Title>Confirmación</Modal.Title>
            </Modal.Header>
            <Modal.Body>Seguro que quieres borrar todos los articulos de la cesta?</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => this.setState({show: false})}>
                    Cancelar
                </Button>
                <Button variant="primary" onClick={() => this.totalRemove()}>
                    Si, estoy de acuerdo
                </Button>
            </Modal.Footer>
        </Modal>;

        const errorRemove = <Modal show={this.state.failRemove} onHide={() => this.setState({failRemove: false})}>
            <Modal.Header closeButton>
            <Modal.Title>Ups</Modal.Title>
            </Modal.Header>
            <Modal.Body>Algo no ha ido bien.</Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={() => this.setState({failRemove: false})}>
                    Vale
                </Button>
            </Modal.Footer>
        </Modal>;

        const acceptRemove = <Modal show={this.state.remove} onHide={() => this.setState({remove: false})}>
            <Modal.Header closeButton>
            <Modal.Title>Bien</Modal.Title>
            </Modal.Header>
            <Modal.Body>La cesta se ha vaciado con exito.</Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={() => this.setState({remove: false})}>
                    Vale
                </Button>
            </Modal.Footer>
        </Modal>;

        const tabla =  this.props.products.map((product,index) => 
            <tr key={"table-row-"+index}>
                <td><Image src={product.product.pics[0] !== undefined ? product.product.pics[0].pic : ImagenTest} roundedCircle width="72em" height="72em" />{product.product.name}</td>
                <td>{product.product.price}</td>
                <td>{product.quantity}</td>
                <td>{product.product.price.toFixed(2) * product.quantity} €</td>
                <td><Button className="btn-danger" onClick={() => this.removeOneItem(product.id)}>Eliminar</Button></td>
            </tr>
        )

        let total = this.calculoTotales(this.props.products);
        
        return (
            <Container fluid className="articulos-carrito">
                <Card>
                    <Card.Title>
                        <h4>({total}) Artículos en tu carrito</h4>
                    </Card.Title>
                    <Card.Body>
                        <Table responsive>
                            <thead>
                                <tr>
                                    <th>ARTICULO</th>
                                    <th>PRECIO</th>
                                    <th>UNIDADES</th>
                                    <th>TOTAL</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {tabla}
                            </tbody>
                        </Table>
                    </Card.Body>
                    <Card.Footer>
                        <Button className="btn-vaciar-cesta" onClick={() => this.removeItemsCart()}
                            disabled={this.props.products.length === 0 ? true : false}
                            >Vaciar cesta</Button>
                        <Button className="btn-seguir-comprando">Seguir comprando</Button>
                    </Card.Footer>
                </Card>
                {modalRemove}
                {errorRemove}
                {acceptRemove}
            </Container>
        )
    }
}
