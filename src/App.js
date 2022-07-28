import { useState } from "react";
import { DataContext, SetDataContext } from "./context/DataContext";
import Service from "./Map/Service";
import "./App.css";
import GetStoreData from "./api/GetStoreData";
import { StoresProvider } from "./api/StoresProvider";
import LandingPage from "./Map/LandingPage";
import SelectBox from "./Map/SelectBox";

function App() {
  const [storeInfo, setStoreInfo] = useState(null);
  // console.log(storeInfo);
  return (
    <StoresProvider>
      <SetDataContext.Provider value={setStoreInfo}>
        <DataContext.Provider value={storeInfo}>
          {/* <Service /> */}
          {/* <GetStoreData /> */}
          <SelectBox />
          <LandingPage />
        </DataContext.Provider>
      </SetDataContext.Provider>
    </StoresProvider>
  );
}

export default App;
