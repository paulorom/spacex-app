import React, { useState, useEffect } from "react";
import styled from "styled-components";
import VideosBox from "../../components/VideosBox";

const Title = styled.h1`
  text-align: center;
  width: 55%;
  margin: 20px auto 20px;
  color: #fff;
  font-weight: 600;
  transform: scaleY(1.1);
  letter-spacing: -1px;
  font-size: 46px;
  line-height: 46px;
  @media (max-width: 800px) {
    width: 90%;
  }
`;

const Text = styled.p`
  width: 70%;
  margin: 0 auto;
  font-size: 14px;
  font-weight: 600;
  transform: scaleY(1.1);
  letter-spacing: -1px;
  text-align: center;
  color: #fff;
  @media (max-width: 800px) {
    width: 95%;
  }
`;

const Button = styled.button`
  position: absolute;
  top: 20px;
  right: 10px;
  border: 0;
  padding: 10px;
  font-weight: 600;
  font-size: 12px; 
  color: #fff;
  background: transparent;
  @media (max-width: 800px) {
    top: 25px;
    right: 10px;
  }
`;

const Content = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("blackTheme", isOpen);
  }, [isOpen]);

  return (
    <>
      <Button mobileTheme onClick={() => setIsOpen(!isOpen)}>
        CHANGE THEME
      </Button>
      <Title>SPACEX <br /> VIDEOS SEARCH</Title>
      <Text>SEARCH AS YOU TYPE AND FIND ASTONISHING VIDEOS</Text>      
      <VideosBox />
    </>
  );
};

export default Content;
