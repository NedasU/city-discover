import HomePage from "./pages/HomePage.jsx";
import DiscoveryPage from "./pages/DiscoverPage.jsx";
import MapPage from "./pages/MapPage.jsx";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import { CityContext } from "./context/cityContext.jsx";

function App() {
  const [cityInfo, setCityInfo] = useState(null);
  const [poiPlaces, setPoiPlaces] = useState({places : []});
  const isDesktop = window.matchMedia("(min-width: 768px)").matches;
  return (
    <CityContext.Provider value={{ cityInfo, setCityInfo, poiPlaces, setPoiPlaces, isDesktop }}>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/discover" element={<DiscoveryPage/>} />
        <Route path="/map" element={<MapPage/>}/>
      </Routes>
    </CityContext.Provider>
  )
}

export default App
