import HomePage from "./pages/HomePage.jsx";
import DiscoveryPage from "./pages/DiscoverPage.jsx";
import MapPage from "./pages/MapPage.jsx";
import RequireCity from "./components/RequireCity.jsx";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import { CityContext } from "./context/cityContext.jsx";

function App() {
  const [cityInfo, setCityInfo] = useState(null);
  const [poiPlaces, setPoiPlaces] = useState({places : []});
  const [likedPois, setLikedPois] = useState([]);
  const [index, setIndex] = useState(0);
  const isDesktop = window.matchMedia("(min-width: 768px)").matches;
  return (
    <CityContext.Provider value={{ cityInfo, setCityInfo, poiPlaces, setPoiPlaces, likedPois, setLikedPois, index, setIndex, isDesktop }}>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/discover" element={
          <RequireCity>
            <DiscoveryPage/>
          </RequireCity>}/>
        <Route path="/map" element={
          <RequireCity>
            <MapPage/>
          </RequireCity>}/>
      </Routes>
    </CityContext.Provider>
  )
}

export default App
