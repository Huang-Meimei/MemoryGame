import { createSlice } from '@reduxjs/toolkit';
const lodash = require('lodash');

const numOfSnackType = 1;
const numOfCoinType = 1;

export const dashBoardSlice = createSlice({
    name: 'dashBoard',
    initialState: {
        cardList: [], // 卡牌列表
        currentFlippedList: [], // 当前翻出的牌
    },
    reducers: {
        // 生成面板数据
        generateBoard: (state, action) => {
            const { numOfCards, size } = action.payload;
            let cards = [];
            let remainings = size-numOfCards;
            let numOfSnack = Math.random() * (remainings/2);
            if (numOfSnack%2 != 0) numOfSnack += 1;
            remainings -= numOfSnack;
            let numOfCoin = Math.random()*(remainings/2);
            remainings -=numOfCoin;
            for (let i = 0; i < numOfSnack; i++){
                let snackType = Math.floor(Math.random()*numOfSnackType+1);
                cards.push({
                    type: "snack",
                    img: 'snack-'+snackType+''
                })
            }
            for (let i=0; i<numOfCards; i++){
                cards.push({
                    type: "image",
                    img: i+''
                });
            }
            for (let i=0; i<numOfCoin; i++){
                let coinType = Math.floor(Math.random()*numOfCoinType+1);
                cards.push({
                    type: "coin",
                    img: 'coin-'+coinType+''
                })
            }
            for (let i=0; i<remainings; i++){
                cards.push({
                    type: "blank",
                    img: 'blank'
                })
            }
            for (let i=0; i<numOfCards; i++){
                cards.push({
                    type: "image",
                    img: i+''
                });
            }
            // return shuffleCards(cards);
            // state.cardList = [...shuffleCards(cards)];
            return {
                ...state,
                cardList: [...shuffleCards(cards)],
            }
        },
        // 翻排回调
        match: (state, action, x) =>{
            const { currentFlippedList = [] } = state;
            const length = currentFlippedList.length;
            let newArray = [];
            if(length < 2){
                newArray = currentFlippedList.concat([{ ...action.payload }]);
            }
            if(length === 1){
                // 对比操作
                newArray = [];
            }
            return {
                ...state,
                currentFlippedList: [...newArray],
            }
        }
    }
})

// 每个 case reducer 函数会生成对应的 Action creators
export const { generateBoard, match, } = dashBoardSlice.actions;

export default dashBoardSlice.reducer;

// ？
function shuffleCards(boardOfCards){
    boardOfCards = lodash.shuffle(boardOfCards);
    return boardOfCards
}