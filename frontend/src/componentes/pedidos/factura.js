import React, { Component } from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import { PDFViewer } from '@react-pdf/renderer';
import Logo from '../../assets/images/logo.png';
import { Table, TableBody, TableCell, TableHeader, DataTableCell } from '@david.kucsai/react-pdf-table';

const styles = StyleSheet.create({
    page: {
      backgroundColor: 'white'
    },
    section: {
      marginHorizontal: 10,
      padding: 10,
      flexGrow: 1
    },
    header:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 15,
        padding: 10,
        marginTop: 10,
        borderBottom: '1px solid #ccc'
    },
    image: {
        width: '40%',
    },
    secondViewRow: {
        fontSize: '9px',
        justifyContent: 'flex-end',
                
    },
    noBold: {
        textDecoration: 'none',
        fontSize: '12px',
        marginBottom: '15px',
        marginHorizontal: 10,
        padding: 10
    },
    th: {
        backgroundColor: '#ccc',
        textAlign: 'right',
        padding: '.4em',
        fontSize: '10px'
    },
    td: {
        textAlign: 'right',
        fontSize: '10px',
        padding: '.4em'
    },
    firstTable: {
        marginBottom: '25em'
    },
    thS: {
        backgroundColor: '#ccc',
        fontSize: '10px',
        padding: '.4em'
    },
    tdS: {
        padding: '.4em',
        fontSize: '10px',
    },
    footer: {
        fontSize: '9px',
        margin: 10,
        padding: 10,
        bottom: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderTop: '1px solid #ccc'
    },
    firstSection: {
        marginHorizontal: 10,
        padding: 10,
        fontSize: '10px'
    },
    tdFirstSection: {
        padding: '.4em',
        fontSize: '8px',
        borderTop: '1px solid black'
    }
  });
  
  function MyDocument(props){
    var productos = props.order.products;
    for(let i = productos.length; i<16;i++){
        productos.push({});
    }
    var order = props.order;
    let fecha = new Date(order.updated_at);
    let fechaFormatted = fecha.getUTCDate() + "/" + (fecha.getMonth()+1) + "/" + fecha.getFullYear();
    return(
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.header}>
                    <View style={styles.secondViewRow}>
                        <Text>CupersnUsers S.L.</Text>
                        <Text>Avda Inventada, 202-203.</Text>
                        <Text>08020. Barcelona. Barcelona</Text>
                        <Text>CIF: H12345678</Text>
                    </View>
                    <Image src={Logo} style={styles.image} />
                </View>
                <View>
                    <Text style={styles.noBold}>Factura Simplificada</Text>
                </View>
                <View style={styles.firstSection}>
                    <Table data={[{first: ("Nº Factura: "+order.order_token), second: "Fecha: "+fechaFormatted, third: "Forma de pago: PayPal"}]} >
                        <TableBody style={{borderTop: '1px solid black'}}>
                            <DataTableCell getContent={(r) => r.first} style={styles.tdFirstSection} />
                            <DataTableCell getContent={(r) => r.second} style={styles.tdFirstSection} />
                            <DataTableCell getContent={(r) => r.third} style={styles.tdFirstSection} />
                        </TableBody>
                    </Table>
                </View>
                <View style={styles.section}>
                    <Table data={ productos } >
                        <TableHeader>
                            <TableCell style={styles.thS}>
                                Cod
                            </TableCell>
                            <TableCell style={styles.thS}>
                                Articulo
                            </TableCell>
                            <TableCell style={styles.thS}>
                                Precio
                            </TableCell>
                            <TableCell style={styles.thS}>
                                Unidades
                            </TableCell>
                            <TableCell style={styles.thS}>
                                Total
                            </TableCell>
                        </TableHeader>
                        <TableBody>
                            <DataTableCell getContent={(r) => r.product !== undefined ? r.product.id : " "} style={styles.tdS}/>
                            <DataTableCell getContent={(r) => r.product !== undefined ? r.product.name : " "} style={styles.tdS}/>
                            <DataTableCell getContent={(r) => r.product !== undefined ? r.product.price+" €" : ""} style={styles.td}/>
                            <DataTableCell getContent={(r) => r.quantity !== undefined ? r.quantity : ""} style={styles.td}/>
                            <DataTableCell getContent={(r) => r.quantity !== undefined && r.product.price !== undefined ? (r.product.price * r.quantity)+" €" : ""} style={styles.td}/>
                        </TableBody>
                    </Table>
                    <View style={styles.firstTable}></View>
                    <Table data={ [order] } >
                        <TableHeader>
                            <TableCell style={styles.th}>
                                SUBTOTAL
                            </TableCell>
                            <TableCell style={styles.th}>
                                IVA
                            </TableCell>
                            <TableCell style={styles.th}>
                                REC.EQUIV.
                            </TableCell>
                            <TableCell style={styles.th}>
                                TOTAL
                            </TableCell>
                        </TableHeader>
                        <TableBody>
                            <DataTableCell getContent={(r) => r.price !== undefined ? (r.price-(r.price*0.21)).toFixed(2) : ""} style={styles.td} />
                            <DataTableCell getContent={(r) => r.price !== undefined ? "(21%)"+(r.price*0.21).toFixed(2) : ""} style={styles.td} />
                            <DataTableCell getContent={(r) => ""} style={styles.td} />
                            <DataTableCell getContent={(r) => r.price !== undefined ? r.price+" €" : ""} style={styles.td} />
                        </TableBody>
                    </Table>
                </View>
                <View style={styles.footer}>
                    <View>
                        <Text>
                            - Inscrita en el Registro Mercantil de Barcelona.
                        </Text>
                        <Text>
                            - Periodo de devolución de 30 días desde la compra. Consulta las condiciones en nuestra web.
                        </Text>
                    </View>
                    <View>
                        <Text>1/1</Text>
                    </View>
                </View>
            </Page>
        </Document>)
  };
export default class factura extends Component {
    render() {
        return (
            <PDFViewer>
                <MyDocument order={this.props.order} />
            </PDFViewer>
        )
    }
}

