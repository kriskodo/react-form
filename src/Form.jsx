import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import FormPage from './FormPage';
import './styles.css';

function Form({ pages, onSubmit }) {
  /*
    * //TODO: Turn this into hook.
*/
  const adaptedPages = pages.reduce((acc, val, idx) => {
    const currentPage = idx + 1;
    acc[currentPage] = {};

    val.props.inputs.forEach((input) => {
      const adaptedName = input.props.name.toLowerCase().split(' ').join('_');
      acc[currentPage][adaptedName] = { props: input.props, value: '' };
    });

    return acc;
  }, {});
  const [state, setState] = useState(adaptedPages);
  const [currentPageNumber, setCurrentPageNumber] = useState(1);

  const onChange = (e, pageNumber) => {
    setState((prevState) => {
      const previous = { ...prevState };
      const adaptedPropertyName = e.target.name.toLowerCase()
        .split(' ')
        .join('_');

      previous[pageNumber][adaptedPropertyName] = {
        ...prevState[pageNumber][adaptedPropertyName],
        value: e.target.value,
      };

      return prevState;
    });
  };

  const nextPage = () => {
    setCurrentPageNumber((page) => page + 1);
  };

  const prevPage = () => {
    setCurrentPageNumber((page) => page - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(state);
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      {Object.keys(state)
        .map((pageNumber, idx) => idx + 1 === currentPageNumber && (
          <FormPage
            key={uuidv4()}
            totalPages={pages.length}
            pageNumber={pageNumber}
            inputs={state[pageNumber]}
            {...pages[idx].props}
            nextPage={nextPage}
            prevPage={prevPage}
            onChange={onChange}
          />
        ))}
    </form>
  );
}

export default Form;
