import useInputs from "../hooks/use-inputs";

const SimpleInput = () => {

    const {
        value: enteredName,
        isValid: enteredNameIsValid,
        hasError: nameInputError,
        valueChangeHandler: nameChangeHandler,
        inputBlurHandler: nameBlurHandler,
        reset: nameReset,
    } = useInputs((value) => value.trim() !== '');

    const {
        value: enteredEmail,
        isValid: enteredEmailIsValid,
        hasError: emailInputError,
        valueChangeHandler: emailChangeHandler,
        inputBlurHandler: emailBlurHandler,
        reset: emailReset,
    } = useInputs(value => value.includes('@'));

    let formIsValid = false;


    if (enteredNameIsValid && enteredEmailIsValid) {
         formIsValid = true;
     }

    const formSubmitHandler = ($event) => {
        $event.preventDefault();

        if (!enteredNameIsValid && !enteredEmailIsValid) {
            return;
        }
        console.log("useState", enteredName,enteredEmail);
        nameReset();
        emailReset();
    }
  const nameInputClass = nameInputError
    ? "form-control invalid"
    : "form-control";

    const emailInputClasses = emailInputError 
    ? "form-control invalid" 
    : "form-control" ;

  return (
    <form onSubmit={formSubmitHandler}>
      <div className={nameInputClass}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
          value={enteredName}
        />
        {nameInputError && (
          <p className="error-text">Name must not be empty</p>
        )}
      </div>
      <div className={emailInputClasses}>
        <label htmlFor="email">Your Email</label>
        <input 
            type="email"
            id="email" 
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
            value={enteredEmail}
        />
        {emailInputError && <p className="error-text">Please enter a valid email</p>}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
