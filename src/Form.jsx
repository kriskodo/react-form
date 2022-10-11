import { useCallback, useMemo, useState } from 'react';
import FormPage from './FormPage';
import AppContext from './context/context';
import './styles.css';
import adaptInputName from './utils/adaptInputName';
import adaptPages from './utils/adaptInputPages';

function Form({ pages, onSubmit }) {
  const [state, setState] = useState(adaptPages(pages));
  const [currentPageNumber, setCurrentPageNumber] = useState(1);

  const onChange = useCallback((e, pageNumber) => {
    setState((prevState) => ({
      ...prevState,
      [pageNumber]: {
        ...prevState[pageNumber],
        [adaptInputName(e.target.name)]: {
          ...prevState[pageNumber][adaptInputName(e.target.name)],
          value: e.target.value,
        },
      },
    }));
  }, []);

  const onBlur = useCallback((e, validations) => {
    validations.forEach((validation) => {
      if (e.target.name === 'Repeat Password') {
        console.log(validation(e.target.value, state));
        return;
      }

      console.log(validation(e.target.value));
    });
  }, [state]);

  const nextPage = () => {
    setCurrentPageNumber((page) => page + 1);
  };

  const prevPage = () => {
    setCurrentPageNumber((page) => page - 1);
  };

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    onSubmit(state);
  }, [onSubmit, state]);

  const context = useMemo(() => ({
    state,
    setState,
    onBlur,
    onChange,
    nextPage,
    prevPage,
    currentPageNumber,
    setCurrentPageNumber,
    handleSubmit,
    totalPages: pages.length,
  }), [currentPageNumber, handleSubmit, onBlur, onChange, pages.length, state]);

  return (
    <AppContext.Provider value={context}>
      <form onSubmit={handleSubmit} className="form">
        {Object.keys(state)
          .map((pageNumber) => +pageNumber === currentPageNumber && (
            <FormPage
              key={`${currentPageNumber}-page`}
              pageNumber={pageNumber}
              {...state[pageNumber]}
            />
          ))}
      </form>
    </AppContext.Provider>
  );
}

export default Form;
