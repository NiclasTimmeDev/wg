import React, { useState } from "react";
import styled from "styled-components";

//components
import BurgerMenu from "./BurgerMenu";
import Menu from "./Menu";
import MenuItem from "./MenuItem";

const Wrapper = styled.div`
  width: 100vw;
  background-color: ${(props) => props.theme.background};
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 ${(props) => props.theme.paddingMini};
`;

const Logo = styled.div`
  padding: ${(props) => props.theme.paddingMini} 0;
  font-size: ${(props) => props.theme.trailing};
`;

const Navbar = (props) => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <Wrapper>
      <Logo>LOGO</Logo>
      <BurgerMenu showCross={showMenu} onClick={toggleMenu} />
      <Menu show={showMenu}>
        <MenuItem path="/">Home</MenuItem>
      </Menu>
    </Wrapper>
  );
};

export default Navbar;
