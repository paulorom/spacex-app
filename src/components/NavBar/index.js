import React from "react";
import {ReactComponent as Logo} from "../../assets/images/logo.svg";
import styled from "styled-components";

const Nav = styled.nav`
  display: flex;
  justify-content: center;
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

const Link = styled.span`
  color: #007f56;
  font-weight: 100;
  padding: 0 5px;
  font-size: 1.4rem;
  letter-spacing: -1px;
  transform: scaleX(0.9);
  text-shadow: 0 2px white;
  @media (max-width: 800px) {
    display: none;
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
