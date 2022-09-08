import React from 'react';
import { connect } from 'react-redux';
import { match } from '../redux/slice/dashBoard';
import style from './style.css'

class Card extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            position: props.position,
            type: props.type,
            // img: props.img,
            img: require(`../img/${props.img}.png`),
            img0 : require('../img/cover.png'),
            matched : false,
            flipped : false,
        }
    }

    onClick = () =>{
        const { flipped, matched } = this.state;
        const { dashBoard: { currentFlippedList = [] } } = this.props;
        if (!flipped && !matched){
            const currentCardInfo = {
                position: this.state.position,
                img: this.state.img,
                img0: this.state.img0,
                matched: false,
                flipped: false
            }
            if(currentFlippedList.length < 2){
                this.props.match(currentCardInfo);
                this.setState({
                    flipped: true,
                })
            }
        }
    }

    render() {
        const { dashBoard, dashBoard: { currentFlippedList = [] } } = this.props;
        const { img, img0, flipped } = this.state;
        const needRecover = currentFlippedList.length === 1;

        return(
            <div className='flipper-container' onClick={this.onClick}>
                <div className='card' style={{ backgroundImage: `url('${flipped ? img : img0}')` }} />
            </div>
        )
    }
}

export default connect(
  state => state,
  { match }
)(Card)