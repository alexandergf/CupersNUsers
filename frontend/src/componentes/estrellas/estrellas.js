import React, { Component } from 'react';
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
                estrellas.push(<BsStarFill key={i+"-star"} />);
            }else if(parseInt(this.state.numeroStars)===(i-1) && parseFloat(this.state.numeroStars)>(i-0.5)){
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
