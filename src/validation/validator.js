import { adaptInputName } from '../utils/data-adapter';

const getOriginalInputName = (value) => value.split('_')
  .map((str) => str[0].toUpperCase() + str.slice(1)).join(' ');

const validator = () => {
  const required = () => (target) => ({
    valid: target.value.length > 0,
    message: `${getOriginalInputName(target.name)} is required.`,
  });

  const minLength = (length) => (target) => (
    {
      valid: target.value.length >= length,
      message:
        `${getOriginalInputName(
          target.name,
        )} needs to be at least ${length} characters long.`,
    });

  const securePassword = () => (target) => ({
    valid: target.value.length > 8,
    message: 'Password needs to be at least 8 characters long.',
  });

  const repeatPassword = (inputName) => (target, state) => {
    let page = 1;
    const passwordKey = Object.keys(state[page])
      .find((key) => key === adaptInputName(inputName));
    let passwordValue = state[page][passwordKey].value;

    while (!passwordKey) {
      page += 1;

      if (!state[page]) {
        throw new Error(
          'Something went wrong with {repeatPassword}',
        );
      }

      passwordValue = state[page][passwordKey].value;

      if (passwordValue) break;
    }

    return {
      valid: target.value === passwordValue,
      message: 'Passwords do not match.',
    };
  };

  const email = () => (target) => (
    {
      valid: /^\S+@\S+\.\S+$/.test(target.value),
      message: 'Invalid Email Address.',
    }
  );
  const validAddress = () => (target) => (
    {
      valid: target.value !== 'Choose',
      message: 'Invalid home address',
    });
  const phoneNumber = () => (target) => (
    {
      valid: !!target.value,
      message: 'Invalid phone number',
    });
  const dateOfBirth = (minDate) => (target) => {
    const min = new Date(minDate);
    const chosen = new Date(target.value);

    return {
      valid: min.getTime() < chosen.getTime(),
      message: `You must be at least ${new Date().getFullYear() - minDate.year}
       years old.`,
    };
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
