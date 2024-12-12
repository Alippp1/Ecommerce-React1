// reducer

import { createStore } from "redux";

// eslint-disable-next-line no-unused-vars
const cartReducer = (
    // eslint-disable-next-line no-unused-vars
    state ={
    cart:[{id: 1, qty: 1}],
// eslint-disable-next-line no-unused-vars
},action) =>{
    switch(action.type){
        case "ADD_TO_CART":
            return{
                ...state,
                cart:[...state.cart,action.payload]
            }
        default:
            return state;
    }
};

// store 

const store = createStore(cartReducer);
console.log("oncreate store : ", store.getState());

// subscribe -> untuk melihat perubahan
store.subscribe(()=>{
    console.log("STORE CHANGE : ", store.getState());
})

// dispatch -> untuk memanggil action
const action1 = {type: "ADD_TO_CART", payload: {id: 2, qty: 2}};
store.dispatch(action1);

// run node redux