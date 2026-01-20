import { useContext, useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import "../styles/global.css";
import { CityContext } from "../context/cityContext";

export default function CityMap() {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const { isDesktop, cityInfo } = useContext(CityContext);

  const lat = cityInfo?.lat ?? 54.90031135382936;
  const lon = cityInfo?.lon ?? 23.901360471320128; //Default to kaunas coordinates (temp)

  const bbox = cityInfo?.bbox;

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
        if (
          Array.isArray(bbox) &&
          bbox.length === 4 &&
          bbox.every(Number.isFinite)){
            map.fitBounds(
              [
                [bbox[0], bbox[1]],
                [bbox[2], bbox[3]],
              ],
              {
                padding: 40,
                maxZoom: isDesktop ? 13 : 12,
                duration: 800,
              }
            );
        }
    });

    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, [bbox, lat, lon, isDesktop]);

  return <div ref={mapContainerRef} className="city-map" />;
}
