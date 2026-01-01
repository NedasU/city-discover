import "../styles/global.css";

export default function InputBar({ SearchQuery, setSearchQuery }) {
    return (
        <div className="input-div">
            <input 
            type="text"
            value={SearchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Enter a city" 
            />
        </div>
    );
}