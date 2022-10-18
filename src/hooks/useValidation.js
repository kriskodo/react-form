import { useCallback } from 'react';
import adaptInputName from '../utils/adaptInputName';

const useValidation = (pages, setPages, setErrors, validations, currentPageNumber) => {
  const validate = useCallback((e) => {
    setErrors([]);
    const inputNameKey = adaptInputName(e.target.name);

    validations.forEach((validation) => {
      if (e.target.name === 'Repeat Password') {
        const validationResult = validation(e.target, pages);
        if (!validationResult.valid) {
          setPages((prevPages) => ({
            ...prevPages,
            [currentPageNumber]: {
              ...prevPages[currentPageNumber],
              [inputNameKey]: {
                ...prevPages[currentPageNumber][inputNameKey],
                isValid: false,
              },
            },
          }));

          setErrors((prevErrors) => [...prevErrors, validationResult.message]);
          return;
        }

        setPages((prevPages) => ({
          ...prevPages,
          [currentPageNumber]: {
            ...prevPages[currentPageNumber],
            [inputNameKey]: {
              ...prevPages[currentPageNumber][inputNameKey],
              isValid: true,
            },
          },
        }));

        setErrors((prevErrors) => [
          ...prevErrors.filter(
            (errorMsg) => errorMsg === validationResult.message,
          ),
        ]);
      } else {
        const validationResult = validation(e.target);

        if (!validationResult.valid) {
          setPages((prevPages) => ({
            ...prevPages,
            [currentPageNumber]: {
              ...prevPages[currentPageNumber],
              [inputNameKey]: {
                ...prevPages[currentPageNumber][inputNameKey],
                isValid: false,
              },
            },
          }));

          setErrors((prevErrors) => [...prevErrors, validationResult.message]);
          return;
        }

        setPages((prevPages) => ({
          ...prevPages,
          [currentPageNumber]: {
            ...prevPages[currentPageNumber],
            [inputNameKey]: {
              ...prevPages[currentPageNumber][inputNameKey],
              isValid: true,
            },
          },
        }));

        setErrors((prevErrors) => [
          ...prevErrors.filter(
            (errorMsg) => errorMsg === validationResult.message,
          ),
        ]);
      }
    });
  }, [setErrors, validations, pages, setPages, currentPageNumber]);

  const onBlur = (e) => {
    const inputNameKey = adaptInputName(e.target.name);

    setPages((prevPages) => ({
      ...prevPages,
      [currentPageNumber]: {
        ...prevPages[currentPageNumber],
        [inputNameKey]: {
          ...prevPages[currentPageNumber][inputNameKey],
          isVisited: true,
        },
      },
    }));

    validate(e);
  };

  const onChange = useCallback((e) => {
    const inputNameKey = adaptInputName(e.target.name);

    setPages((prevPages) => ({
      ...prevPages,
      [currentPageNumber]: {
        ...prevPages[currentPageNumber],
        [inputNameKey]: {
          ...prevPages[currentPageNumber][inputNameKey],
          value: e.target.value,
        },
      },
    }));

    if (pages[currentPageNumber][inputNameKey].isVisited) {
      validate(e);
    }
  }, [currentPageNumber, pages, setPages, validate]);

  return {
    onChange,
    onBlur,
  };
};

export default useValidation;
