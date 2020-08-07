import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

/**
 * Wrapper style.
 */
const Wrapper = styled.div`
  width: 100%;
  padding: ${(props) => props.theme.paddingMini} 0;
`;

/**
 * Input style.
 */
const Input = styled.input`
  background-color: transparent;
  border: ${(props) =>
    props.error ? "3px solid red" : `3px solid ${props.theme.slightGrey}`};
  border-radius: ${(props) => props.theme.borderRadiusMedium};
  padding: ${(props) => props.theme.paddingMini};
  width: 100%;
  margin-bottom: ${(props) => (props.error ? "1px" : props.theme.marginText)};
`;

/**
 * Error style.
 */
const Error = styled.div`
  font-size: ${(props) => props.theme.minor};
  color: red;
  margin-bottom: ${(props) => props.theme.marginText};
`;

/**
 * Form element incl. error message
 *
 * @prop {String} type
 *   Input type.
 * @prop {String} name
 *   The input name.
 * @prop {String} placeholder
 *   The placeholder text.
 * @prop {Mixed} value
 *   The value of the input.
 * @prop {Boolean} error
 *   True if an error is present.
 * @prop {String} errorText
 *   Text that is shown when error is present.
 * @prop {mixed} onChange
 *   Behaviour when value changes.
 */
const FormGroup = (props) => {
  return (
    <Wrapper>
      <Input
        placeholder={props.placeholder}
        name={props.name}
        value={props.value}
        error={props.error}
        onChange={props.onChange}
        type={props.type}
      />
      {props.error && <Error>{props.errorText}</Error>}
    </Wrapper>
  );
};

FormGroup.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.any.isRequired,
  error: PropTypes.bool.isRequired,
  errorText: PropTypes.string.isRequired,
  onChange: PropTypes.any,
};

export { FormGroup };
