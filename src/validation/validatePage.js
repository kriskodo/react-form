const validatePage = (state, pageNumber) => {
  const errors = [];

  Object.keys(state[pageNumber]).forEach((inputName) => {
    const inputValue = state[pageNumber][inputName].value;
    const { validations } = state[pageNumber][inputName].props;

    validations.forEach((validation) => {
      const validationResult = validation({ name: inputName, value: inputValue }, state);
      if (!validationResult.valid) {
        errors.push(validationResult.message);
      }
    });
  });

  return errors;
};

export default validatePage;
