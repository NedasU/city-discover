import "../styles/global.css";
import Navbar from "../components/Navbar.jsx";
import ListContainer from "../components/ListContainer.jsx";

export default function() {
    return (
        <div className="whole-container map-page-container">
            <div className="descriptive-container">
                <Navbar/>
                <div className="map-title">Let us plan your route</div>
            </div>
            <div className="interactive-container">
                <div className="map-container">
                </div>
                <ListContainer/>
            </div>
        </div>
    );
}