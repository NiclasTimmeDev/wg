import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

/**
 * Wrapper Style.
 */
const Wrapper = styled.div`
  padding: 3px;
  display: flex;
  flex-flow: column;
  align-items: center;
  height: ${(props) => (props.showCross ? "" : "25px")};
  justify-content: space-between;
  cursor: pointer;
  z-index: 2001; /*Menu has 2000*/
`;

/**
 * Bar styles.
 */
const Bar = styled.div`
  width: 30px;
  height: 3px;
  background-color: #fff;
`;

const Bar1 = styled(Bar)`
  transform: ${(props) => (props.showCross ? "rotate(45deg)" : "")};
  transition: transform 0.5s;
`;

const Bar2 = styled(Bar)`
  display: ${(props) => (props.showCross ? "none" : "")};
`;

const Bar3 = styled(Bar)`
  transform: ${(props) => (props.showCross ? "rotate(-45deg)" : "")};
  transition: transform 0.5s;
`;

/**
 * The Burger Menu.
 *
 * @prop {Mixed} onClick
 *   Behavriour when clicking on the menu
 * @prop {Boolean} showCross
 *   Showing cross instead of menu if true
 */
const BurgerMenu = (props) => {
  return (
    <Wrapper showCross={props.showCross} onClick={props.onClick}>
      <Bar1 showCross={props.showCross} />
      <Bar2 showCross={props.showCross} />
      <Bar3 showCross={props.showCross} />
    </Wrapper>
  );
};

BurgerMenu.propTypes = {
  onClick: PropTypes.func,
  showCross: PropTypes.bool,
};

export default BurgerMenu;
