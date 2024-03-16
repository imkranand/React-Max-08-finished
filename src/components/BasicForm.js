import useForm from "./../hooks/use-form";

const BasicForm = (props) => {
    const {
        input: firstName,
        valid: firstNameIsValid,
        hasError: firstNameHasError,
        inputChangeHandler: firstNameChangeHandler,
        inputBlurHandler: firstNameBlurHandler,
        resetInput: resetFirstName,
    } = useForm((value) => value.trim() !== "");
    const {
        input: lastName,
        valid: lastNameIsValid,
        hasError: lastNameHasError,
        inputChangeHandler: lastNameChangeHandler,
        inputBlurHandler: lastNameBlurHandler,
        resetInput: resetLastName,
    } = useForm((value) => value.trim() !== "");
    const {
        input: email,
        valid: emailIsValid,
        hasError: emailHasError,
        inputChangeHandler: emailChangeHandler,
        inputBlurHandler: emailBlurHandler,
        resetInput: resetEmail,
    } = useForm((value) => value.includes("@"));

    let formIsValid = false;
    //check if form valid for formIsValid
    if( firstNameIsValid && lastNameIsValid && emailIsValid){
        formIsValid = true;
    }

    const formSubmissionHandler = ($event) => {
        $event.preventDefault();

        if(!formIsValid){
            return ;
        }
        console.log('First Name', firstName,'\nLast Name',lastName,'Email Adress', email);


        resetFirstName();
        resetLastName();
        resetEmail();
    };

    const firstnameinputclass = firstNameHasError ? 'form-control invalid' : 'form-control' ;
    const lastnameinputclass = lastNameHasError ? 'form-control invalid' : 'form-control' ;
    const emailinputclass = emailHasError ? 'form-control invalid' : 'form-control' ;

    return (
        <form onSubmit={formSubmissionHandler}>
            <div className="control-group">
                <div className={firstnameinputclass}>
                    <label htmlFor="name">First Name</label>
                    <input
                        type="text"
                        id="name"
                        onChange={firstNameChangeHandler}
                        onBlur={firstNameBlurHandler}
                        value={firstName}
                    />
                    {firstNameHasError && (
                        <p className="error-text">Error in the First Name</p>
                    )}
                </div>
                <div className={lastnameinputclass}>
                    <label htmlFor="name">Last Name</label>
                    <input type="text" id="name" onChange={lastNameChangeHandler} onBlur={lastNameBlurHandler} value={lastName} />
                    {lastNameHasError && <p className="error-text">Error in the Last Name</p>}
                </div>
            </div>
            <div className={emailinputclass}>
                <label htmlFor="name">E-Mail Address</label>
                <input type="text" id="name"  onChange={emailChangeHandler} onBlur={emailBlurHandler} value={email}/>
                {emailHasError && <p className="error-text">Error in the -E-mail Address</p>}
            </div>
            <div className="form-actions">
                <button disabled={!formIsValid}>Submit</button>
            </div>
        </form>
    );
};

export default BasicForm;
