import React from "react";
import {ReactComponent as Logo} from "../../assets/images/logo.svg";
import styled from "styled-components";

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  height: 80px;
  div:last-child {
    display: flex;
    align-items: center;
  }
`;

const LogoContainer = styled.div`
  top: 32px;
  left: 50px;
  width: 210px;
  height: auto;
  div:svg {
    color: #fff;
  }
  @media (max-width: 800px) {
    width: 150px;
  }
`;

const NavBar = () => {
  return (
    <Nav>
      <LogoContainer>
        <Logo />
      </LogoContainer>      
    </Nav>
  );
};

export default NavBar;
