import React, { Component } from 'react'

export default class detalleTitle extends Component {
    render() {
        return (
            <div className="title">
                <h3>{this.props.name}</h3><button className="heartToBasket"></button>
            </div>
        )
    }
}
