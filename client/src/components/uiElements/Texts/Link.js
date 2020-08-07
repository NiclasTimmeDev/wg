import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const A = styled(Link)`
  color: ${(props) => props.theme.light} 0;
  text-decoration: ${(props) => (props.underline ? "underline" : "none")};
`;

/**
 *
 * @prop {String} to
 *   The route the link leads to.
 * @prop {Boolean} underline
 *   Determines if the link is underlined or not.
 * @prop {Mixed} children
 *   The child components.
 */
const Anchor = (props) => {
  return (
    <A to={props.to} underline={props.underline}>
      {props.children}
    </A>
  );
};

export default Anchor;
