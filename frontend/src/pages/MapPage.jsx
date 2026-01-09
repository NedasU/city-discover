import "../styles/global.css";
import Navbar from "../components/Navbar.jsx";
import ListContainer from "../components/ListContainer.jsx";
import CityMap from "../components/CityMap.jsx";

export default function({ isDesktop }) {
    return (
        <div className="whole-container map-page-container">
            <div className="descriptive-container">
                <Navbar/>
                <div className="map-title">Let us plan your route</div>
                { isDesktop && <ListContainer isDesktop={isDesktop}/> }
            </div>
            <div className="interactive-container">
                <div className="map-container">
                    <CityMap/>
                </div>
                { !isDesktop && <ListContainer isDesktop={isDesktop}/> }
            </div>
        </div>
    );
}