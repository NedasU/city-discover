import "../styles/global.css";

export default function Card( {title, imgSrc }) {
    title = title || "Kaunas Castle";
    imgSrc = imgSrc || "https://upload.wikimedia.org/wikipedia/commons/6/68/Kaunas_castle_20160603.jpg";
    return (
        <div className="Card">
            <img src={imgSrc} alt={title} className="Card-image"/>
            <div className="Card-title">{title}</div>
        </div>
    )
}