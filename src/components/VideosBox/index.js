import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";
import Modal, { ModalProvider, BaseModalBackground } from "styled-react-modal";
import "react-id-swiper/src/styles/scss/swiper.scss";
import Swiper from "react-id-swiper/lib/ReactIdSwiper.full";

const Container = styled.div`
  display: flex;
  margin: 20px auto;
  justify-content: center;
  border-radius: 10px;
  position: relative;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 10px 35px;
  width: 280px !important;
  background: #f0e9dc;
  @media (max-width: 800px) {
    flex-direction: column;
  }
`;

const Card = styled.div`
  background: #fff;
  font-size: 16px;
  font-weight: 100;
  text-align: center;
  margin: 0;
  text-align: justify;
  width: 350px;
  @media (max-width: 800px) {
    flex-direction: column;
    width: calc(100% - 20px);
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
  img {
    width: 100%;
  }
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

const SearchContainer = styled.div`
  top: 32px;
  left: 50px;
  height: auto;
  margin: 0 auto;
  input {
    width: 50vw;
  }
  @media (max-width: 800px) {
    input {
      width: 80vw;
    }
  }
`;

const params = {
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: "auto",
  initialSlide: 2,
  slideActiveClass: "swiper-slide-active",
  spaceBetween: 0,
  coverflowEffect: {
    rotate: 0,
    stretch: 10,
    depth: 100,
    modifier: 1,
    slideShadows: false,
  },
  breakpoints: {
    1024: {
      coverflowEffect: {
        rotate: 0,
        stretch: -25,
        depth: 50,
        modifier: 1,
        slideShadows: false,
      },
    },
  },
};

const CardDetails = () => {
  return (
    <StyledCardDetails>
      Aqui é uma região destinada aos detalhes do primeiro Card.
    </StyledCardDetails>
  );
};

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
        </p>
        <br />
        <button onClick={toggleModal}>Fechar</button>
      </StyledModal>
    </div>
  );
};

const LAUNCHES = gql`
  {
    launchesPast(limit: 20) {     
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
  const [isDisplayDataSet, setIsDisplayDataSet] = useState(false);
  const [displayData, setDisplayData] = useState([]);

  useEffect(() => {
    if (!loading && !isDisplayDataSet) {
        setDisplayData(data.launchesPast);
        setIsDisplayDataSet(true);
    }
  }, [isDisplayDataSet, displayData, data, loading])

  function handleSearch(e) {
    const { value } = e.target;
    const matchingElements = data.launchesPast.filter(({ mission_name }) =>
        mission_name.toLowerCase().includes(value.toLowerCase())
    );
    setDisplayData(matchingElements);
  }
  
  return errors
    ? "Error!"
    : loading
    ? "Loading..."
    : 
    <>
      <SearchContainer>
        <input type="text" onChange={handleSearch} placeholder="Search..." />
      </SearchContainer>

      <Swiper {...params}>
        {
          displayData.map(
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
                    <img
                      src={`https://img.youtube.com/vi/${links.video_link.replace(
                        "https://youtu.be/",
                        ""
                      )}/0.jpg`}
                      alt={mission_name}
                    />
                  </BoxImage>
                  <p>{mission_name}</p>
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
          )}
      </Swiper>
    </>  
};

export default VideosBox;
