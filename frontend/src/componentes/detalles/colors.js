import React, { Component } from 'react';
import Color from './color';

export default class colors extends Component {
    render() {
        return (
            <div className="colors">
                <span>Colors: </span>
                <Color color="red" />
                <Color color="blue" />
                <Color color="yellow" />
                <Color color="green" />
                <Color color="white" />
            </div>
        )
    }
}
