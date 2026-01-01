import HomePage from "./pages/HomePage.jsx";
import { useState } from "react";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <HomePage searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
  )
}

export default App
