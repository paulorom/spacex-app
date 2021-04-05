import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";
import "react-id-swiper/src/styles/scss/swiper.scss";
import Swiper from "react-id-swiper/lib/ReactIdSwiper.full";


const SearchContainer = styled.div`
  top: 32px;
  left: 50px;
  height: auto;
  margin: 20px auto;
  text-align: center;
  input {
    border: none;
    outline: 0;
    padding: 0;
    margin: 0;
    vertical-align: bottom;
    text-align: inherit;
    height: 46px;
    width: 30vw;
    background-color: #292929;
    color: #fff;
    font-weight: 600;
    font-size: 16px;
    text-transform: uppercase;
  }
  @media (max-width: 800px) {
    input {
      width: 80vw;
    }
  }
`;

const Container = styled.div`
  display: flex;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 10px 35px;
  width: 280px !important;
  height: 252px !important;
  background: #f0e9dc;
`;

const Card = styled.div`
  background: #fff;
  font-size: 16px;
  font-weight: 100;
  text-align: center;
  margin: 0;
  text-align: justify;
  p {
    padding: 10px;
    margin: 0;
    font-weight: 600;
    text-align: center;
  }
`;

const BoxImage = styled.div`
  text-align: center;
  img {
    width: 100%;
    width: 280px;
    height: 150px; 
    object-fit: cover;
  }
  h2 {
    font-weight: 100;
    color: #fff;
  }
`;

const Link = styled.a`
  width: calc(100% - 20px);
  height: 100% !important;
  text-align: center;
  text-decoration: unset;
  font-weight: 600;
  color: #fff;
  padding: 10px;
  background: #000;
`;

const params = {
  spaceBetween: 30,
};

const LAUNCHES = gql`
  {
    launchesPast(limit: 25) {     
        mission_name
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
                  <p><Link target="_blank" href={links.video_link}>WATCH NOW</Link></p>
              </Card>            
            </Container>
            )
          )}
      </Swiper>
    </>  
};

export default VideosBox;
