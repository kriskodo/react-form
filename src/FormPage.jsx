import { useContext } from 'react';
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
    <input type="submit" value="submit" onClick={validateSubmit} />
  ) : (
    <input type="button" value="next" onClick={validateNext} />
  );

  const backBtn = +pageNumber !== 1 ? (
    <input type="button" value="back" onClick={handlePrevPage} />
  ) : '';

  return (
    <div className="form__page">
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
    </div>
  );
}

export default FormPage;
