import "../styles/global.css";
import ListExpander from "./ListExpander.jsx";
import PoiListCard from "./PoiListCard.jsx";
import { useState } from "react";

export default function ListContainer({ isDesktop, places = [] }) {
    const [isExpanded, setIsExpanded] = useState(false);
    return (
        <div className={isExpanded && !isDesktop ? "list-container expanded": "list-container"}>
            {!isDesktop && <ListExpander isExpanded={isExpanded} setIsExpanded={setIsExpanded}/> }
            {places.map((place) => (
                <PoiListCard 
                imgSrc={place.img_src === "/images/placeholder.jpg" ? "http://localhost:5000/images/placeholder.jpg": place.img_src}
                title={place.name} 
                address={place.address}
                key={place.place_id}/>
            ))}
        </div>
    );
}