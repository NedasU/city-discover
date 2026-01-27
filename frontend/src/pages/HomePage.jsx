import "../styles/global.css"
import Navbar from "../components/Navbar.jsx"
import InputBar from "../components/InputBar.jsx"
import FallingCities from "../components/FallingCities.jsx"
import { useState, useContext, useEffect } from "react";
import { CityContext } from "../context/cityContext.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import { useGeolocation } from "../hooks/useGeolocation.js";

export default function HomePage() {
    const {setPoiPlaces, setCityInfo, setIndex, setLikedPois, cityInfo, poiPlaces } = useContext(CityContext);
    const geoLocation = useGeolocation();
    
    const [ searchQuery, setSearchQuery ] = useState(cityInfo?.city || "");
    const [ errorState, setErrorState ] = useState(null);
    const [ loading, setLoading ] = useState(false);

    const location = useLocation();
    const [ redirectError, setRedirectError ] = useState(location.state?.error ?? null);
    const navigate = useNavigate();

    const handleSearchChange = (value) => {
        if (redirectError) setRedirectError(null);
        setSearchQuery(value);
    }

    const fetchCityAndPlaces = async (cityName) => {
        const cityResp = await fetch(
            `http://localhost:5000/api/geocode?city=${encodeURIComponent(cityName)}`
        );
        if (!cityResp.ok) throw new Error("City fetch failed");

        const cityData = await cityResp.json();
        setCityInfo(cityData);

        const placesResp = await fetch(
            `http://localhost:5000/api/places?bbox=${encodeURIComponent(cityData.bbox)}`
        );
        if (!placesResp.ok) throw new Error("Places fetch failed");

        const placesData = await placesResp.json();
        setPoiPlaces(placesData);

        setIndex(0);
        setLikedPois([]);
    };


    const handleSubmit = async () => {
        if (!searchQuery.trim()) {
            return setErrorState("Please type a City!");
        }
        if (
            searchQuery === cityInfo?.city &&
            poiPlaces?.places?.length > 0
        ) {
            return navigate("/discover");
        }
        try {
            setRedirectError(null);
            setLoading(true);
            setErrorState(null);
            await fetchCityAndPlaces(searchQuery);
            navigate("/discover");

        } catch (err){
            setErrorState("Something went wrong!");
        } finally {
            setLoading(false);
        }
    };

    useEffect(()=>{
        if (!geoLocation) return;

        const reverse_geocode_call = async ()=>{
            try {
                const reverse_geocode_resp = await fetch(`http://localhost:5000/api/geocode/reverse?geo_lat=${geoLocation.location.lat}&geo_lon=${geoLocation.location.lon}`);
                if (!reverse_geocode_resp.ok) throw new Error("An error occured whilst getting Data!");

                const userLoc = await reverse_geocode_resp.json();
                await fetchCityAndPlaces(userLoc.city)
                setSearchQuery(userLoc.city);

            } catch (err){
                console.log(err)
            }
        }
        if (geoLocation.loading === false && geoLocation.error === null && !(cityInfo)) {
            reverse_geocode_call();
        }
    }, [geoLocation])

    return(
        <div className="whole-container">
            <div className="descriptive-container">
                <Navbar/>
                <div className="descriptive-title">Find what to do</div>
                <div className="descriptive-description">
                    Looking for something to do? Exploring a Prison? Climbing a mountain? Let us help you find it!
                </div>
            </div>
            <div className="interactive-container">
                { redirectError && (
                    <p className="error-msg">{redirectError}</p>
                )}
                <InputBar 
                    searchQuery={searchQuery} 
                    handleSubmit={handleSubmit} 
                    disabled={loading} 
                    handleSearchChange={handleSearchChange}
                />
                {errorState && (
                    <p className="error-msg">{errorState}</p>
                )}
                {loading && (
                <div className="loading-wrapper">
                        <div
                        className="loading-spinner"
                        style={{ width: 40, height: 40 }}
                        />
                    <p>Finding places...</p>
                </div>
                )}
                <FallingCities/>
            </div>
        </div>
    );
}