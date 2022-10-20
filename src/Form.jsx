import { useCallback, useMemo, useState } from 'react';
// eslint-disable-next-line import/no-named-default
import { default as BootstrapForm } from 'react-bootstrap/Form';
import { Alert, Col, Container } from 'react-bootstrap';

import FormPage from './FormPage';
import AppContext from './context/context';
import './styles.css';
import { adaptInputName, adaptPages } from './utils/data-adapter';

function Form({ pages: formPages, onSubmit }) {
  const [pages, setPages] = useState(adaptPages([...formPages]));
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [errors, setErrors] = useState([]);

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
    errors,
    totalPages: formPages.length,
    setErrors,
    currentPageNumber,
    setCurrentPageNumber,
    prevPage,
    nextPage,
    updateField,
    handleSubmit: onSubmit,
  }), [
    pages,
    errors,
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
          <div className="form__errors">
            {errors.map((error, idx) => (
              <Col key={`error-${idx + Math.random()}`}>
                <Alert variant="danger">
                  {error}
                </Alert>
              </Col>
            ))}
          </div>
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
