import React, { Component } from 'react';
import '../../assets/css/navNFooter.css';
import { Container } from 'react-bootstrap';

export default class Footer extends Component {
    render() {
        return(
            <Container className="Footer" fluid>
                <b>Cupers N Users © 2020</b>
            </Container>
        );
    }
}