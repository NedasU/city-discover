import { cityNames } from "../data/fallingCitiesData";
import "../styles/fallingCities.css";

const random = (min, max) => Math.random() * (max - min) + min;

export default function FallingCities() {
  const isDesktop = window.matchMedia("(min-width: 768px)").matches;
  let delayCount = 0;
  return (
    <div className="falling-cities-layer">
      {cityNames.map((name, i) => {
        const position = `${random(5, 90)}%`;
        const rotation = random(-15, 15);

        return (
          <span
            key={i}
            className={`falling-city ${isDesktop ? "horizontal" : "vertical"}`}
            style={{
              left: isDesktop ? 0 : position,
              top: isDesktop ? position : 0,
              transform: `rotate(${rotation}deg)`,
              animationDelay: `${random(delayCount++, 5+delayCount)}s`,
              animationDuration: `${random(15, 35)}s`
            }}
          >
            {name}
          </span>
        );
      })}
    </div>
  );
}
