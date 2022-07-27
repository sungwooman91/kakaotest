/*global kakao */
import React, { useEffect } from "react";
// import { DataContext } from "../context/DataContext";
import {
  getStoreInfo,
  useStoreState,
  useStoreDispatch,
} from "../api/StoresProvider";

const BbServiceStore = () => {
  const state = useStoreState();
  const dispatch = useStoreDispatch();
  const { data: user, loading, error } = state.user;

  useEffect(() => {
    getStoreInfo(dispatch);
  }, [dispatch]);

  // 다중 마커
  //#endregion
  console.log("test Log");
  console.log(user);
  // console.log(getStoreResultData);
  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  // if (!user) return null;

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
