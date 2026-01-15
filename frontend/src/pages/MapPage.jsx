import "../styles/global.css";
import Navbar from "../components/Navbar.jsx";
import ListContainer from "../components/ListContainer.jsx";
import CityMap from "../components/CityMap.jsx";
import { useContext } from "react";
import { CityContext } from "../context/cityContext.jsx";

export default function() {
    const {isDesktop, cityInfo} = useContext(CityContext);
    const lat = cityInfo?.lat ?? 54.90031135382936;
    const lon = cityInfo?.lon ?? 23.901360471320128; //Default to kaunas coordinates (temp)

    return (
        <div className="whole-container map-page-container">
            <div className="descriptive-container">
                <Navbar/>
                <div className="map-title">Let us plan your route</div>
                { isDesktop && <ListContainer/> }
            </div>
            <div className="interactive-container">
                <div className="map-container">
                    <CityMap lon={lon} lat={lat}/>
                </div>
                { !isDesktop && <ListContainer/> }
            </div>
        </div>
    );
}