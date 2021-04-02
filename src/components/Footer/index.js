import React from "react";
import styled from "styled-components";

const FooterBar = styled.div`
  display: flex;
  align-items: center;
  div:nth-child(2) {
    margin-left: 40px;
  }
  div:nth-child(2) span {
    padding: 0 5px;
  }
  div:last-child {
  }
  @media (max-width: 800px) {
    flex-direction: column;
  }
`;

const Footer = () => {
  return (
    <FooterBar>
      <div>SpaceX 2020. Copyright.</div>
      <div>
        <span>Solar Panels</span>
        <span>Tesla</span>
      </div>
    </FooterBar>
  );
};

export default Footer;
