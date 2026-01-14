import "../styles/global.css";

export default function Card( {title, imgSrc }) {
    return (
        <div className="Card">
            <img src={imgSrc} alt={title} className="Card-image"/>
            <div className="Card-title">{title}</div>
        </div>
    )
}