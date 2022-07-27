/*global kakao */
import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../context/DataContext";

const BikeBank = {
  lat: 35.8404138,
  lng: 128.4891459,
};

const BbServiceStore = () => {
  const { kakao } = window; // eslint-disable-line no-unused-vars
  const getStoreResultData = useContext(DataContext);
  const imageSrc = "../image/icon_marker_red.png", // 마커이미지의 주소입니다
    imageSize = new kakao.maps.Size(26, 41), // 마커이미지의 크기입니다
    imageOption = { offset: new kakao.maps.Point(26, 41) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다

  // 지도 함수
  //#region [지도 함수]
  useEffect(() => {
    mapSetup();
  }, [getStoreResultData]);

  const mapSetup = () => {
    console.log("지도 그리는중...");
    const container = document.getElementById("map");
    const homePosition = new kakao.maps.LatLng(BikeBank.lat, BikeBank.lng);
    // 지도 생성 옵션
    const options = {
      center: homePosition,
      level: 3,
    };
    // 지도 생성 => 지도를 먼저 생성하고 부가적인 기능들을 생성한다.
    const map = new kakao.maps.Map(container, options);
    // 마커 이미지
    const markerImage = new kakao.maps.MarkerImage(
      imageSrc,
      imageSize,
      imageOption
    );
    // 메인 마커 생성
    const Marker = new kakao.maps.Marker({
      position: homePosition,
      title: "바이크뱅크 본사",
      image: markerImage,
    });
    Marker.setMap(map);
    // Zoom 컨트롤러 생성
    const control = new kakao.maps.ZoomControl();
    map.addControl(control, kakao.maps.ControlPosition.TOPRIGHT);

    // getStoreResultData 값 생성 됬을때
    if (getStoreResultData) {
      // console.log("getStoreResultData 데이터 들어옴");
      console.log(getStoreResultData);
      // 지점다중 마커
      for (let idx = 0; idx < getStoreResultData.length; idx++) {
        // 대리점, 지점 구분
        if (getStoreResultData[idx].deal_type_text === "소모품협력점") {
          const mMarker = new kakao.maps.Marker({
            position: new kakao.maps.LatLng(
              getStoreResultData[idx].corp_lat,
              getStoreResultData[idx].corp_lon
            ),
            title: getStoreResultData[idx].bp_full_name,
          });
          mMarker.setMap(map);
        } else {
          const mMarker = new kakao.maps.Marker({
            position: new kakao.maps.LatLng(
              getStoreResultData[idx].corp_lat,
              getStoreResultData[idx].corp_lon
            ),
            title: getStoreResultData[idx].bp_full_name,
          });
          mMarker.setMap(map);
        }
      }
    } else {
      console.log("getStoreResultData null 값임");
    }
  }; // mapSetup End

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

        <div className="data_txt">
          <div id="tilte" className="store_title">
            <span className="sub_title">스토어 제목</span>
          </div>
          <div id="contents" className="content_text">
            <div className="contents_1">
              <span className="sub_title">주소</span>
              <span id="corp_addr" className="sub_contents"></span>
            </div>
            <div className="contents_1">
              <span className="sub_title">연락처</span>
              <span id="corp_tel" className="sub_contents">
                번호번호
              </span>
            </div>
            <div className="contents_1">
              <span className="sub_title">영업시간</span>
              <span id="corp_hours" className="sub_contents">
                시간시간
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BbServiceStore;
