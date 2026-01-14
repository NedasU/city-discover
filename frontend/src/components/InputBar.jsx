import "../styles/global.css";

export default function InputBar({ searchQuery, setSearchQuery, handleSubmit, disabled }) {
    const HandleKeyDown = (e) => {
        if (e.key === "Enter"){
            handleSubmit();
        }
    }
    return (
        <div className="input-div">
            <input 
            className={disabled ? "disabled" : ""}
            disabled={disabled}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={HandleKeyDown}
            placeholder="Enter a city" 
            />
        </div>
    );
}