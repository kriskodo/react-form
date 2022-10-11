import Form from './Form';
import FormPage from './FormPage';
import FormInput from './FormInput';
import './styles.css';

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
                /* validation={[Validator.MAX_LENGTH(6)]} */
              />,
              <FormInput
                name="Password"
                type="password"
                /* validation={[Validator.SECURE_PASSWORD()]} */
              />,
              <FormInput name="Repeat Password" type="password" />,
            ]}
          />,
          <FormPage
            title="Where can we find you?"
            inputs={[
              <FormInput name="Email Address" type="email" />,
              <FormInput name="Address" type="address" />,
              <FormInput name="Phone number" type="phone" />,
            ]}
          />,
          <FormPage
            title="Final bits?"
            inputs={[
              <FormInput name="Date of birth" type="date" />,
              <FormInput name="Country" type="country" />,
            ]}
          />,
        ]}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
