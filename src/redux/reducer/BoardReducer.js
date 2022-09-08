import Card from "../../components/Card"
import { numOfSnackType, numOfCoinType } from "../store";
var _ = require('lodash');

const initState={cardList:null}
export function boardReducer(prevState=initState,action){
    const {type, payload} = action; 
    if (type==="generate"){
        var newCardList = generateBoard(payload.numOfCards,payload.size);
        return newCardList
    }
    return initState.cardList
}

const flippedStorageState={cardList:[]}
export function boardCardReducer(prevState=flippedStorageState,action){
    const {type, data} = action;
    if (type==="storeFlipped"){
        if (flippedStorageState.length<2){
            flippedStorageState.push(data)
        }
        return flippedStorageState.cardList
    }
    if (type ==="match"){
        if (flippedStorageState.length==2){
            if (flippedStorageState[0].img===flippedStorageState[1].img){
                flippedStorageState=[]
                return true;  
            }else{
                flippedStorageState=[]
                return false
            }
        }
        return false
    }
}


function generateBoard(numOfCards,size){
    var cards = [];
    var remainings=size-numOfCards;
    var numOfSnack = Math.random()*(remainings/2);
    if (numOfSnack%2!=0) numOfSnack+=1; 
    remainings -=numOfSnack;
    var numOfCoin = Math.random()*(remainings/2);
    remainings -=numOfCoin;
    for (var i=0; i<numOfSnack; i++){
        var snackType = Math.floor(Math.random()*numOfSnackType+1);
        cards.push({
            type:"snack",
            img:'snack-'+snackType+''
        })
    }
    for (var i=0; i<numOfCards; i++){
        cards.push({
            type:"image",
            img:i+''
        });
    }
    for (var i=0; i<numOfCoin; i++){
        var coinType = Math.floor(Math.random()*numOfCoinType+1);
        cards.push({
            type:"coin",
            img:'coin-'+coinType+''
        })
    }
    for (var i=0; i<remainings; i++){
        cards.push({
            type:"blank",
            img:'blank'
        })
    }
    for (var i=0; i<numOfCards; i++){
        cards.push({
            type:"image",
            img:i+''
        });
    }
    return shuffleCards(cards)

}

function shuffleCards(boardOfCards){
    boardOfCards = _.shuffle(boardOfCards);
    return boardOfCards
}