import { v4 as uuidv4 } from 'uuid';
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

  const onBlur = useCallback((e, pageNumber) => {
    console.log(e, pageNumber);
    // TODO: Add validation on blur.
  }, []);

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
          .map((pageNumber, idx) => idx + 1 === currentPageNumber && (
            <FormPage
              key={`${currentPageNumber}-page`}
              pageNumber={pageNumber}
              {...state[idx]}
            />
          ))}
      </form>
    </AppContext.Provider>
  );
}

export default Form;
