import "../styles/global.css";
import ListExpander from "./ListExpander.jsx";
import PoiListCard from "./PoiListCard.jsx";
import { useState } from "react";

export default function ListContainer() {
    const [isExpanded, setIsExpanded] = useState(false);
    return (
        <div className={isExpanded ? "list-container expanded": "list-container"}>
            <ListExpander isExpanded={isExpanded} setIsExpanded={setIsExpanded}/>
            <PoiListCard/>
            <PoiListCard/>
            <PoiListCard/>
            <PoiListCard/>
            <PoiListCard/>
            <PoiListCard/>

        </div>
    );
}