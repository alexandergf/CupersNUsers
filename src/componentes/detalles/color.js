import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'


export default class color extends Component {
    render() {
        return (
            <Button className="color" style={{backgroundColor: this.props.color}}></Button>
        )
    }
}
