import { useContext, useEffect } from "react";
import { CityContext } from "../context/cityContext";
import { useNavigate } from "react-router-dom";

export default function RequireCity ({ children }){
    const {cityInfo} = useContext(CityContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!cityInfo) {
        navigate("/", {
            replace: true,
            state: { error: "Please enter a city first!" }
        });
        }
    }, [cityInfo, navigate]);

    if (!cityInfo) return null;
    return children;
}