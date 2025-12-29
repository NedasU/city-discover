import "../styles/global.css";

export default function Navbar({ activeNav, setActiveNav }) {
  return (
    <div className="navbar-container">
      <div
        className={`item ${activeNav === "Home" ? "item-active" : ""}`}
        onClick={() => setActiveNav("Home")}
      >
        Home
      </div>
      <div
        className={`item ${activeNav === "Discover" ? "item-active" : ""}`}
        onClick={() => setActiveNav("Discover")}
      >
        Discover
      </div>
      <div
        className={`item ${activeNav === "Map" ? "item-active" : ""}`}
        onClick={() => setActiveNav("Map")}
      >
        Map
      </div>
    </div>
  );
}
