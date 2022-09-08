import React from 'react';
import ReactDOM from 'react-dom';
import style from './style.css'
import { connect } from 'react-redux';
import { flipAction } from '../redux/actions/CardActions';
import { storeFlippedAction, matchAction } from '../redux/actions/BoardAction';

class Card extends React.Component {

    constructor(props){
        super(props);
        this.state={
            position:props.position,
            type:props.type,
            img:props.img,
            img0 : require('../img/cover.png'),
            matched : false,
            flipped : false,
        }
    }  

    onClick = () =>{
        if ((!this.state.flipped)&&(!this.state.matched)){
            this.props.flipAction({
                position:this.state.position,
                img:this.state.img,
                img0 : this.state.img0,
                matched : false,
                flipped : false
            })
            console.log(this.props)
            this.props.storeFlippedAction({
                position:this.state.position,
                img:this.state.img,
                img0 : this.state.img0,
                matched : false,
                flipped : false,
            })
            this.props.matchAction()
        }
        return
    }

    render() {
        return(
            <div className='flipper-container' onClick={this.onClick}>
                <div  className='card'    
                      style={{backgroundImage:`url('${this.state.img0}')`}}>
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
        flipAction,
        storeFlippedAction,
        matchAction
    }
)(Card)