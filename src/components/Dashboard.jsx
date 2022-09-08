import React, { Component } from 'react'
import style from './style.css'
import { connect } from 'react-redux';
import Card from './Card';
import { generateAction } from '../redux/actions/BoardAction';
import Prompt from './Prompt';

class Dashboard extends Component {

    constructor(props){
        super(props);
        this.state={
            size:props.size,
            imgNum:props.num,
            sideLength:0,
            playing:true,
            flipped:[],
            allCards:[]
        }
        this.getWidth(Math.sqrt(parseInt(this.state.size)))
        this.props.generateAction(
            {   numOfCards:parseInt(this.state.imgNum),
                size:parseInt(this.state.size)
            }
        )    
    }

    getWidth(imgNum){
        this.state.sideLength=imgNum*120;
    }


    renderCards=(data)=>{
        return data.map((item,index)=>{
          const {img, type}=item;
          let newCard = <Card img={img} type={type} position={index}></Card>;
          this.state.allCards.push(newCard)
          return newCard
        })
    }

    flipCard=(data)=>{
        const {position, img, type} = data;
        if (this.state.flipped.length<2){
            this.state.flipped.push(data)
            if (type==='coin')
                return require('../img/coin-'+img+'.png')
            if (type==='snack')
                return require('../img/snack-'+img+'.png')
            if (type==='image')
                return require('../img/'+img+'.png')
        }
    }

    render() {
        console.log(this.props.res.boardReducer)
        return (
        <div className='dashboard-wrapper'>
            <div className='dashboard' 
                style={{width:`${this.state.sideLength}px`, height:`${this.state.sideLength}px`}}>
                {
                    
                    this.state.playing? this.renderCards(this.props.res.boardReducer) : <Prompt />
                }

            </div>
        </div>

        )
    }
}
export default connect(
    state => ({
      res: state
    }),
    {
        generateAction,

    }
  
  )(Dashboard)