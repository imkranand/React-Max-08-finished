import React, { useState,useReducer,useEffect } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import { cleanup } from '@testing-library/react';

const emailReducer = (state,action) => {
  console.log('In Email Reducer  ')
  if(action.type === 'USER_INPUT'){
    return { value: action.val, isValid: action.val.includes('@') }
  }
  if(action.type === 'INPUT_BLUR'){
    return { value: state.val, isValid: state.value.includes('@') }
  }
  return { value: '', isValid: false }
}

const passwordReducer = (state,action) => {
  console.log('In password Reducer')
  if(action.type === 'USER_INPUT'){
    return {value: action.val, isValid: action.val.trim().length > 6}
  }
  if(action.type === 'INPUT_BLUR'){
    return { value: state.val, isValid: state.value.trim().length > 6}
  }
  return {value: '', isValid: false};
}

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: '',
    isValid: null,
  });

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: '',
    isValid: null,
  });

  // This is object destructuring just like array destrucuting. 
  /**
   * This is used because whenever the isValid is changing we can trigger state update 
   * But if we are using the whole object it is changing the on every key input that is triggering the 
   * useEffect again and again which is not necessary and not optimized.
   */
  const {isValid: emailIsValid} = emailState;
  const {isValid: passwordIsValid} = passwordState;

  useEffect(()=>{
    const timer = setTimeout(
      ()=> {
        setFormIsValid(
          passwordIsValid && passwordIsValid
    );
      },500)
    
      return ()=>{
        console.log('cleanup');
        cleanup(timer);
      }
  },[emailIsValid,passwordIsValid]);

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: 'USER_INPUT', val: event.target.value});

    // commenting the below line reference given at the bottom of the file.
    // setFormIsValid(event.target.value.includes('@') && passwordState.isValid);

    // setEnteredEmail(event.target.value);

    // setFormIsValid(
    //   event.target.value.includes('@') && enteredPassword.trim().length > 6
    // );
  };

  const passwordChangeHandler = (event) => {

    dispatchPassword({type:'USER_INPUT', val: event.target.value});

    // commenting the below line reference given at the bottom of the file.
    // setFormIsValid(emailState.isValid && event.target.value.trim().length > 6);

    // setEnteredPassword(event.target.value);

    // setFormIsValid(
    //   event.target.value.trim().length > 6 && enteredEmail.includes('@')
    // );
  };

  const validateEmailHandler = () => {
    // setEmailIsValid(enteredEmail.includes('@'));

    dispatchEmail({ type: 'INPUT_BLUR'})
  };

  const validatePasswordHandler = () => {
    // setPasswordIsValid(enteredPassword.trim().length > 6);

    dispatchPassword({ type:'INPUT_BLUR'});
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;

/**
 * In function emailChangehandler and Password change handler we are updating the validity of the email and password
 * using useState hook that might create problem while taking the state. ( The problem can be it might take and old state value)
 * which might in turn end up being a buggy code.  so In order to update the state of the formvalid parameter we should use 
 * useEffect which is better way of updating as it will always take update state value.
 */