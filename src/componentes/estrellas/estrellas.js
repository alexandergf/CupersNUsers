import React, { Component } from 'react';
import { BsStarHalf, BsStarFill, BsStar } from 'react-icons/bs';

export default class estrellas extends Component {
    render() {
        const estrellas = [];
        for(let i = 1; i<=5;i++){
            if(parseInt(this.props.numStars)>=i){
                estrellas.push(<BsStarFill key={i+"-star"} />);
            }else if(parseInt(this.props.numStars)===(i-1) && parseFloat(this.props.numStars)>(i-0.5)){
                estrellas.push(<BsStarHalf key={i+"-star"} />);
            }else{
                estrellas.push(<BsStar key={i+"-star"} />);
            }
        }    
        return (
            <div style={{color: "#FFDC19"}}>
                {estrellas}
            </div>
        )
    }
}
