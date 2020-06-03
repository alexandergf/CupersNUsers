import React, { Component } from 'react'
import { Image } from 'react-bootstrap';

export default class img extends Component {
    render() {
        return (
            <div className="imagen">
                <Image src={this.props.src} alt={this.props.descripcio} thumbnail />
            </div>
        )
    }
}
