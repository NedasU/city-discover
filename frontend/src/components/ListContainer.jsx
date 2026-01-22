import { useNavigate } from "react-router-dom";
import { CityContext } from "../context/cityContext.jsx";
import "../styles/global.css";
import ListExpander from "./ListExpander.jsx";
import PoiListCard from "./PoiListCard.jsx";
import { useContext, useState } from "react";

export default function ListContainer() {
    const [isExpanded, setIsExpanded] = useState(false);
    const { isDesktop, likedPois, index, poiPlaces } = useContext(CityContext);
    const navigate = useNavigate();
    return (
        <div className={isExpanded && !isDesktop ? "list-container expanded": "list-container"}>
            {!isDesktop && <ListExpander isExpanded={isExpanded} setIsExpanded={setIsExpanded}/> }
            {likedPois.map((place) => (
                <PoiListCard 
                imgSrc={place.img_src === "/images/placeholder.jpg" ? "http://localhost:5000/images/placeholder.jpg": place.img_src}
                title={place.name} 
                address={place.address}
                key={place.place_id}/>
            ))}
            {index < poiPlaces.places.length && (
                <div className="map-card-info">
                    {index === 0 ? (
                        <p>Explore Cards to add here in the discover Page!</p>
                    ): (
                        <>
                            <p>Want more places of interest?</p>
                            <p>Finish Scrolling!</p>
                        </>
                    )}

                    <button onClick={()=> navigate("/discover")}>
                        Go back to Discover!
                    </button>
                </div>
            )}
        </div>
    );
}