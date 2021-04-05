import React from "react";
import NavBar from "../src/components/NavBar";
import Content from "../src/components/Content";
import f9 from "./assets/images/f9_feature.webp";
import rs from "./assets/images/rideshare_feature.webp";
import styled from "styled-components";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Ropa+Sans&display=swap');
  body {
    font-family: 'Ropa Sans', sans-serif;
    color: '#868686';
    height: 100%;
    margin: 0;
    background-image: url(${f9});
    background-attachment: fixed;
    background-position: top center;
    background-repeat: no-repeat;
    background-size: cover;
    @media (max-width: 800px) {
      margin: 0;
    }
  }
  body.blackTheme {
    background-image: url(${rs});
  }
`;

const Wrapper = styled.div`
  @media (max-width: 800px) {
    width: 100%;
  }
`;

const App = () => {
  return (
    <Wrapper>
      <GlobalStyle />
      <NavBar />
      <Content />
    </Wrapper>
  );
}
export default App;