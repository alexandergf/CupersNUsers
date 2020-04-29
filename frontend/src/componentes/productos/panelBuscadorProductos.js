import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ElementoPanel from './elementoPanel';

export default class panelBuscadorProductos extends Component {
    constructor(props){
        super(props);
        this.state = {
            paneles: [
                {nombre: "Categoría", elementos: ["Todas", "Tazas de plástico", "Tazas de acero", "Tazas everywhere"]},
                {nombre: "Precio", elementos: ["< 5 €", "5 - 10 €", "< 10 €"]},
                {nombre: "Puntuaciónn", elementos: ["5 estrellas", "3 - 5 estrellas", "< 3 estrellas"]},
                {nombre: "Stock", elementos: ["Disponible", "Sin Stock", "Fuera de Stock"]}
            ] 
        }
    }
    render() {
        const elementosPanel = [];
        const paneles = this.state.paneles;
        for(let i = 0; i < paneles.length; i++){
            elementosPanel.push(
                <Row key={i+"-row-elementosPanel"}>
                    <ElementoPanel name={paneles[i].nombre} filas={paneles[i].elementos} key={i+"-elementosPanel"} />
                </Row>
            );
        }
        return (
            <Container fluid className="panel-productos">
                <Col>
                    {elementosPanel}
                </Col>
            </Container>
        )
    }
}
