import { useCallback, useMemo, useState } from 'react';
import FormPage from './FormPage';
import AppContext from './context/context';
import './styles.css';
import adaptPages from './utils/adaptInputPages';

function Form({ pages: formPages, onSubmit }) {
  const [pages, setPages] = useState(adaptPages(formPages));
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [errors, setErrors] = useState([]);

  const nextPage = useCallback(() => {
    setCurrentPageNumber((page) => page + 1);
  }, []);

  const prevPage = useCallback(() => {
    setCurrentPageNumber((page) => page - 1);
  }, []);

  const context = useMemo(() => ({
    pages,
    setPages,
    errors,
    totalPages: formPages.length,
    setErrors,
    currentPageNumber,
    setCurrentPageNumber,
    prevPage,
    nextPage,
    handleSubmit: onSubmit,
  }), [pages, errors, formPages.length, currentPageNumber, prevPage, nextPage, onSubmit]);

  return (
    <AppContext.Provider value={context}>
      <form onSubmit={onSubmit} className="form">
        <div className="form__errors">
          {errors.map((error, idx) => (
            <div className="form__error" key={`error-${idx + Math.random()}`}>
              <p>{error}</p>
            </div>
          ))}
        </div>
        {Object.keys(pages)
          .map((pageNumber) => +pageNumber === currentPageNumber && (
            <FormPage
              key={`${pageNumber}-page`}
              pageNumber={pageNumber}
              title={formPages[pageNumber - 1].props.title}
            />
          ))}
      </form>
    </AppContext.Provider>
  );
}

export default Form;
