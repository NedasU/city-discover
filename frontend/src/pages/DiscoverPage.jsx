import "../styles/global.css";
import Navbar from "../components/Navbar.jsx";
import CardSwiper from "../components/CardSwiper.jsx";
import arrowLeft from "../images/arrow_left.png";
import arrowRight from "../images/arrow_right.png";

export default function DiscoverPage({ poiPlaces, cityInfo }) {
    const cityName = cityInfo?.city ?? "Kaunas"; // Defaulting value to Kaunas, eventually set it to geolocation of user based on permissions.
    return (
        <div className="whole-container discovery-page">
            <div className="descriptive-container">
                <Navbar/>
                <div className="discovery-title">
                    Things to do in <span>{cityName}</span>
                </div>
                <div className="desktop-only explanation">
                    Find out whats interesting in {cityName} by swiping left or right
                </div>
            </div>
            <div className="interactive-container no-padding">
                <div className="discovery-info-div">
                    <span className="discovery-sub-title">
                        Discover new locations
                    </span>
                    <span className="discovery-instruction">Swipe left or right
                        based on your preference
                    </span>
                    <div className="discovery-arrows">
                        <img src={arrowLeft} alt="left arrow" />
                        <img src={arrowRight} alt="right arrow" />
                    </div>
                </div>
                <CardSwiper poiPlaces={poiPlaces}/>
            </div>
        </div>
    );

}