import React, { useEffect, useRef } from "react";

const MapContainer = () => {
  const { kakao } = window;
  useEffect(() => {
    const address = "서울 마포구 망원동 57-38";
    const container = document.getElementById("map");
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };
    const map = new kakao.maps.Map(container, options);
    //위도, 경도로 변환 및 마커표시
    var geocoder = new kakao.maps.services.Geocoder();
    geocoder.addressSearch(address, function (result, status) {
      if (status === kakao.maps.services.Status.OK) {
        var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
        var marker = new kakao.maps.Marker({
          map: map,
          position: coords,
        });

        map.setCenter(coords);
      }
    });
  }, []);
  return (
    <div
      id="map"
      style={{
        width: "100%",
        height: "300px",
      }}
    ></div>
  );
};

export default MapContainer;
