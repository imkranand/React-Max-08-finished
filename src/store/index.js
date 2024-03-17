import {createStore } from 'redux';

//creating a reducer function that needs to be passed while creating the store
// reducer function should be created before being called in the next step of store creation
const storeReducer = (state = {counter: 0}, action) => {
    if(action.type === 'inc'){
        return{
            counter: state.counter + 1,
        };
    } else if(action.type === 'dec'){
        return {
            counter: state.counter - 1,
        };
    }
    else {
        return state;
    }
};

//creating a  store
const store  = createStore(storeReducer);



export default store;