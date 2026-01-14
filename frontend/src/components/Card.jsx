import "../styles/global.css";

export default function Card( {title, imgSrc }) {
    return (
        <div className="Card">
            <img 
            src={imgSrc} 
            onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = "http://localhost:5000/images/placeholder.jpg";
            }}
            alt={title} 
            className="Card-image"/>
            <div className="Card-title">{title}</div>
        </div>
    )
}