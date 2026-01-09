import HomePage from "./pages/HomePage.jsx";
import DiscoveryPage from "./pages/DiscoverPage.jsx";
import MapPage from "./pages/MapPage.jsx";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [LocationPoIs, setLocationPoIs] = useState([]);
  const isDesktop = window.matchMedia("(min-width: 768px)").matches;
  return (
    <Routes>
      <Route path="/" element={<HomePage searchQuery={searchQuery} setSearchQuery={setSearchQuery} isDesktop={isDesktop}/>} />
      <Route path="/discover" element={<DiscoveryPage searchQuery={searchQuery} LocationPoIs={LocationPoIs} setLocationPoIs={setLocationPoIs}/>} />
      <Route path="/map" element={<MapPage searchQuery={searchQuery} setSearchQuery={setSearchQuery} LocationPoIs={LocationPoIs} setLocationPoIs={setLocationPoIs} isDesktop={isDesktop}/>}/>
    </Routes>
  )
}

export default App
