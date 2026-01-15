import "../styles/global.css";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { CityContext } from "../context/cityContext";

export default function Navbar() {
  const {cityInfo} = useContext(CityContext);

  const allowClick = ((e) =>{
    if (!cityInfo) {
      e.preventDefault();
    }
  })
  return (
    <div className="navbar-container">
        <NavLink 
          className={({isActive}) => isActive ? "item item-active" : "item"} 
          to="/" 
          end>Home</NavLink>
        <NavLink 
          className={({isActive}) => isActive ? "item item-active" : "item"} 
          onClick={allowClick}
          to="/discover">Discover</NavLink>
        <NavLink
          className={({isActive}) => isActive ? "item item-active" : "item"} 
          onClick={allowClick}
          to="/map">Map</NavLink>
    </div>
  );
}
