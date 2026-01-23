import { useContext, useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import "../styles/global.css";
import { CityContext } from "../context/cityContext";

export default function CityMap() {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const { isDesktop, cityInfo, likedPois } = useContext(CityContext);

  const lat = cityInfo?.lat ?? 54.90031135382936;
  const lon = cityInfo?.lon ?? 23.901360471320128; //Default to kaunas coordinates (temp)

  useEffect(() => {
    if (mapRef.current) return; // prevent re-init (important)

    mapRef.current = new maplibregl.Map({
      container: mapContainerRef.current,
      attributionControl: false, // Remove the non-compact info message
      style: `https://maps.geoapify.com/v1/styles/osm-bright/style.json?apiKey=${
        import.meta.env.VITE_GEOAPIFY_KEY
      }`,
      center: [lon, lat],
      zoom: isDesktop ? 12 : 11,
    });

    mapRef.current.addControl(new maplibregl.NavigationControl(), "top-right");
    mapRef.current.addControl(
        new maplibregl.AttributionControl({
            compact: true
        }),
        "bottom-right"
    );
    mapRef.current.on("load", () => {
        const attrib = document.querySelector(
            ".maplibregl-ctrl-attrib"
        );

        if (attrib?.hasAttribute("open")) {
            attrib.removeAttribute("open");
        }
    });

    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, [lat, lon, isDesktop]);

  useEffect(() => {
    if (!mapRef.current) return;

    const markers = likedPois.map(place => {
      const popupContent = document.createElement("div");
      popupContent.className = "poi-popup";

      const title = document.createElement("h4");
      title.textContent = place.name;
      title.className = "poi-title";

      const address = document.createElement("p");
      address.textContent = place.address ?? "";
      address.className = "poi-address";

      const img = document.createElement("img");
      img.src = place.img_src;
      img.alt = place.name;
      img.className = "poi-image";

      // REAL onError handler
      img.onerror = () => {
        img.onerror = null;
        img.src = "http://localhost:5000/images/placeholder.jpg";
      };

      popupContent.appendChild(title);
      popupContent.appendChild(address);
      popupContent.appendChild(img);

      return new maplibregl.Marker({ color: "#FF0000" })
        .setLngLat([place.lon, place.lat])
        .setPopup(new maplibregl.Popup({ offset: 25 }).setDOMContent(popupContent))
        .addTo(mapRef.current);
    });

    return () => markers.forEach(m => m.remove());
  }, [likedPois]);


  return <div ref={mapContainerRef} className="city-map" />;
}
