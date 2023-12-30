import React, { useState,useReducer,useEffect, useContext, useRef } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import { cleanup } from '@testing-library/react';
import AuthContext from '../../store/auth-context';
import Input from '../UI/Input/Input';

const emailReducer = (state,action) => {

  if(action.type === 'USER_INPUT'){
    return { value: action.val, isValid: action.val.includes('@') }
  }
  if(action.type === 'INPUT_BLUR'){
    return { value: state.val, isValid: state.value.includes('@') }
  }
  return { value: '', isValid: false }
}

const passwordReducer = (state,action) => {

  if(action.type === 'USER_INPUT'){
    return {value: action.val, isValid: action.val.trim().length > 6}
  }
  if(action.type === 'INPUT_BLUR'){
    return { value: state.val, isValid: state.value.trim().length > 6}
  }
  return {value: '', isValid: false};
}

const Login = () => {
  const ctx = useContext(AuthContext);
  const emailRef = useRef();
  const passwordRef = useRef();

  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: '',
    isValid: null,
  });

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: '',
    isValid: null,
  });

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
        cleanup(timer);
      }
  },[emailIsValid,passwordIsValid]);

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: 'USER_INPUT', val: event.target.value});
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({type:'USER_INPUT', val: event.target.value});
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: 'INPUT_BLUR'})
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type:'INPUT_BLUR'});
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (formIsValid) {
      ctx.onLogin(emailState.value, passwordState.value);
    } else if (!emailIsValid) {
      emailRef.current.focus();
    } else {
     passwordRef.current.focus(); 
    }    
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
        ref = {emailRef}
          id="email"
          label="E-Mail"
          type = 'email'
          isValid={emailIsValid}
          value={emailState.value}
          onChange = {emailChangeHandler}
          onBlur = {validateEmailHandler}
        />
        <Input
          ref={passwordRef}
          id="password"
          label="Password"
          type='password'
          isValid={passwordIsValid}
          value={passwordState.value}
          onChange = {passwordChangeHandler}
          onBlur = {validatePasswordHandler}
        />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
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