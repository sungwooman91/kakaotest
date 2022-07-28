/*global kakao */
import { useEffect } from "react";
import styled from "styled-components";
// import { DataContext } from "../context/DataContext";
// import markImageRed from "../image/icon_marker_red.png";

const ServiceWrap = styled.div`
  width: 90%;
  /* display: flex; */
  justify-content: center;
`;
const { kakao } = window; // eslint-disable-line no-unused-vars

const GetStoreMapInfo = ({ searchPlace }) => {
  // 지도 함수
  //#region [지도 함수]

  useEffect(() => {
    var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
    const container = document.getElementById("myMap");
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };
    const map = new kakao.maps.Map(container, options);

    const ps = new kakao.maps.services.Places();

    ps.keywordSearch(searchPlace, placesSearchCB);

    function placesSearchCB(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        let bounds = new kakao.maps.LatLngBounds();

        for (let i = 0; i < data.length; i++) {
          // displayMarker(data[i]);
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }

        map.setBounds(bounds);
      }
    }
  }, [searchPlace]);

  // mapSetup End

  return (
    <>
      <ServiceWrap>
        <div className="top">
          <h1>서비스 네트워크</h1>
          <h2>바이크뱅크의 전국 판매/서비스점을 확인하세요.</h2>
        </div>
        <div className="map_wrap">
          <div className="map_display">
            <div
              style={{
                width: "100%",
                display: "inline-block",
                marginLeft: "5px",
                marginRight: "5px",
              }}
            >
              <div id="myMap" style={{ width: "99%", height: "500px" }}></div>
            </div>
          </div>
          <div className="map_text">a</div>
        </div>
      </ServiceWrap>
    </>
  );
};

export default GetStoreMapInfo;
