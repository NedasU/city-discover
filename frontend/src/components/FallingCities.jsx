import { useContext } from "react";
import { CityContext } from "../context/cityContext";
import { cityNames } from "../data/fallingCitiesData";
import "../styles/fallingCities.css";
import { memo } from "react";

const random = (min, max) => Math.random() * (max - min) + min;

const FallingCities =  memo(function FallingCities() {
  const {isDesktop} = useContext(CityContext);
  const duration = isDesktop ? 18 : 12;
  
  // Spread cities evenly across time to avoid clustering
  const totalCities = cityNames.length;
  const timePerCity = duration / totalCities;

  return (
    <div className="falling-cities-layer">
      {cityNames.map((name, i) => {
        // Random position across the full width (vertical) or height (horizontal)
        const position = `${random(5, 85)}%`;
        
        // Evenly distribute start times with small random offset
        const delay = -(i * timePerCity + random(0, 0.3));

        return (
          <span
            key={i}
            className={`falling-city ${isDesktop ? "horizontal" : "vertical"}`}
            style={{
              left: isDesktop ? "-10%" : position,
              top: isDesktop ? position : "-10%",
              animationDelay: `${delay}s`,
              animationDuration: `${duration}s`,
            }}
          >
            {name}
          </span>
        );
      })}
    </div>
  );
});

export default FallingCities;