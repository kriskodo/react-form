import Form from './Form';
import FormPage from './FormPage';
import FormInput from './FormInput';
import './styles.css';
import validator from './validation/validator';

export default function App() {
  const handleSubmit = (state) => {
    console.log(state);
  };

  const Validator = validator();

  return (
    <div>
      <Form
        pages={[
          <FormPage
            title="Basic information"
            inputs={[
              <FormInput
                name="Name"
                type="text"
                validations={[Validator.required(), Validator.minLength(6)]}
              />,
              <FormInput
                name="Password"
                type="password"
                validations={[Validator.required(), Validator.securePassword()]}
              />,
              <FormInput name="Repeat Password" type="password" validations={[Validator.required(), Validator.repeatPassword('Password')]} />,
            ]}
          />,
          <FormPage
            title="Where can we find you?"
            inputs={[
              <FormInput name="Email Address" type="email" validations={[Validator.required(), Validator.email()]} />,
              <FormInput name="Address" type="address" validations={[Validator.required(), Validator.validAddress()]} />,
              <FormInput name="Phone number" type="phone" validations={[Validator.required(), Validator.phoneNumber()]} />,
            ]}
          />,
          <FormPage
            title="Final bits"
            inputs={[
              <FormInput name="Date of birth" type="date" validations={[Validator.dateOfBirth('2011-11-22')]} />,
              <FormInput name="Country" type="country" validations={[Validator.required()]} />,
            ]}
          />,
        ]}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
