import "../styles/global.css"
import Navbar from "../components/Navbar.jsx"
import InputBar from "../components/InputBar.jsx"
import FallingCities from "../components/FallingCities.jsx"

export default function HomePage( {searchQuery, setSearchQuery} ) {
    return(
        <div className="whole-container">
            <div className="descriptive-container">
                <Navbar/>
                <div className="descriptive-title">Find what to do</div>
                <div className="descriptive-description">
                    Looking for something to do? Exploring a Prison? Climbing a mountain? Let us help you find it!
                </div>
            </div>
            <div className="interactive-container">
                <InputBar SearchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
                <FallingCities/>
            </div>
        </div>
    );
}