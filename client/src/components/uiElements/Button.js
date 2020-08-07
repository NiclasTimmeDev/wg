import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

/**
 * Skeleton
 */
const Btn = styled.button`
  border-radius: ${(props) => props.theme.borderRadiusLarge};
  padding: 5px 10px;
  border: none;
  font-size: ${(props) => props.theme.following};
  font-weight: bold;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.3s linear;
  &:focus {
    outline: none;
  }
`;

const PrimaryBtn = styled(Btn)`
  background-color: ${(props) => props.theme.primaryCTA};
  &:hover {
    background-color: ${(props) => props.theme.dark};
  }
  width: ${(props) => props.fullWidth && "100%"};
`;
/**
 * Primary Button
 *
 * @prop {String }type
 *   Type of the button. Eg. "submit"
 * @prop {Boolean} fullWith
 *   Whether the button will be fill width or not.
 * @prop {Mixed} children
 *   The child elements of the button.
 */
const PrimaryButton = (props) => {
  return (
    <PrimaryBtn type={props.type} fullWidth={props.fullWidth}>
      {props.children}
    </PrimaryBtn>
  );
};

/**
 * Secondary Button
 *
 * @prop {String }type
 *   Type of the button. Eg. "submit"
 * @prop {Boolean} fullWith
 *   Whether the button will be fill width or not.
 * @prop {Mixed} children
 *   The child elements of the button.
 */
const SecondaryBtn = styled(Btn)`
  background-color: ${(props) => props.theme.dark};
  &:hover {
    background-color: #a1e2d3;
  }
  width: ${(props) => props.fullWidth && "100%"};
`;

const SecondaryButton = (props) => {
  return (
    <SecondaryBtn type={props.type} fullWidth={props.fullWidth}>
      {props.children}
    </SecondaryBtn>
  );
};

/**
 * Tertiary Button
 *
 * @prop {String }type
 *   Type of the button. Eg. "submit"
 * @prop {Boolean} fullWith
 *   Whether the button will be fill width or not.
 * @prop {Mixed} children
 *   The child elements of the button.
 */
const TertiaryBtn = styled(Btn)`
  background-color: ${(props) => props.theme.light};
  color: #fff;
  &:hover {
    background-color: #ad5ceb;
  }
  width: ${(props) => props.fullWidth && "100%"};
`;

const TertiaryButton = (props) => {
  return (
    <TertiaryBtn type={props.type} fullWidth={props.fullWidth}>
      {props.children}
    </TertiaryBtn>
  );
};

/**
 * Ghost Button
 *
 * @prop {String }type
 *   Type of the button. Eg. "submit"
 * @prop {Boolean} fullWith
 *   Whether the button will be fill width or not.
 * @prop {Mixed} children
 *   The child elements of the button.
 */
const GhostBtn = styled(Btn)`
  background-color: transparent;
  border: 2px solid ${(props) => props.theme.primaryCTA};
  color: ${(props) => props.theme.primaryCTA};
  &:hover {
    color: ${(props) => props.theme.light};
    border: 2px solid ${(props) => props.theme.light};
  }
  width: ${(props) => props.fullWidth && "100%"};
`;
const GhostButton = (props) => {
  return (
    <GhostBtn type={props.type} fullWidth={props.fullWidth}>
      {props.children}
    </GhostBtn>
  );
};

export { PrimaryButton, SecondaryButton, TertiaryButton, GhostButton };
