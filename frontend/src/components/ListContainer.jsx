import "../styles/global.css";
import ListExpander from "./ListExpander.jsx";
import PoiListCard from "./PoiListCard.jsx";
import { useState } from "react";

export default function ListContainer({ isDesktop }) {
    const [isExpanded, setIsExpanded] = useState(false);
    return (
        <div className={isExpanded && !isDesktop ? "list-container expanded": "list-container"}>
            {!isDesktop && <ListExpander isExpanded={isExpanded} setIsExpanded={setIsExpanded}/> }
            <PoiListCard/>
            <PoiListCard/>
            <PoiListCard/>
            <PoiListCard/>
            <PoiListCard/>
            <PoiListCard/>

        </div>
    );
}