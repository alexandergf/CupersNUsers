import React, { Component } from 'react';
import { Container, Card } from 'react-bootstrap';
import Pedido from './pedido';
import { getOrders } from '../../database/functions';

export default class pedidos extends Component {
    constructor(props){
        super(props);
        this.state = {
            orders: []
        }
    }

    componentDidMount = () => {
        this.getArrayOrders();
    }

    getArrayOrders = async () => {
        let result = await getOrders();
        this.setState({orders: result})
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
                />);
    }

    render() {
        let arrayOrders = this.state.orders.length !== 0 ? this.state.orders.map((order, index) => 
            this.montarOrders(order, index)
        ) : <Container>Aun no has realizado ningún pedido.</Container>;
        return (
            <Container fluid className="pedidos-perfil">
                <Card>
                    <Card.Title className="especial-non-border"><h3 className="pedidos-title">Pedidos y facturas</h3></Card.Title>
                    <Card.Body>
                        {arrayOrders}
                    </Card.Body>
                </Card>
            </Container>
        )
    }
}
