import { useContext } from 'react';
import FormInput from './FormInput';
import AppContext from './context/context';
import validatePage from './validation/validatePage';

function FormPage({
  pageNumber,
  title,
}) {
  const {
    totalPages, prevPage, nextPage, state, setErrors, handleSubmit,
  } = useContext(AppContext);

  const validateSubmit = (e) => {
    e.preventDefault();
    const foundErrors = validatePage(state, pageNumber);

    if (foundErrors.length === 0) return handleSubmit(state);

    return setErrors(foundErrors);
  };

  const validateNext = () => {
    const foundErrors = validatePage(state, pageNumber);

    if (foundErrors.length === 0) return nextPage();

    return setErrors(foundErrors);
  };

  const submitBtn = +pageNumber === +totalPages ? (
    <input type="submit" value="submit" onSubmit={validateSubmit} />
  ) : (
    <input type="button" value="next" onClick={validateNext} />
  );

  const backBtn = +pageNumber !== 1 ? (
    <input type="button" value="back" onClick={prevPage} />
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
        {Object.values(state[pageNumber]).map((input) => (
          <FormInput
              /** TODO: Destructure properly */
            key={input.props.name}
            id={input.props.name}
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
