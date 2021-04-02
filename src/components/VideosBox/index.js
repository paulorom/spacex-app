import React, { useState } from "react";
import { ReactComponent as Logo } from "../../assets/images/logo.svg";
import styled from "styled-components";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";
import Modal, { ModalProvider, BaseModalBackground } from "styled-react-modal";

const Container = styled.div`
  display: flex;
  margin: 20px auto;
  justify-content: center;
  @media (max-width: 800px) {
    flex-direction: column;
  }
`;

const Card = styled.div`
  background: #fff;
  font-size: 16px;
  font-weight: 100;
  text-align: center;
  margin: 0 10px;
  text-align: justify;
  width: 350px;
  @media (max-width: 800px) {
    flex-direction: column;
    width: calc(100% - 20px);
    margin: 10px;
  }
  p {
    padding: 10px;
    margin: 0;
  }
  button {
    margin: 10px;
    float: right;
    border: 0;
    padding: 5px;
    color: 
    background: ${(props) => (props.mobileTheme ? "#868686" : "white")};
  }
`;

const BoxImage = styled.div`
  text-align: center;
  padding: 15px;
  background: ${(props) =>
    props.desktopTheme ? "#FE9481" : props.tabletTheme ? "#FCDA92" : "#9C8CB9"};
  h2 {
    font-weight: 100;
    color: #fff;
  }
`;

const Button = styled.button`
  margin: 10px;
  float: right;
  border: 0;
  color: #fff;
  padding: 5px;
  background: ${(props) =>
    props.desktopTheme ? "#FE9481" : props.tabletTheme ? "#FCDA92" : "#9C8CB9"};
`;

const CardDetails = () => {
  return (
    <StyledCardDetails>
      Aqui é uma região destinada aos detalhes do primeiro Card.
    </StyledCardDetails>
  );
};

const StyledCardDetails = styled.div`
  width: 80%;
  margin: 10px auto;
  padding: 10px;
  background: white;
  @media (max-width: 800px) {
    width: 100%;
  }
`;

const StyledModal = Modal.styled`
  width: 20rem;
  height: 20rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  opacity: ${(props) => props.opacity};
  transition: opacity ease 500ms;
`;

const ModalButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [opacity, setOpacity] = useState(0);

  const toggleModal = (e) => {
    setIsOpen(!isOpen);
  };

  const afterOpen = () => {
    setTimeout(() => {
      setOpacity(1);
    }, 10);
  };

  const beforeClose = () => {
    return new Promise((resolve) => {
      setOpacity(0);
      setTimeout(resolve, 200);
    });
  };

  return (
    <div>
      <Button tabletTheme onClick={toggleModal}>
        Leia mais...
      </Button>
      <StyledModal
        isOpen={isOpen}
        afterOpen={afterOpen}
        beforeClose={beforeClose}
        onBackgroundClick={toggleModal}
        onEscapeKeydown={toggleModal}
        opacity={opacity}
        backgroundProps={{ opacity }}
      >
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </p>
        <br />
        <button onClick={toggleModal}>Fechar</button>
      </StyledModal>
    </div>
  );
};

const LAUNCHES = gql`
  {
    launchesPast(limit: 10) {
      mission_name
      launch_date_local
      launch_site {
        site_name_long
      }
      links {
        video_link
      }
      rocket {
        rocket_name
      }
      details
    }
  }
`;

const VideosBox = () => {
  const [showCardDetails, setCardDetails] = useState(false);

  const { errors, loading, data } = useQuery(LAUNCHES);

  return errors
    ? "Error!"
    : loading
    ? "Loading..."
    : data.launchesPast.map(
        ({
          mission_name,
          launch_date_local,
          launch_site,
          rocket,
          details,
          links,
        }) => (
          <Container key={mission_name}>
            <Card>
              <BoxImage desktopTheme>
                <h2>{mission_name}</h2>
              </BoxImage>

              <p>{launch_date_local}</p>
              <p>{rocket.rocket_name}</p>
              <p>{links.video_link}</p>
              <p>{details}</p>
              <Button desktopTheme onClick={setCardDetails}>
                Leia mais...
              </Button>
              <ModalButton />
              {showCardDetails && <CardDetails />}
            </Card>            
          </Container>
        )
      );
};

export default VideosBox;
