import { useState } from "react";

const SimpleInput = (props) => {
  
  const [enteredName,setEnteredName] = useState('');
  const [enteredNameIsTouched,setEnteredNameIsTouched] = useState(false);


  const enteredNameIsValid = enteredName.trim() !== '';
  const nameInputIsInvalid = !enteredNameIsValid && enteredNameIsTouched;

  const nameChangeHandler = ($event) => {
    setEnteredName($event.target.value);
  };

  const nameInputBlurHandler=($event) => {
    setEnteredNameIsTouched(true);
  };
  const formSubmitHandler = ($event) => {
    $event.preventDefault();
    setEnteredNameIsTouched(true);

    if(!enteredNameIsValid){
      return ;
    }
    console.log('useState',enteredName);
    setEnteredName('');
    setEnteredNameIsTouched(false);
  };

  
  const nameInputClass = nameInputIsInvalid ? 'form-control invalid' : 'form-control' ; 

  return (
    <form onSubmit={formSubmitHandler}>
      <div className={nameInputClass}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          onChange={nameChangeHandler}
          onBlur={nameInputBlurHandler}
          value={enteredName}
        />
        {nameInputIsInvalid && <p className="error-text">Name must not be empty</p>}
      </div>
      <div className="form-actions">
        <button>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
