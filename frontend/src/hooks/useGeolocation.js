import { useEffect, useState } from "react";

export function useGeolocation(){
    const [location, setLocation] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(()=>{
        if (!("geolocation" in navigator)){
            setError("Geolocation unsupported1");
            setLoading(false);
            return;
        }
        
        navigator.geolocation.getCurrentPosition(
            (pos)=>{
                setLocation({
                        lat: pos.coords.latitude,
                        lon: pos.coords.longitude
                    });
                setLoading(false);
            },
            (err) =>{
                setError(err.message);
                setLoading(false);
            },
                  {
        enableHighAccuracy: true,
        timeout: 10000,
      }
    );
  }, []);

  return { location, loading, error };
}