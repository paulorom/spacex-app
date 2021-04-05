import React from "react";
import NavBar from "../src/components/NavBar";
import Content from "../src/components/Content";
import Footer from "../src/components/Footer";
import f9 from "./assets/images/f9_feature.webp";
import rs from "./assets/images/rideshare_feature.webp";
import styled from "styled-components";
import { createGlobalStyle } from "styled-components";

//background-image: url(${bg});
const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700;800&display=swap');
  body {
    font-family: 'Open Sans', sans-serif;
    color: '#868686';
    height: 100%;
    margin: 0;
    background-attachment: fixed;
    background-position: top center;
    background-repeat: no-repeat;
    background-size: cover;
    background: url(${f9});
    @media (max-width: 800px) {
      margin: 0;
    }
  }
  body.blackTheme {
    background: url(${rs});
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
      <Footer />
    </Wrapper>
  );
}
export default App;