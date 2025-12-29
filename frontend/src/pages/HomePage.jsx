import "../styles/global.css"
import Navbar from "../components/Navbar.jsx"

export default function HomePage() {
    return(
        <div className="whole-container">
            <div className="descriptive-container">
                <Navbar/>
                <div className="descriptive-title">Find what to do</div>
            </div>
            <div className="interactive-container">

            </div>
        </div>
    );
}