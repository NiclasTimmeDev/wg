import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Link } from "react-router-dom";

// LINK STYLING
const Item = styled.div`
  font-size: ${(props) => props.theme.leading};
  font-weight: bold;
  transition: color 0.5s ease-in-out;
  a {
    text-decoration: none;
    color: white;
  }
  /* a &:hover {
    color: ${(props) => props.theme.secondaryCTA};
    transition: color 0.5s ease-in-out;
  } */
`;

const MenuItem = (props) => {
  return (
    <Item>
      <Link to={props.path}>{props.children}</Link>
    </Item>
  );
};

MenuItem.propTypes = {
  path: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default MenuItem;
