import Form from './Form';
import FormPage from './FormPage';
import FormInput from './FormInput';
import './styles.css';
import validator from './validation/validator';

export default function App() {
  const handleSubmit = (state) => {
    console.log(state);
  };

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
                validations={[validator().required(), validator().minLength(6)]}
              />,
              <FormInput
                name="Password"
                type="password"
                validations={[validator().required(), validator().securePassword()]}
              />,
              <FormInput name="Repeat Password" type="password" validations={[validator().required(), validator().repeatPassword('Password')]} />,
            ]}
          />,
          <FormPage
            title="Where can we find you?"
            inputs={[
              <FormInput name="Email Address" type="email" validations={[validator().required(), validator().email()]} />,
              <FormInput name="Address" type="address" validations={[validator().required(), validator().validAddress()]} />,
              <FormInput name="Phone number" type="phone" validations={[validator().required(), validator().phoneNumber()]} />,
            ]}
          />,
          <FormPage
            title="Final bits"
            inputs={[
              <FormInput name="Date of birth" type="date" validations={[validator().dateOfBirth(new Date().getFullYear() - 18)]} />,
              <FormInput name="Country" type="country" validations={[validator().required()]} />,
            ]}
          />,
        ]}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
