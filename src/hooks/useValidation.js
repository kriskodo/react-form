import { useCallback } from 'react';
import adaptInputName from '../utils/adaptInputName';

const useValidation = (pages, setPages, setErrors, validations, currentPageNumber) => {
  const validate = useCallback((e) => {
    setErrors([]);
    validations.forEach((validation) => {
      if (e.target.name === 'Repeat Password') {
        const validationResult = validation(e.target, pages);
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
  }, [setErrors, pages, validations]);

  const onChange = useCallback((e) => {
    setPages((prevPages) => ({
      ...prevPages,
      [currentPageNumber]: {
        ...prevPages[currentPageNumber],
        [adaptInputName(e.target.name)]: {
          ...prevPages[currentPageNumber][adaptInputName(e.target.name)],
          value: e.target.value,
        },
      },
    }));
  }, [currentPageNumber, setPages]);

  return {
    onChange,
    validate,
  };
};

export default useValidation;
