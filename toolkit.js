import { configureStore, createAction, createReducer } from "@reduxjs/toolkit";

const addToCart = createAction("ADD_TO_CART");

// reducer with multiple reducer (bisa multiple reducer, karena mendefinisi dengan array kosong)
const cartReducer = createReducer([], (builder) => {
    builder.addCase(addToCart, (state, action) => {
        state.push(action.payload);
    });
});

const login = createAction("CREATE_SEASSON");

const loginReducer = createReducer({status:false}, (builder) => {
    // eslint-disable-next-line no-unused-vars
    builder.addCase(login, (state, action) => {
        state.status = true;
    });
})

// store
const store = configureStore({
    reducer:{
        login:loginReducer,
        cart:cartReducer,
    }
});
console.log("oncreate store : ", store.getState());

// subscribe
store.subscribe(()=>{
    console.log("STORE CHANGE : ", store.getState());
})

// dispatch
store.dispatch(addToCart({id: 1, qty: 5}));
store.dispatch(addToCart({id: 3, qty: 2}));
store.dispatch(login());

// run node toolkit