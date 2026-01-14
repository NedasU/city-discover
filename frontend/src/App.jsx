import HomePage from "./pages/HomePage.jsx";
import DiscoveryPage from "./pages/DiscoverPage.jsx";
import MapPage from "./pages/MapPage.jsx";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";

function App() {
  const [cityInfo, setCityInfo] = useState(null);
  const [places, setPlaces] = useState([]);
  const isDesktop = window.matchMedia("(min-width: 768px)").matches;
  return (
    <Routes>
      <Route path="/" element={<HomePage setPlaces={setPlaces} setCityInfo={setCityInfo} isDesktop={isDesktop}/>} />
      <Route path="/discover" element={<DiscoveryPage/>} />
      <Route path="/map" element={<MapPage isDesktop={isDesktop}/>}/>
    </Routes>
  )
}

export default App
