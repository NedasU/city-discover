import "../styles/global.css";
import Card from "./Card.jsx";
import heartIcon from "../images/heart.png";
import rejectIcon from "../images/reject.png";

export default function CardSwiper() {
    return (
        <div className="Card-holder-div">
            <div className="un-inter-div">
                <div className="int-logo-div">
                    <img src={rejectIcon} alt="reject-logo" />
                </div>
                Scrap It
            </div>
            <div className="cards-div">
                <Card title="Kaunas Castle" imgSrc="https://upload.wikimedia.org/wikipedia/commons/6/68/Kaunas_castle_20160603.jpg"/>
                <Card title="Kaunas Castle" imgSrc="https://upload.wikimedia.org/wikipedia/commons/6/68/Kaunas_castle_20160603.jpg"/>
                <Card title="Kaunas Castle" imgSrc="https://upload.wikimedia.org/wikipedia/commons/6/68/Kaunas_castle_20160603.jpg"/>
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