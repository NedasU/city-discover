import { useState } from "react";
import "../styles/fallingCities.css";

export default function FallingCities() {
    const [cities, setCities] = useState([]);

    return (
        <div className="falling-cities-layer">
            {cities.map((city) => (
                <span
                    key={city.id}
                    className={`falling-city ${city.direction}`}
                    style={{ 
                        left: city.x,
                        top: city.y,
                        transform: `rotate(${city.rotation}deg)`
                    }}
                >
                {city.name}
                </span>
            ))}
        </div>
    );
}