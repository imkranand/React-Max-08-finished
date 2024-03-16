import { useState } from "react";

const useForm = (validationFunction) => {
    const [formInput, setFormInput] = useState('');
    const[touched,setTouched] = useState(false);

    const valueIsValid = validationFunction(formInput);
    const hasError = !valueIsValid && touched;

    const inputChangeHandler = (event) => {
        setFormInput(event.target.value);
    };

    const inputBlurHandler = () => {
        setTouched(true);
    };

    const resetInput = () => {
        setFormInput('');
        setTouched(false);
    } ;

    return {
        input: formInput,
        valid: valueIsValid,
        hasError: hasError,
        inputChangeHandler,
        inputBlurHandler,
        resetInput
    };
}

export default useForm;