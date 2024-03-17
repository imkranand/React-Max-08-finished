// importing the redux for usage
const redux = require('redux');

// creating a reducer Function 
const counterReducer = (state = { counter: 0 }, action) => {
  if (action.type === "increment") {
    return {
      counter: state.counter + 1,
    };
  }
  if (action.type === "decrement") {
    return{
        counter: state.counter - 1,
    }
  }
//   we need to return a state in case there is no action specified that is just after creating the store. other wise for the state will be undefined untill correct action is called.
  return state;
};

// creating a redux store and specifying the reducer funtion with it.
const store = redux.createStore(counterReducer);

console.log('first Call',store.getState());//0

// creating a subscriber Function
const counterSubscriber = () => {
    const latestState = store.getState();
    console.log(latestState);
};

// calling a subscriber function on the store
store.subscribe(counterSubscriber);
store.dispatch({type: 'increment'}); // 1
store.dispatch({type: 'increment'}); // 2
store.dispatch({type: 'increment'}); // 3
store.dispatch({type: 'decrement'}); // 2
store.dispatch({type: 'decrement'}); // 1
store.dispatch({type: 'decrement'}); // 0
store.dispatch({type: 'decrement'}); // -1 