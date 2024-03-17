import {createStore } from 'redux';

//creating a reducer function that needs to be passed while creating the store
// reducer function should be created before being called in the next step of store creation
const storeReducer = (state = {counter: 0, showCounter: true}, action) => {
    // IMPORTANT NOTE: 1) While updating state set all the unchanged values to previous value and don't ignore any attribute stored in state. if we forget to include an attribute it will be set an undefined and that may lead to any issues or BUG
    // 2) NEVER Modify existing state. Always set the new state to new object
    if(action.type === 'inc'){
        return{
            counter: state.counter + 1,
            showCounter: state.showCounter,
        };
    } else if(action.type === 'dec'){
        return {
            counter: state.counter - 1,
            showCounter: state.showCounter,
        };
    } else if (action.type === 'increase') {
        return {
            counter: state.counter + action.amount,
            showCounter: state.showCounter,
        };     
    } else if (action.type === 'toggle') {
        return {
            showCounter: !state.showCounter,
            counter: state.counter,
        };
    }
    else {
        return state;
    }
};

//creating a  store
const store  = createStore(storeReducer);



export default store;