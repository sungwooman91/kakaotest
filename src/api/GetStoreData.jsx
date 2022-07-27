import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { SetDataContext } from "../context/DataContext";

const GetStoreData = () => {
  // Context로 받는 파라미터로 상태 변환
  const setStoreInfo = useContext(SetDataContext);
  // 파싱처리
  // const [storeParser, setStoreParser] = useState(null);
  // API 호출 결과 값 저장
  const [storeData, setStoreData] = useState(null);
  // 로딩 상태 값
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchStores = async () => {
    try {
      setError(null);
      // API 호출 데이터 초기화
      setStoreData(null);
      setLoading(true);
      const response = await axios.get(
        "http://leaseapi.gobikebank.com/v1/repair/shop/?product_type=&corp_sido=&corp_gugun"
      );
      // console.log(response.data.result_data);
      setStoreData(response.data.result_data); // response.data를 storeData로 명명
    } catch (e) {
      setError(e);
    }
    setLoading(false);
  };

  // setStoreData를 두번째 인자에 넣지 않으면 무한 랜더링 진행...
  useEffect(() => {
    fetchStores();
  }, [setStoreData]);

  // context에 저장 -> 전역에서 호출 가능
  useEffect(() => {
    setStoreInfo(storeData);
  });

  if (loading) return <div>로딩중..</div>;

  if (error) return <div>에러가 발생했습니다</div>;

  if (!storeData) return null;

  return (
    <>
      <button onClick={fetchStores}>다시 불러오기</button>
      <ul>
        {storeData.map((store) => (
          <li key={store.corp_name}>
            <p>대리점명 : {store.bp_full_name}</p>
            {/* <p>대표연락처 : {store.corp_tel}</p>
            <p>주소 : {store.corp_address}</p>
            <p>영업시간 : {store.business_hours}</p> */}
            <p>Lon : {store.corp_lon}</p>
            <p>Lat : {store.corp_lat}</p>
            <p>서비스 구분 : {store.deal_type_text}</p>
          </li>
        ))}
      </ul>
    </>
  );
};

export default GetStoreData;
