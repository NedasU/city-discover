import "../styles/global.css"
import Navbar from "../components/Navbar.jsx"
import InputBar from "../components/InputBar.jsx"
import FallingCities from "../components/FallingCities.jsx"
import { useState } from "react";
import { useContext } from "react";
import { CityContext } from "../context/cityContext.jsx";
import { useLocation, useNavigate } from "react-router-dom";

export default function HomePage() {
    const [ searchQuery, setSearchQuery ] = useState("");
    const [ errorState, setErrorState ] = useState(null);
    const [ loading, setLoading ] = useState(false);
    const {setPoiPlaces, setCityInfo} = useContext(CityContext);
    const location = useLocation();
    const [ redirectError, setRedirectError ] = useState(location.state?.error ?? null);
    const navigate = useNavigate();

    const handleSearchChange = (value) => {
        if (redirectError) setRedirectError(null);
        setSearchQuery(value);
    }

    const handleSubmit = async () => {
        if (!searchQuery.trim()) {
            return setErrorState("Please type a City!");
        }
        try {
            setRedirectError(null);
            setLoading(true);
            setErrorState(null);
            const response =  await fetch(`http://localhost:5000/api/geocode?city=${encodeURIComponent(searchQuery)}`);
            if (!response.ok) throw new Error("An error occured whilst getting Data!");

            const cityData = await response.json();
            setCityInfo(cityData);
            
            const places_response = await fetch(`http://localhost:5000/api/places?bbox=${encodeURIComponent(cityData.bbox)}`);
            if (!places_response.ok) throw new Error("An error occured whilst getting data for places!");

            const placesData = await places_response.json();
            setPoiPlaces(placesData);

            navigate("/discover");

        } catch (err){
            setErrorState("Something went wrong!");
        } finally {
            setLoading(false);
        }
    };

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