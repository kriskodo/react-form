import { v4 as uuidv4 } from 'uuid';
import FormInput from './FormInput';

function FormPage({
  pageNumber, totalPages, title, inputs, nextPage, prevPage, onChange,
}) {
  const handleChange = (e) => {
    onChange(e, pageNumber);
  };

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
        {Object.values(inputs).map((input, idx) => (
          <FormInput
            key={uuidv4()}
            id={idx + Math.random() + Math.random()}
            data={input}
            {...input.props}
            onChange={handleChange}
          />
        ))}
      </div>
      {backBtn}
      {submitBtn}
    </div>
  );
}

export default FormPage;
