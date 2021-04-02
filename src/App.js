import React from "react";
import NavBar from "../src/components/NavBar";
import Content from "../src/components/Content";
import Footer from "../src/components/Footer";
//import bg from "./assets/images/bg.jpg";
import styled from "styled-components";
import { createGlobalStyle } from "styled-components";

//background-image: url(${bg});
const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700;800&display=swap');
  body {
    font-family: 'Open Sans', sans-serif;
    color: '#868686';
    height: 100%;
    margin: 7px 65px;
    
    background-repeat: repeat;
    @media (max-width: 800px) {
      margin: 10px;
    }
  }
  body.blackTheme {
    background: black;
    color: white;
  }
  body.blackTheme div div div p {
    color: black;
  }
`;

const Wrapper = styled.div`
  width: 1200px;
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