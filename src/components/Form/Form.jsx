import { useCallback, useMemo, useState } from 'react';
// eslint-disable-next-line import/no-named-default
import { default as BootstrapForm } from 'react-bootstrap/Form';
import { Container } from 'react-bootstrap';

import { adaptInputName, adaptPages } from '@Utils/data-adapter';
import FormPage from '@Components/Form/FormPage';
import AppContext from '@Context/context';
import '@Src/styles.css';

function Form({ pages: formPages, onSubmit }) {
  const [pages, setPages] = useState(adaptPages([...formPages]));
  const [currentPageNumber, setCurrentPageNumber] = useState(1);

  const nextPage = useCallback(() => {
    setCurrentPageNumber((page) => page + 1);
  }, []);

  const prevPage = useCallback(() => {
    setCurrentPageNumber((page) => page - 1);
  }, []);

  const updateField = useCallback((inputNameKey, updatedData) => {
    const adaptedInputName = adaptInputName(inputNameKey);

    setPages((prevPages) => ({
      ...prevPages,
      [currentPageNumber]: {
        ...prevPages[currentPageNumber],
        [adaptedInputName]: {
          ...prevPages[currentPageNumber][adaptedInputName],
          ...updatedData,
        },
      },
    }));
  }, [currentPageNumber]);

  const context = useMemo(() => ({
    pages,
    setPages,
    totalPages: formPages.length,
    currentPageNumber,
    setCurrentPageNumber,
    prevPage,
    nextPage,
    updateField,
    handleSubmit: onSubmit,
  }), [
    pages,
    formPages.length,
    currentPageNumber,
    prevPage,
    nextPage,
    updateField,
    onSubmit,
  ]);

  return (
    <AppContext.Provider value={context}>
      <BootstrapForm onSubmit={onSubmit} className="form">
        <Container fluid>
          <div className="form__body">
            {Object.keys(pages)
              .map((pageNumber) => +pageNumber === currentPageNumber && (
                <FormPage
                  key={`${pageNumber}-page`}
                  pageNumber={pageNumber}
                  title={formPages[pageNumber - 1].props.title}
                />
              ))}
          </div>
        </Container>
      </BootstrapForm>
    </AppContext.Provider>
  );
}

export default Form;
