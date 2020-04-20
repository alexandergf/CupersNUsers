import React, { Component } from 'react'


export default class color extends Component {
    render() {
        return (
            <div className="color" style={{backgroundColor: this.props.color}}></div>
        )
    }
}
