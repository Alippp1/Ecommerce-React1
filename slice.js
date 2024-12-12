import { configureStore, createSlice} from "@reduxjs/toolkit";

// beda sama toolkit, disini reducer dan action digabungkan

const cartSlice = createSlice({
    name:"cart",
    initialState: [],
    reducers: {
        addToCart: (state, action) => {
            state.push(action.payload);
        }
    }
})

const loginSlice = createSlice({
    name:"login",
    initialState:{status: false},
    reducers: {
        // eslint-disable-next-line no-unused-vars
        login: (state, action) => {
            state.status = true;
        }
    }
})

// store
const store = configureStore({
    reducer:{
        login: loginSlice.reducer,
        cart: cartSlice.reducer,
    }
});
console.log("oncreate store : ", store.getState());

// subscribe
store.subscribe(()=>{
    console.log("STORE CHANGE : ", store.getState());
})

// dispatch
store.dispatch(cartSlice.actions.addToCart({id: 2, qty: 2}));
store.dispatch(loginSlice.actions.login());

// run node slice