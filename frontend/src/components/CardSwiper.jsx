import "../styles/global.css";
import Card from "./Card.jsx";
import heartIcon from "../images/heart.png";
import rejectIcon from "../images/reject.png";

export default function CardSwiper({ poiPlaces }) {
    return (
        <div className="Card-holder-div">
            <div className="un-inter-div">
                <div className="int-logo-div">
                    <img src={rejectIcon} alt="reject-logo" />
                </div>
                Scrap It
            </div>
            <div className="cards-div">
                {poiPlaces.places.map((place) => (
                    <Card 
                    title={place.name} 
                    imgSrc={place.img_src === "/images/placeholder.jpg" ? "http://localhost:5000/images/placeholder.jpg": place.img_src} 
                    key={place.place_id}/>
                ))};
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