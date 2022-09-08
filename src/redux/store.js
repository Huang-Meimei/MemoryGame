import {combineReducers, createStore} from "redux";
import {boardReducer} from "./reducer/BoardReducer";
import {cardReducer} from "./reducer/CardReducer";

export const numOfSnackType = 1;
export const numOfCoinType = 1;
const rootReducer=combineReducers({
    boardReducer,
    cardReducer
})


const store=createStore(rootReducer)
export default store

