import React, { Component } from 'react'
import { connect } from 'react-redux';
import { generateBoard } from '../redux/slice/dashBoard'
import Card from './Card';
import Prompt from './Prompt';
import style from './style.css'

class Dashboard extends Component {

    constructor(props){
        super(props);
        this.state = {
            size: props.size,
            imgNum: props.num,
            sideLength: 0,
            playing: true,
            flipped: [],
            allCards: [],
        }
        this.getWidth(Math.sqrt(parseInt(this.state.size)));
    }

    componentDidMount() {
        this.initData();
    }

    // 初始化面板数据
    initData = () => {
        this.props.generateBoard({ numOfCards: parseInt(this.state.imgNum), size: parseInt(this.state.size) });
    }

    getWidth(imgNum){
        this.state.sideLength = imgNum * 120;
    }

    renderCards = () =>{
        const { dashBoard: { cardList = [] } } = this.props;
        return (cardList || []).map((item, index)=>{
          const { img, type } = item;
          let newCard = <Card key={index} img={img} type={type} position={index} />;
          this.state.allCards.push(newCard);
          return newCard;
        })
    }

    flipCard = (data) =>{
        const { position, img, type } = data;
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
        const { sideLength, playing } = this.state;
        const { dashBoard: { cardList = [] } } = this.props;
        return (
        <div className='dashboard-wrapper'>
            <div className='dashboard' style={{ width: sideLength, height: sideLength }}>
                {playing ? this.renderCards() : <Prompt />}
            </div>
        </div>

        )
    }
}
export default connect(
    state => state,
    {
        generateBoard,
    }
)(Dashboard);