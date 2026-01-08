import "../styles/global.css";

export default function PoiListCard() {
    return (
        <div className="poi-card">
            <div className="poi-img-div">
                <img className="poi-img" src="https://upload.wikimedia.org/wikipedia/commons/6/68/Kaunas_castle_20160603.jpg" alt="temp-alt" />
            </div>
            <div className="poi-desc">
                <h2 className="poi-title">Kaunas</h2>
                <p className="poi-address">Pilies g. 17, Kaunas, 44275 Kauno m. sav.</p>
            </div>
        </div>
    );
}