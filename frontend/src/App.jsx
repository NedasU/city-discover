import HomePage from "./pages/HomePage.jsx";
import DiscoveryPage from "./pages/DiscoverPage.jsx";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [LocationPoIs, setLocationPoIs] = useState([]);
  return (
    <Routes>
      <Route path="/" element={<HomePage searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>} />
      <Route path="/discover" element={<DiscoveryPage searchQuery={searchQuery} LocationPoIs={LocationPoIs} setLocationPoIs={setLocationPoIs}/>} />
      {/* Not created yet: <Route path="/map" element={<MapPage activeNav={"Map"} setActiveNav={setActiveNav} searchQuery={searchQuery} setSearchQuery={setSearchQuery} LocationPoIs={LocationPoIs} setLocationPoIs={setLocationPoIs}/>}/> */}
    </Routes>
  )
}

export default App
