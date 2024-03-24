
import classes from './Counter.module.css';

import { useSelector,useDispatch } from 'react-redux';
import { counterActions } from '../store/index';

const Counter = () => {
  const counter = useSelector((state) =>  state.counter.counter );
  const show = useSelector((state) => state.counter.showCounter);
  const dispatch = useDispatch();
  const toggleCounterHandler = () => {
    dispatch(counterActions.toggleCounter());
  };
  const incrementHandler = () => {
    dispatch(counterActions.increment());
  };
  
  const decrementHandler = () => {
    dispatch(counterActions.decrement());
  };

  const customIncrementHandler =() => {
    dispatch(counterActions.increase(5))
  };

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {show && <div className={classes.value}>{counter}</div>}
      <div>
        <button onClick={incrementHandler}> + </button>
        <button onClick={customIncrementHandler}> increment by 5 </button>
        <button onClick={decrementHandler}> - </button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;

/* This Below is a demonstration of how Redux can be used in Class Component*/
/*
import {connect} from 'react-redux';
import { Component } from 'react';

class Counter extends Component {
  incrementHandler () {
    this.props.increment();
  }
  decrementHandler() {
    this.props.decrement();
  }
  toggleCounterHandler(){
    console.log('ToggleCounterHandlerClicked');
  }
  render() {
    return (
      <main className={classes.counter}>
        <h1>Redux Counter</h1>
        <div className={classes.value}>{this.props.countr}</div>
        <div>
          <button onClick={this.incrementHandler.bind(this)}> + </button>
          <button onClick={this.decrementHandler.bind(this)}> - </button>
        </div>
        <button onClick={this.toggleCounterHandler.bind(this)}>Toggle Counter</button>
      </main>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    countr : state.counter,
  };
};
const mapDispatchToProps = (dispatch) => {
  return{
    increment: () => dispatch({type: 'inc'}),
    decrement: () => dispatch({type: 'dec'})
  }
};

export default connect(mapStateToProps,mapDispatchToProps)(Counter);

*/