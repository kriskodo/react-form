import adaptInputName from '../utils/adaptInputName'

const validator = () => {
  const required = () => (value) => value.length > 0;
  const minLength = (length) => (value) => value.length > length;
  const securePassword = () => (value) => value.length > 8;
  const repeatPassword = (inputName) => (value, state) => {
    let page = 1;
    let passwordValue = Object.keys(state[page]).find((key) => key === adaptInputName(inputName));

    while (!passwordValue) {
      page += 1;

      if (!state[page]) {
        throw new Error(
          'Something went wrong with {repeatPassword}',
        );
      }

      passwordValue = Object.keys(state[page]).find(inputName);

      if (passwordValue) { return value === passwordValue; }
    }

    return value === passwordValue;
  };

  const email = () => (value) => /^\S+@\S+\.\S+$/.test(value);
  const validAddress = () => (value) => !!value;
  const phoneNumber = () => (value) => !!value;
  const dateOfBirth = (minDate) => (value) => {
    const min = new Date(minDate);
    const chosen = new Date(value);

    return min.getTime() < chosen.getTime();
  };

  return {
    required,
    minLength,
    securePassword,
    repeatPassword,
    email,
    validAddress,
    phoneNumber,
    dateOfBirth,
  };
};

export default validator;
