import React, { useState, useEffect } from "react";
import styled from "styled-components";
import VideosBox from "../../components/VideosBox";
import Modal, { ModalProvider, BaseModalBackground } from "styled-react-modal";

const Title = styled.h1`
  text-align: center;
  width: 50%;
  margin: 40px auto;
  color: #007f56;
  font-weight: 100;
  letter-spacing: -1px;
  @media (max-width: 800px) {
    width: 95%;
  }
  span {
    font-weight: 800;
  }
`;

const Text = styled.p`
  width: 50%;
  margin: 0 auto;
  font-size: 20px;
  font-weight: 100;
  text-align: center;
  @media (max-width: 800px) {
    width: 95%;
  }
`;

const Button = styled.button`
  margin: 10px;
  border: 0;
  color: #fff;
  padding: 5px;
  background: ${(props) =>
    props.desktopTheme ? "#FE9481" : props.tabletTheme ? "#FCDA92" : "#9C8CB9"};
`;

const FadingBackground = styled(BaseModalBackground)`
  opacity: ${(props) => props.opacity};
  transition: opacity ease 200ms;
`;

const Content = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("blackTheme", isOpen);
  }, [isOpen]);

  return (
    <ModalProvider backgroundComponent={FadingBackground}>
      <Title>SpaceX Videos Search</Title>
      <Text>Search as you type videos interesting from elon musk company
      <Button mobileTheme onClick={() => setIsOpen(!isOpen)}>
        Change Theme
      </Button>
      </Text>      
      <VideosBox />
    </ModalProvider>
  );
};

export default Content;
