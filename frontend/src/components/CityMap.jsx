import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import "../styles/global.css";

export default function CityMap({ 
   isDesktop,
   lat=54.90031135382936, //Defaulting to Kaunas for now
   lon=23.901360471320128 }) {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);

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
  }, []);
  return <div ref={mapContainerRef} className="city-map" />;
}
