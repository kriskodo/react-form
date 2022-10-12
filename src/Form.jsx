import { useCallback, useMemo, useState } from 'react';
import FormPage from './FormPage';
import AppContext from './context/context';
import './styles.css';
import adaptPages from './utils/adaptInputPages';

function Form({ pages, onSubmit }) {
  const [state, setState] = useState(adaptPages(pages));
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [errors, setErrors] = useState([]);

  const nextPage = useCallback(() => {
    setCurrentPageNumber((page) => page + 1);
  }, []);

  const prevPage = useCallback(() => {
    setCurrentPageNumber((page) => page - 1);
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    onSubmit(state);
  }, [onSubmit, state]);

  const context = useMemo(() => ({
    state,
    setState,
    errors,
    setErrors,
    currentPageNumber,
    setCurrentPageNumber,
    totalPages: pages.length,
    prevPage,
    nextPage,
    handleSubmit,
  }), [currentPageNumber, errors, handleSubmit, nextPage, pages.length, prevPage, state]);

  return (
    <AppContext.Provider value={context}>
      <form onSubmit={handleSubmit} className="form">
        <div className="form__errors">
          {errors.map((error, idx) => (
            <div className="form__error" key={`error-${idx + Math.random()}`}>
              {error}
            </div>
          ))}
        </div>
        {Object.keys(state)
          .map((pageNumber) => +pageNumber === currentPageNumber && (
            <FormPage
              key={`${pageNumber}-page`}
              pageNumber={pageNumber}
              title={pages[pageNumber - 1].props.title}
            />
          ))}
      </form>
    </AppContext.Provider>
  );
}

export default Form;
