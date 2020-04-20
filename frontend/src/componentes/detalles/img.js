import React, { Component } from 'react'

export default class img extends Component {
    render() {
        return (
            <div className="imagen">
                <img src={this.props.src} alt={this.props.descripcio} />
            </div>
        )
    }
}
