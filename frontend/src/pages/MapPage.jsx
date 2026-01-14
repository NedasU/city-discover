import "../styles/global.css";
import Navbar from "../components/Navbar.jsx";
import ListContainer from "../components/ListContainer.jsx";
import CityMap from "../components/CityMap.jsx";

export default function({ 
    poiPlaces : {places = []} = {}, 
    cityInfo, 
    isDesktop
    }) {
    return (
        <div className="whole-container map-page-container">
            <div className="descriptive-container">
                <Navbar/>
                <div className="map-title">Let us plan your route</div>
                { isDesktop && <ListContainer isDesktop={isDesktop} places={places}/> }
            </div>
            <div className="interactive-container">
                <div className="map-container">
                    <CityMap isDesktop={isDesktop} lat={cityInfo?.lat} lon={cityInfo?.lon}/>
                </div>
                { !isDesktop && <ListContainer isDesktop={isDesktop} places={places}/> }
            </div>
        </div>
    );
}