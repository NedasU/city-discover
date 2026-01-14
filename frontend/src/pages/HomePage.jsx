import "../styles/global.css"
import Navbar from "../components/Navbar.jsx"
import InputBar from "../components/InputBar.jsx"
import FallingCities from "../components/FallingCities.jsx"
import { useState } from "react";

export default function HomePage( {setPlaces, setCityInfo, isDesktop} ) {
    const [ searchQuery, setSearchQuery ] = useState("");
    const [ errorState, setErrorState ] = useState(null);
    const [ loading, setLoading ] = useState(false);

    const handleSubmit = async () => {
        if (!searchQuery.trim()){
            return setErrorState("Please type a City!");
            
        }
        try {
        setLoading(true);
        setErrorState(null);
        const response =  await fetch(`http://localhost:5000/api/geocode?city=${encodeURIComponent(searchQuery)}`);
        const cityData = await response.json();
        setCityInfo(cityData);

        const places_response = await fetch(`http://localhost:5000/api/places?city_id=${encodeURIComponent(cityData.place_id)}`);
        const placesData = await places_response.json();
        setPlaces(placesData);

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
                <InputBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} handleSubmit={handleSubmit} disabled={loading} />
                {errorState && (
                    <p>{errorState}</p>
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
                <FallingCities isDesktop={isDesktop}/>
            </div>
        </div>
    );
}