import { useContext } from 'react';
import FormInput from './FormInput';
import AppContext from './context/context';

function FormPage({
  pageNumber,
  title,
}) {
  const {
    totalPages, prevPage, nextPage, state,
  } = useContext(AppContext);

  const submitBtn = +pageNumber === +totalPages ? (
    <input type="submit" value="submit" />
  ) : (
    <input type="button" value="next" onClick={nextPage} />
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
