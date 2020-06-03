import React, { Component } from 'react';
import { Container, Card } from 'react-bootstrap';
import Pedido from './pedido';
import { getOrders } from '../../database/functions';

export default class pedidos extends Component {
    constructor(props){
        super(props);
        this.state = {
            orders: [],
            loading: true
        }
        this.timerID = null;
        this._mount = false;
    }

    componentDidMount = () => {
        this.getArrayOrders();
        this.useEffect();
    }

    getArrayOrders = async () => {
        let result = await getOrders();
        this.setState({orders: result})
    }

    redireccionarLink = (id) => {
        this.props.red(id);
    }

    montarOrders = (order, index) => {
        let status = "";
        let fecha = new Date(order.updated_at);
        let fechaFormatted = fecha.getUTCDate() + "/" + (fecha.getMonth()+1) + "/" + fecha.getFullYear();
        fecha.setDate(fecha.getDate() + 5 );
        let fechaEntrega = "Sin fecha prevista";
        let cantidad = 0;
        order.products.map((product, index) =>
            cantidad += product.quantity
        )
        
        switch (order.status_id) {
            case 1:
                status = "No pagado";
                break;
            case 2:
                status = "Pagado";
                fechaEntrega = fecha.getUTCDate()+ "/" + (fecha.getMonth()+1) + "/" + fecha.getFullYear();
                break;
            case 3:
                status = "Cancelado";
                break;
            default:
                break;
        }
        return (<Pedido 
                    fecha={fechaFormatted} 
                    unidades={cantidad} 
                    numPedido={order.order_token} 
                    fechaEntrega={fechaEntrega} 
                    estado={status} 
                    key={"order - "+index} 
                    productos={order.products} 
                    totalCash={order.price}    
                    redirec={this.redireccionarLink.bind(this)}
                />);
    }

    useEffect = () => {
        this.timerID = setTimeout(
            function() {
                if(this._mount){
                    this.setState({loading: false});
                }
                
            }
            .bind(this),
            5000
        );
    }

    componentWillUnmount = () => {
        this._mount = false;
        clearTimeout(this.timerID);
    }

    render() {
        let arrayOrders = this.state.orders.map((order, index) => 
            this.montarOrders(order, index)
        );
        var zeroResult = <Container sm={4}> <p>No has realizado pedidos aún.</p></Container>;
        var cargando = this.state.loading ? <Container sm={4}> <p>Cargando...</p></Container> : zeroResult;
        return (
            <Container fluid className="pedidos-perfil">
                <Card>
                    <Card.Title className="especial-non-border"><h3 className="pedidos-title">Pedidos y facturas</h3></Card.Title>
                    <Card.Body>
                        {this.state.orders.length !== 0 ? arrayOrders : cargando}
                    </Card.Body>
                </Card>
            </Container>
        )
    }
}
