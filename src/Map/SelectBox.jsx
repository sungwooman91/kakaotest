import React, { useState } from "react";
import GetStoreMapInfo from "./GetStoreMapInfo";
// import styled from "styled-components";
import Sido from "./korea.district.json";

const SelectBox = () => {
  const [selectCity, setInputCity] = useState("");
  const [selectTown, setInputTown] = useState("");
  const [searchPlace, setSearchPlace] = useState({
    sevice: "",
    sido: "",
    gugun: "",
  });

  const Rent = "rent";
  const Bike = "bike";
  const Default = "서비스 선택";

  // 시도 Select 박스 상태값 저장
  const handleChangeCity = (e) => {
    setInputCity(e.target.value);
  };

  // 구군 Select 박스 상태값 저장
  const handleChangeTown = (e) => {
    setInputTown(e.target.value);

    setSearchPlace((prevState) => {
      return { ...prevState, sevice: "", sido: selectCity, gugun: selectTown };
    });
  };

  // 처리 결과
  console.log(selectCity);
  console.log(selectTown);
  console.log(searchPlace);

  return (
    <>
      <div className="bot_map">
        <span>
          <select className="" title="서비스 선택" defaultValue={Default}>
            <option value={Default}>서비스 선택</option>
            <option value={Rent}>{Rent}</option>
            <option value={Bike}>{Bike}</option>
          </select>
        </span>
        <span>
          <select title="시/도 선택" onChange={handleChangeCity}>
            <option value="001">시/도 선택</option>
            {Sido.map((item) => (
              <option value={item.region}>{item.region}</option>
            ))}
          </select>
        </span>
        <span>
          <select title="구/군 선택" onChange={handleChangeTown}>
            <option value="002">구/군 선택</option>
            {Sido.map((item) =>
              item.region === selectCity
                ? item.gugun.map((gugunItem) => (
                    <option key={gugunItem} value={gugunItem}>
                      {gugunItem}
                    </option>
                  ))
                : null
            )}
          </select>
        </span>
      </div>
      {/* <GetStoreMapInfo searchPlace={searchPlace} /> */}
    </>
  );
};

export default SelectBox;
