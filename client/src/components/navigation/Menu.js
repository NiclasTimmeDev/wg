import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Wrapper = styled.div`
  background-color: ${(props) => props.theme.primaryContrast};
  width: 30vw;
  height: 100vh;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: space-around;
  color: #fff;
  position: fixed;
  top: 0;
  right: ${(props) => (props.show ? "0" : "-30vw")};
  transition: right 0.3s ease-in-out;
  z-index: 2000;
`;

const Menu = (props) => {
  return <Wrapper show={props.show}>{props.children}</Wrapper>;
};

Menu.propTypes = {
  show: PropTypes.bool.isRequired,
};

export default Menu;
