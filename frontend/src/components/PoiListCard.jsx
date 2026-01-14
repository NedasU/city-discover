import "../styles/global.css";

export default function PoiListCard( {imgSrc, title, address} ) {
    return (
        <div className="poi-card">
            <div className="poi-img-div">
                <img className="poi-img" 
                src={imgSrc} 
                onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "http://localhost:5000/images/placeholder.jpg";
                }}
                alt={title} />
            </div>
            <div className="poi-desc">
                <h2 className="poi-title">{title}</h2>
                <p className="poi-address">{address}</p>
            </div>
        </div>
    );
}