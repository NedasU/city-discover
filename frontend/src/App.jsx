import HomePage from "./pages/HomePage.jsx";
import DiscoveryPage from "./pages/DiscoverPage.jsx";
import MapPage from "./pages/MapPage.jsx";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";

function App() {
  const [cityInfo, setCityInfo] = useState(null);
  const [poiPlaces, setPoiPlaces] = useState([]);
  const isDesktop = window.matchMedia("(min-width: 768px)").matches;
  return (
    <Routes>
      <Route path="/" element={<HomePage setPoiPlaces={setPoiPlaces} setCityInfo={setCityInfo} isDesktop={isDesktop}/>} />
      <Route path="/discover" element={<DiscoveryPage poiPlaces={poiPlaces} cityInfo={cityInfo}/>} />
      <Route path="/map" element={<MapPage poiPlaces={poiPlaces} cityInfo={cityInfo} isDesktop={isDesktop}/>}/>
    </Routes>
  )
}

export default App
