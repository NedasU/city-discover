import "../styles/global.css";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="navbar-container">
        <NavLink className={({isActive}) => isActive ? "item item-active" : "item"} to="/" end>Home</NavLink>
        <NavLink className={({isActive}) => isActive ? "item item-active" : "item"} to="/discover">Discover</NavLink>
        <NavLink className={({isActive}) => isActive ? "item item-active" : "item"} to="/map">Map</NavLink>
    </div>
  );
}
