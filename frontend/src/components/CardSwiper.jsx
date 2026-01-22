import "../styles/global.css";
import Card from "./Card.jsx";
import heartIcon from "../images/heart.png";
import rejectIcon from "../images/reject.png";
import { CityContext } from "../context/cityContext.jsx";
import { useContext, useEffect } from "react";
import { motion } from "framer-motion";
import {useNavigate} from "react-router-dom";

export default function CardSwiper() {
    const {poiPlaces, isDesktop, likedPois, setLikedPois, index, setIndex} = useContext(CityContext);
    const navigate = useNavigate();
    const places = poiPlaces.places;


    const addPoi = (place) => {
        setLikedPois((prev) => [...prev, place]);
    };

    const handleSwipe = (direction) => {
        const currentPlace = places[index];
        if (!currentPlace) return;

        if (direction === "right") {
            addPoi(currentPlace);
        }

        setIndex((prev) => prev + 1);
    };

    useEffect(() => {
        console.log("Liked POIs:", likedPois);
    }, [likedPois]);



    if (index >= places.length && places.length > 0) {
        return (
            <div className="card-endpoint-msg">
                <p>All Cards have been swiped! Proceed to Maps page!</p>
                <button onClick={()=> navigate("/map")}>
                    Go to Map
                </button>
            </div>

        )
    }

    if (index === 0 && places.length === 0) {
        return (
            <div className="card-endpoint-msg">
                <p>No Places of Interest were found. This may be a problem on our side!</p>
                <p>Try searching within the city if its a large city (e.g. Tokyo - Shinjuku, Akihabara, etc.)</p>
                <p>If its too small of a city, try searching larger!</p>
            </div>
        )
    };

    return (
        <div className="Card-holder-div">
            <div className="un-inter-div">
                <div className="int-logo-div">
                    <img src={rejectIcon} alt="reject-logo" />
                </div>
                Scrap It
            </div>
            <div className="cards-div">
                {places.slice(index, index + 3).map((place, i) => {
                    const isTop = i === 0;

                    return (
                    <motion.div
                        key={place.place_id}
                        className="swipe-card"
                        drag={isTop ? "x" : false}
                        dragConstraints={{ left: 0, right: 0 }}
                        onDragEnd={(e, info) => {
                        if (!isTop) return;

                        if (info.offset.x > 120) handleSwipe("right");
                        else if (info.offset.x < -120) handleSwipe("left");
                        }}
                        style={{
                        zIndex: 3 - i,
                        }}
                        animate={{
                        rotate: i * (isDesktop ? 3 : 4),
                        }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    >
                        <Card
                        title={place.name}
                        imgSrc={
                            place.img_src === "/images/placeholder.jpg"
                            ? "http://localhost:5000/images/placeholder.jpg"
                            : place.img_src
                        }
                        />
                    </motion.div>
                    );
                })}
            </div>
            <div className="interested-div">
                <div className="int-logo-div">
                    <img src={heartIcon} alt="like-logo" />
                </div>
                Add it
            </div>
        </div>
    );
}