import { useContext } from 'react';
import Form from 'react-bootstrap/Form';
import { InputGroup } from 'react-bootstrap';
import AppContext from '../../context/context';
import useValidation from '../../hooks/useValidation';

function FormInput({
  id,
  value,
  props,
  isValid,
  isVisited,
  error,
}) {
  const {
    currentPageNumber,
  } = useContext(AppContext);

  const { onChange, onBlur } = useValidation(props.validations, currentPageNumber);

  return (
    <div className="form__input">
      <div className="form__label-wrapper">
        <InputGroup hasValidation>
          {props.type !== 'country' && (
          <>
            <Form.Control
              id={id}
              name={props.name}
              type={props.type}
              placeholder={props.name}
              value={value}
              isValid={isValid}
              isInvalid={!isValid && isVisited}
              onChange={onChange}
              onBlur={onBlur}
            />
            <Form.Control.Feedback type="invalid">
              {error}
            </Form.Control.Feedback>
            <br />
          </>
          )}

          {props.type === 'country' && (
          <Form.Select
            id="country"
            name={props.name}
            value={value}
            isValid={isValid}
            isInvalid={!isValid && isVisited}
            placeholder={props.name}
            onChange={onChange}
            onBlur={onBlur}
          >
            <option value="Choose...">Choose...</option>
            <option value="Afghanistan">Afghanistan</option>
            <option value="Åland Islands">Åland Islands</option>
            <option value="Albania">Albania</option>
            <option value="Algeria">Algeria</option>
            <option value="American Samoa">American Samoa</option>
            <option value="Bahrain">Bahrain</option>
            <option value="Bangladesh">Bangladesh</option>
            <option value="Barbados">Barbados</option>
            <option value="Belarus">Belarus</option>
            <option value="Belgium">Belgium</option>
            <option value="Belize">Belize</option>
            <option value="Benin">Benin</option>
            <option value="Bermuda">Bermuda</option>
            <option value="Bhutan">Bhutan</option>
            <option value="Bolivia">Bolivia</option>
            <option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
            <option value="Botswana">Botswana</option>
            <option value="Bouvet Island">Bouvet Island</option>
            <option value="Brazil">Brazil</option>
            <option value="British Indian Ocean Territory">
              British Indian Ocean
              Territory
            </option>
            <option value="Brunei Darussalam">Brunei Darussalam</option>
            <option value="Bulgaria">Bulgaria</option>
            <option value="Burkina Faso">Burkina Faso</option>
            <option value="Burundi">Burundi</option>
            <option value="Cambodia">Cambodia</option>
            <option value="Cameroon">Cameroon</option>
            <option value="Canada">Canada</option>
            <option value="Cape Verde">Cape Verde</option>
            <option value="Cayman Islands">Cayman Islands</option>
            <option value="Western Sahara">Western Sahara</option>
            <option value="Yemen">Yemen</option>
            <option value="Zambia">Zambia</option>
            <option value="Zimbabwe">Zimbabwe</option>
          </Form.Select>
          )}
          <br />
        </InputGroup>
      </div>
    </div>
  );
}

export default FormInput;
