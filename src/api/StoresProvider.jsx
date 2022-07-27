import React, { createContext, useReducer, useContext } from "react";
import axios from "axios";
// UsersContext 에서 사용 할 기본 상태
const initialState = {
  user: {
    loading: false,
    data: null,
    error: null,
  },
};

// 로딩중일 때 바뀔 상태 객체
const loadingState = {
  loading: true,
  data: null,
  error: null,
};

// 성공했을 때의 상태 만들어주는 함수
const success = (data) => ({
  loading: false,
  data,
  error: null,
});

// 실패했을 때의 상태 만들어주는 함수
const error = (error) => ({
  loading: false,
  data: null,
  error: error,
});

// 위에서 만든 객체 / 유틸 함수들을 사용하여 리듀서 작성
function storeReducer(state, action) {
  switch (action.type) {
    case "GET_STORES":
      return {
        ...state,
        user: loadingState,
      };
    case "GET_STORES_SUCCESS":
      return {
        ...state,
        user: success(action.data),
      };
    case "GET_STORES_ERROR":
      return {
        ...state,
        user: error(action.error),
      };
    default:
      throw new Error(`Unhanded action type: ${action.type}`);
  }
}

// State 용 Context 와 Dispatch 용 Context 따로 만들어주기
const StoreStateContext = createContext(null);
const StoreDispatchContext = createContext(null);

// 위에서 선언한 두가지 Context 들의 Provider 로 감싸주는 컴포넌트
export function StoresProvider({ children }) {
  const [state, dispatch] = useReducer(storeReducer, initialState);
  return (
    <StoreStateContext.Provider value={state}>
      <StoreDispatchContext.Provider value={dispatch}>
        {children}
      </StoreDispatchContext.Provider>
    </StoreStateContext.Provider>
  );
}

// State 를 쉽게 조회 할 수 있게 해주는 커스텀 Hook
export function useStoreState() {
  const state = useContext(StoreStateContext);
  if (!state) {
    throw new Error("Cannot find UsersProvider");
  }
  return state;
}

// Dispatch 를 쉽게 사용 할 수 있게 해주는 커스텀 Hook
export function useStoreDispatch() {
  const dispatch = useContext(StoreDispatchContext);
  if (!dispatch) {
    throw new Error("Cannot find UsersProvider");
  }
  return dispatch;
}

export async function getStoreInfo(dispatch) {
  dispatch({ type: "GET_STORES" });
  try {
    const response = await axios.get(
      "http://leaseapi.gobikebank.com/v1/repair/shop/?product_type=&corp_sido=&corp_gugun"
    );
    // console.log(response.data.result_data);
    dispatch({ type: "GET_STORES_SUCCESS", data: response.data.result_data });
  } catch (e) {
    dispatch({ type: "GET_STORES_ERROR", error: e });
  }
}
