import { useContext } from 'react';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import FormInput from './FormInput';
import AppContext from '../../context/context';
import { adaptResultPages } from '../../utils/data-adapter';

function FormPage({
  pageNumber,
  title,
}) {
  const {
    pages,
    prevPage,
    nextPage,
    totalPages,
    handleSubmit,
    updateField,
  } = useContext(AppContext);

  const validatePage = () => {
    const accumulatedErrors = [];

    Object.keys(pages[pageNumber]).forEach((inputName) => {
      const inputValue = pages[pageNumber][inputName].value;
      const { validations } = pages[pageNumber][inputName].props;

      const inputErrors = [];

      validations.forEach((validation) => {
        const validationResult = validation({ name: inputName, value: inputValue }, pages);

        if (!validationResult.valid) {
          updateField(
            inputName,
            {
              isValid: false,
              isVisited: true,
              error: inputErrors.length === 0 ? validationResult.message : inputErrors[0],
            },
          );

          inputErrors.push(validationResult.message);
          accumulatedErrors.push(validationResult.message);
        }
      });

      if (inputErrors.length === 0) {
        updateField(
          inputName,
          {
            isValid: true,
            isVisited: true,
            error: '',
          },
        );
      }
    });

    return accumulatedErrors;
  };

  const validateSubmit = (e) => {
    e.preventDefault();
    const foundErrors = validatePage();

    if (foundErrors.length === 0) {
      return handleSubmit(adaptResultPages(pages));
    }

    return null;
  };

  const validateNext = () => {
    const foundErrors = validatePage();

    if (foundErrors.length === 0) {
      return nextPage();
    }

    return null;
  };

  const handlePrevPage = () => {
    prevPage();
  };

  const submitBtn = +pageNumber === totalPages ? (
    <Button as="input" type="submit" value="Submit" onClick={validateSubmit} />
  ) : (
    <Button as="input" type="button" value="Next" onClick={validateNext} />
  );

  const backBtn = +pageNumber !== 1 ? (
    <Button as="input" type="button" value="Back" onClick={handlePrevPage} style={{ marginRight: '10px' }} />
  ) : '';

  return (
    <Form.Group className="form__page">
      <div className="form__page-title">{title}</div>
      <div>
        {pageNumber}
        /
        {totalPages}
      </div>
      <div>
        {Object.values(pages[pageNumber]).map((input) => (
          <FormInput
            key={input.props.name}
            value={input.value}
            {...input}
          />
        ))}
      </div>
      {backBtn}
      {submitBtn}
    </Form.Group>
  );
}

export default FormPage;
