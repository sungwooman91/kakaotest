/*global kakao */
import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { DataContext } from "../context/DataContext";
import markImageBb from "../image/icon_marker_bikebank.png";
import markImageRed from "../image/icon_marker_red.png";
import markImageBlue from "../image/icon_marker_blue.png";
import markImageYello from "../image/icon_marker_yellow.png";

const headOfficeInfo = {
  bp_full_name: "바이크뱅크 본사",
  corp_tel: "1522-9008",
  corp_address: "대구광역시 달서구 성서공단로 11길 62",
  business_hours: "9:00 ~ 18:00",
};

const StoreDetail = styled.div`
  padding: 29px 58px;
  display: flex;
  justify-content: space-around;
  flex-flow: row wrap;
  align-items: stretch;
  flex-wrap: wrap;

  .title {
    flex: 1 1 40%;
    font-size: 24px;
    letter-spacing: -0.6px;
    font-weight: bold;
  }

  .contents {
    margin: 0 0 10px 0;
    display: flex;
    justify-content: space-around;
    flex-flow: row wrap;
    align-items: stretch;
    flex-wrap: nowrap;
  }

  .sub_title {
    flex-basis: 90px;
    color: #323232;
    font-weight: bold;
  }

  .sub_contents {
    flex-grow: 1;
    color: #5d5d5d;
    letter-spacing: -0.6px;
  }
`;
const { kakao } = window; // eslint-disable-line no-unused-vars

const BbServiceStore = () => {
  const getStoreResultData = useContext(DataContext);

  // 지도 함수
  //#region [지도 함수]
  useEffect(() => {
    mapSetup();
  });

  const mapSetup = () => {
    console.log("지도 그리는중...");
    const container = document.getElementById("map");
    const homePosition = new kakao.maps.LatLng(35.8404138, 128.4891459);
    // 지도 생성 옵션
    const options = {
      center: homePosition,
      level: 6,
    };
    // 지도 생성 => 지도를 먼저 생성하고 부가적인 기능들을 생성한다.
    const map = new kakao.maps.Map(container, options);

    //마커 이미지 설정
    const imageSrc = markImageBb,
      imageSize = new kakao.maps.Size(26, 41);

    // 본사 마커 생성
    const getMarkerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
    const mMarker = new kakao.maps.Marker({
      position: homePosition,
      title: headOfficeInfo.bp_full_name,
      image: getMarkerImage,
      zIndex: 1,
    });
    mMarker.setMap(map);

    // 마커 클릭이벤트 리스너
    kakao.maps.event.addListener(mMarker, "click", () => {
      document.getElementById("storename").innerHTML =
        headOfficeInfo.bp_full_name;
      document.getElementById("corp_tel").innerHTML = headOfficeInfo.corp_tel;
      document.getElementById("corp_addr").innerHTML =
        headOfficeInfo.corp_address;
      document.getElementById("corp_hours").innerHTML =
        headOfficeInfo.business_hours;
    });
    // Zoom 컨트롤러 생성
    const control = new kakao.maps.ZoomControl();
    map.addControl(control, kakao.maps.ControlPosition.TOPRIGHT);

    // getStoreResultData 값 생성 됬을때
    if (getStoreResultData) {
      console.log("getStoreResultData 데이터 들어옴");
      // 지점다중 마커
      for (let idx = 0; idx < getStoreResultData.length; idx++) {
        let getData = getStoreResultData[idx];
        const serviceArea = getData.deal_type_text;
        // 대리점, 지점 구분
        if (serviceArea === "소모품협력점") {
          const getImageSrc = markImageBlue;
          getMarkerStore(map, getImageSrc, imageSize, getData);
        } else if (serviceArea === "대리점") {
          const getImageSrc = markImageRed;
          getMarkerStore(map, getImageSrc, imageSize, getData);
        } else {
          const getImageSrc = markImageYello;
          getMarkerStore(map, getImageSrc, imageSize, getData);
        }
      }
    } else {
      console.log("getStoreResultData null 값임");
    }

    // 지점별 마커 등록 함수
    function getMarkerStore(map, img, imageSize, getData) {
      const getMarkerImageStore = new kakao.maps.MarkerImage(img, imageSize);
      const mMarker = new kakao.maps.Marker({
        position: new kakao.maps.LatLng(getData.corp_lat, getData.corp_lon),
        title: getData.bp_full_name,
        image: getMarkerImageStore,
      });
      mMarker.setMap(map);

      // 마커 클릭이벤트 리스너
      kakao.maps.event.addListener(mMarker, "click", () => {
        document.getElementById("storename").innerHTML = getData.bp_full_name;
        document.getElementById("corp_tel").innerHTML = getData.corp_tel;
        document.getElementById("corp_addr").innerHTML = getData.corp_address;
        document.getElementById("corp_hours").innerHTML =
          getData.business_hours;
      });
    }
    // mapSetup End
  };
  return (
    <>
      <div
        style={{
          width: "100%",
          display: "inline-block",
          marginLeft: "5px",
          marginRight: "5px",
        }}
      >
        <div id="map" style={{ width: "99%", height: "500px" }}></div>

        <StoreDetail>
          <div id="title" className="store_title">
            <span id="storename" className="sub_title">
              {headOfficeInfo.bp_full_name}
            </span>
          </div>
          <div id="contents" className="content_text">
            <div className="contents_1">
              <span className="sub_title">주소</span>
              <span id="corp_addr" className="sub_contents">
                {headOfficeInfo.corp_address}
              </span>
            </div>
            <div className="contents_1">
              <span className="sub_title">연락처</span>
              <span id="corp_tel" className="sub_contents">
                {headOfficeInfo.corp_tel}
              </span>
            </div>
            <div className="contents_1">
              <span className="sub_title">영업시간</span>
              <span id="corp_hours" className="sub_contents">
                {headOfficeInfo.business_hours}
              </span>
            </div>
          </div>
        </StoreDetail>
      </div>
    </>
  );
};

export default BbServiceStore;
