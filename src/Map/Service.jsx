import React from "react";
import styled from "styled-components";
import BbServiceStore from "./BbServiceStore";
// import MapContainer from "./MapContainer";
import SelectBox from "./SelectBox";

const ServiceWrap = styled.div`
  width: 80%;
  /* display: flex; */
  justify-content: center;
`;

const Service = () => {
  return (
    <>
      <ServiceWrap>
        <div className="top">
          <h1>서비스 네트워크</h1>
          <h2>바이크뱅크의 전국 판매/서비스점을 확인하세요.</h2>
        </div>
        <SelectBox />
        <div className="map_wrap">
          <div className="map_display">
            <BbServiceStore />
          </div>

          <div className="map_text">{/* <MapContainer /> */}</div>
        </div>
      </ServiceWrap>
    </>
  );
};

export default Service;
