import HomePage from "./pages/HomePage.jsx";
import DiscoveryPage from "./pages/DiscoverPage.jsx";
import { useState } from "react";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeNav, setActiveNav] = useState("Home");
  return (
    // <HomePage searchQuery={searchQuery} setSearchQuery={setSearchQuery} activeNav={activeNav} setActiveNav={setActiveNav}/>
    <DiscoveryPage activeNav={"Discover"} setActiveNav={setActiveNav}/>
  )
}

export default App
