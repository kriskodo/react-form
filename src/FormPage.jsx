import { useContext } from 'react';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import FormInput from './FormInput';
import AppContext from './context/context';
import validatePage from './validation/validatePage';
import adaptResultPages from './utils/adaptResultPages';

function FormPage({
  pageNumber,
  title,
}) {
  const {
    pages, prevPage, nextPage, errors, setErrors, handleSubmit, totalPages,
  } = useContext(AppContext);

  const validateSubmit = (e) => {
    e.preventDefault();
    const foundErrors = validatePage(pages, pageNumber, errors);
    setErrors(foundErrors);

    return handleSubmit(adaptResultPages(pages));
  };

  const validateNext = () => {
    const foundErrors = validatePage(pages, pageNumber, errors);

    if (foundErrors.length === 0) {
      setErrors([]);
      return nextPage();
    }

    return setErrors(foundErrors);
  };

  const handlePrevPage = () => {
    setErrors([]);
    prevPage();
  };

  const submitBtn = +pageNumber === totalPages ? (
    <Button as="input" type="submit" value="Submit" onClick={validateSubmit}/>
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
            {...input.props}
          />
        ))}
      </div>
      {backBtn}
      {submitBtn}
    </Form.Group>
  );
}

export default FormPage;
