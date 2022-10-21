import { useCallback, useContext } from 'react';
import { adaptInputName } from '../utils/data-adapter';
import AppContext from '../context/context';

const useValidation = (validations, currentPageNumber) => {
  const {
    pages, updateField,
  } = useContext(AppContext);

  const validate = useCallback((e) => {
    const inputNameKey = adaptInputName(e.target.name);

    validations.forEach((validation) => {
      const validationResult = validation(e.target, pages);

      if (!validationResult.valid) {
        updateField(inputNameKey, { isValid: false, error: validationResult.message });
        return;
      }

      updateField(inputNameKey, { isValid: true, error: '' });
    });
  }, [validations, pages, updateField]);

  const onBlur = (e) => {
    updateField(e.target.name, { isVisited: true });

    validate(e);
  };

  const onChange = useCallback((e) => {
    const inputNameKey = adaptInputName(e.target.name);

    updateField(e.target.name, { value: e.target.value });

    if (pages[currentPageNumber][inputNameKey].isVisited) {
      validate(e);
    }
  }, [currentPageNumber, pages, updateField, validate]);

  return {
    onChange,
    onBlur,
  };
};

export default useValidation;
