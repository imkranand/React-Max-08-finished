import { useRef, useState } from "react";

const SimpleInput = (props) => {
  
  const [enteredName,setEnteredName] = useState('');
  const nameInputRef = useRef();

  const nameChangeHandler = ($event) => {
    setEnteredName($event.target.value);
  };

  const formSubmitHandler = ($event) => {
    $event.preventDefault();

    console.log('useState',enteredName);

    const enteredValue = nameInputRef.current.value;

    console.log('useRef', enteredValue);
  };
  return (
    <form onSubmit={formSubmitHandler}>
      <div className="form-control">
        <label htmlFor="name">Your Name</label>
        <input
          ref={nameInputRef}
          type="text"
          id="name"
          onChange={nameChangeHandler}
        />
      </div>
      <div className="form-actions">
        <button>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
