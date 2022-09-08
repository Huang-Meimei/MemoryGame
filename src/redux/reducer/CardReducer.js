const initState=null
export function cardReducer(prevState=initState,action){
    const {type, cardData} = action;
    if (type==="flip"){
        let {img, img0, matched, flipped} = cardData;
        if (!matched && !flipped) {
            flipped=true;
            img0 = require('../../img/'+img+'.png');
            return cardData
        } 
    }
    return initState;
}