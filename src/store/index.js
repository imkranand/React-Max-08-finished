import { configureStore} from '@reduxjs/toolkit'

import { createSlice } from '@reduxjs/toolkit';
const initialCounterState = { counter: 0, showCounter: true};

const counterSlice = createSlice({
    name: 'Counter',
    initialState: initialCounterState,
    reducers: {
        increment(state) {
            state.counter++;
        },
        decrement(state) {
            state.counter--;
        },
        increase(state,action) {
            state.counter += action.payload;
        },
        toggleCounter(state) {
            console.log('inside toggle counter ');
            state.showCounter = !state.showCounter;
        },
    }
});

const inititalAuthState = {
    isAuthenticated: false,
};

const authSlice = createSlice({
    name: 'authentication',
    initialState: inititalAuthState,
    reducers: {
        login(state){
            state.isAuthenticated = true;
        },
        logout(state){
            state.isAuthenticated = false;
        }
    }
});


//creating a  store
const store  = configureStore({
    reducer: {counter: counterSlice.reducer, auth: authSlice.reducer}
});


export const counterActions = counterSlice.actions;
export const authActions = authSlice.actions;
export default store;