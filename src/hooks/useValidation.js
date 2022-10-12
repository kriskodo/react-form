import { useCallback } from 'react';
import adaptInputName from '../utils/adaptInputName';

const useValidation = (state, setState, setErrors, validations, currentPageNumber) => {
  const validate = useCallback((e) => {
    validations.forEach((validation) => {
      if (e.target.name === 'Repeat Password') {
        const validationResult = validation(e.target, state);
        if (!validationResult.valid) {
          e.target.classList.add('form__input--error');
          setErrors((prevErrors) => [...prevErrors, validationResult.message]);
          return;
        }

        setErrors((prevErrors) => [
          ...prevErrors.filter(
            (errorMsg) => errorMsg === validationResult.message,
          ),
        ]);
        e.target.classList.remove('form__input--error');
      } else {
        const validationResult = validation(e.target);

        if (!validationResult.valid) {
          setErrors((prevErrors) => [...prevErrors, validationResult.message]);
          e.target.classList.add('form__input--error');
          return;
        }

        setErrors((prevErrors) => [
          ...prevErrors.filter(
            (errorMsg) => errorMsg === validationResult.message,
          ),
        ]);
        e.target.classList.remove('form__input--error');
      }
    });
  }, [setErrors, state, validations]);

  const onChange = useCallback((e) => {
    setState((prevState) => ({
      ...prevState,
      [currentPageNumber]: {
        ...prevState[currentPageNumber],
        [adaptInputName(e.target.name)]: {
          ...prevState[currentPageNumber][adaptInputName(e.target.name)],
          value: e.target.value,
        },
      },
    }));

    validate(e);
  }, [currentPageNumber, setState, validate]);

  return {
    onChange,
    validate,
  };
};

export default useValidation;
