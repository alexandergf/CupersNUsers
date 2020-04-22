import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import { BsStarHalf, BsStarFill, BsStar } from 'react-icons/bs';

export default class estrellas extends Component {
    constructor(props){
        super(props);
        this.state = {
            numeroStars: this.props.numStars
        }
    }
    render() {
        const estrellas = [];
        for(let i = 1; i<=5;i++){
            if(parseInt(this.state.numeroStars)>=i){
                estrellas.push(<BsStarFill />);
            }else if(parseInt(this.state.numeroStars)===(i-1) && parseFloat(this.state.numeroStars)>(i-0.5)){
                estrellas.push(<BsStarHalf />);
            }else{
                estrellas.push(<BsStar />);
            }
        }    
        return (
            <div style={{color: "#FFDC19"}}>
                {estrellas}
            </div>
        )
    }
}
