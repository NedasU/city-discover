import express from "express";
import cors from "cors";
import "dotenv/config";
import path from "path";
import { fileURLToPath} from "url";
import {resolveImagesWithLimit} from "./services/imageResolver.js";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json())

app.use("/images", express.static(path.join(__dirname, "images")));

app.get("/", (req, res) => {
    res.send("Server running");
});

app.get("/api/geocode", async (req, res) => {
    const { city } = req.query;

    if (!city) {
        return res.status(400).json({ error: "City is Required!" });
    }

    try {
        const response  = await fetch(
            `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(
                city
            )}&apiKey=${process.env.GEOAPIFY_KEY}`
        );
    
        if (!response.ok) {
            throw new Error("Geoapify request failed!");
        }

    const data = await response.json();
    const feature = data.features[0];

    if (!feature) {
      return res.status(404).json({ error: "City not found" });
    }

    const { lat, lon, city: cityName, country, place_id } = feature.properties;
    const { bbox } = feature;

    res.json({
      city: cityName,
      country,
      lat,
      lon,
      bbox,
      place_id
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Geocoding failed" });
  }
});

app.get("/api/places", async (req, res) => {
    const { bbox, category = "tourism", limit = 40, offset = 0 } = req.query;

    if (!bbox){
        return res.status(400).json({ error: "Invalid place!" })
    }
    try {
        const response = await fetch(`https://api.geoapify.com/v2/places?categories=${category}&filter=rect:${bbox}&limit=${limit}&apiKey=${process.env.GEOAPIFY_KEY}&offset=${offset}`)

        if (!response.ok) {
            return res.status(400).json({ error: "Didnt find any places!" })
        }
        
        const data = await response.json();

        const places = data.features.map((place_info) => ({
                name: place_info.properties.name ?? "Unnamed Place",
                lon: place_info.properties.lon,
                lat: place_info.properties.lat,
                address: place_info.properties.formatted,
                categories: place_info.properties.categories ?? [],
                place_id: place_info.properties.place_id,
                img_src: "/images/placeholder.jpg"

        }));

        const updated_places = await resolveImagesWithLimit(places, 5);
        res.json({ places: updated_places });

    } catch (err) {
        console.error(err)
        res.status(500).json({ error: "Error occured whilst searching for places!" })
    }
})


app.get("/api/geocode/reverse", async (req, res) => {
    const { geo_lat, geo_lon } = req.query;
    console.log(geo_lat, geo_lon)
    try{
        const reverse_geocode_resp = await fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${geo_lat}&lon=${geo_lon}&apiKey=${process.env.GEOAPIFY_KEY}`)
        const reverse_geocode = await reverse_geocode_resp.json();

        if (!reverse_geocode.features?.length) {
            return res.status(404).json({ error: "No location found" });
        }
        const { city, country, place_id} = reverse_geocode.features[0].properties;

        res.json({
            city,
            country,
            place_id,
        })
    } catch (err){
        console.log(err);
        res.status(500).json({error: err});
    }
})



app.listen(PORT, ()=>{
    console.log(`Server listening on http://localhost:${PORT}`);
});