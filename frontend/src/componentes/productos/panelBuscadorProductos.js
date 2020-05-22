import React, { Component } from 'react';
import { Container, Col, Row, Card, Form } from 'react-bootstrap';
import { getCateorys } from '../../database/functions';

export default class panelBuscadorProductos extends Component {
    constructor(props){
        super(props);
        this.state = {
            paneles: [
                {nombre: "Categoría", elementos: []},
                {nombre: "Precio", elementos: ["< 5 €", "5 - 10 €", "> 10 €"]},
                {nombre: "Puntuación", elementos: ["5 estrellas", "3 - 5 estrellas", "< 3 estrellas"]},
                {nombre: "Stock", elementos: ["Disponible", "Sin Stock", "Fuera de Stock"]}
            ],
            seleccionado: [] 
        }
    }

    componentDidMount = () => {
        this.getCategories();
    }

    getCategories = async () => {
        let result = await getCateorys();
        let auxiliar = this.state.paneles;
        auxiliar[0].elementos.push("Todos los productos");
        result.map((res,index) => 
            auxiliar[0].elementos.push(res.name)
        );
        this.setState({paneles: auxiliar});
    }

    mirarSiSelecciona = (nombre, fila, index) => {
        var elemento = {name: nombre,fil: fila, idRow: index};
        var select = this.state.seleccionado;
        var mirar = select.filter(sel => sel.name === elemento.name && sel.fil === elemento.fil);
        if(mirar.length !== 0){
            for (let index = 0; index < select.length; index++) {
                if(select[index].name === mirar[0].name && select[index].fil === mirar[0].fil){
                    select.splice( index, 1 );
                }
            }            
        }else{
            select.push(elemento);
        }
        this.setState({seleccionado: select});
        this.props.otraForma(select);
    }

    render() {
        const elementosPanel = [];
        const paneles = this.state.paneles;
        for(let i = 0; i < paneles.length; i++){
            elementosPanel.push(
                <Row key={i+"-row-elementosPanel"}>
                    <Container fluid className="elemento-panel">
                        <Card>
                            <Card.Title>{paneles[i].nombre}</Card.Title>
                            <Card.Body>
                                <Form>
                                    <Form.Group controlId={paneles[i].nombre+"-checkbox"}>
                                        {paneles[i].elementos.map((fila,index) => {
                                            return (
                                                <Form.Check key={"fila"+index} type="checkbox" label={fila} onClick={() => this.mirarSiSelecciona(paneles[i].nombre,fila,index)} />
                                            );
                                        })}
                                    </Form.Group>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Container>
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
