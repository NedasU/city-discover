# City Discover - A new and interactive way to find things to do in a city!

City Discover is a web app that lets users explore a city and discover places of interest (PoIs).
Users can swipe left or right, Tinder-style, to like or dislike PoIs.
Liked PoIs are displayed on an interactive map for easy exploration.

<img width="1920" height="918" alt="Discovery page with interactive Tinder swiping on PoI cards" src="https://github.com/user-attachments/assets/c5bb8ccf-095b-4122-b43a-cc884392c8b8" />


## Tech Stack
### Frontend 
- React
- Vite
- CSS
  
### Backend
- Node.js
- Express.js

## Features
- "Falling Cities" component generates cities at random positions for a dynamic effect behind the input bar.
- Users can enter a city to search for POIs via the backend API.
- POIs are displayed on cards; swipe right to like, left to dislike.
- Liked POIs are displayed on an interactive map with markers and popups.
- Responsive design with expandable elements on smaller screens.
- Search results reset upon a new search or page refresh.
- 
## Getting Started

### Prerequisites
- Node.js (v18+)
- npm

### Environment Variables
Inside the frontend folder, and the server folder require a .env file to store the geoapify API key!
**Do NOT commit this file to GitHub.**

Example:
  server -> .env:
  ```
  GEOAPIFY_KEY=your_geoapify_key
  ```
  frontend -> .env:
  ```
  VITE_GEOAPIFY_KEY=your_geoapify_key
  ```
*Both folders require a .env file to keep their naming conventions and for security reasons seperately!*

Get your key here: https://www.geoapify.com/


### Data Flow

1. User enters a city of their choice
<img width="1920" height="922 alt="Homepage" src="https://github.com/user-attachments/assets/a029e66d-dc30-4ded-aa4e-fc90cefaecf1" />

3. A request to a backend geocode API is made
4. Backend calls Geoapify's Geocode API and filters its data to just the needed information
```json
// e.g. http://localhost:5000/api/geocode?city=Kaunas
{"city":"Kaunas","country":"Lithuania","lat":54.8982139,"lon":23.9044817,"bbox":[23.7535259,54.8207445,24.1002844,54.9595608],"place_id":"519b54d91c8ce737405904a84eacf8724b40f00101f90138eb170000000000c00208"}
```
4. Saves this information to the cityInfo state
5. Calls backends places API using new cityInfo.bbox value in order to find PoI's in that location and filters its data to just relevant information
```json
//http://localhost:5000/api/places?bbox=23.7535259,54.8207445,24.1002844,54.9595608
{
  "places": [
    {
      "name": "Kauno pilis",
      "lon": 23.8839599075421,
      "lat": 54.89900855,
      "address": "Kaunas Castle, Pilies g. 17, 44322 Kaunas, Lithuania",
      "categories": [
        "building",
        "building.historic",
        "tourism",
        "tourism.sights",
        "tourism.sights.castle"
      ],
      "place_id": "515ede4d324be2374059743a4fb612734b40f00101f90132da6f000000000092030b4b61756e6f2070696c6973",
      "img_src": "https://upload.wikimedia.org/wikipedia/commons/6/68/Kaunas_castle_20160603.jpg"
    },
  ...
]}
```
6. Information is saved to poiPlaces and the user is navigated to discovery page
8. User is displayed cards for each PoI and framer motion allows the user to swipe
<img width="1920" height="917" alt="Discover page with PoI cards" src="https://github.com/user-attachments/assets/ffdf962e-f068-424d-bf82-9211742e24dc" />

10. Upon swipes to the right, that PoI is saved to likedPois.
11. If the user clicks on map in the navigation bar, or finishes swiping all the cards (limited to 40), navigates to map page
12. User is displayed with a map, including all likedPois being marked with markers and popups to include more information upon clicking
13. A list of likedPois is also present for the user to scroll through.
<img width="1920" height="919" alt="Map Page with marked liked PoIs on the interactive map" src="https://github.com/user-attachments/assets/e0868e3f-14e4-4d71-b4a8-df52e3a1f66f" />

### Running Locally

All dependencies must be installed before running the program.

Steps to running backend:
```
cd server
npm install
node server.js
```

Steps to running frontend:
```
cd frontend
npm install
npm run dev
```

### Future Improvements
This is a fairly large project and although a lot of its features are implemented, there is still much work to do,
hence, I will consider this a Minimum Viable Product (MVP) nearing its completion.

1. **POI Images:** Currently, many POIs lack images and placeholders (image example below) are used. Future work could include fetching images via Wikipedia API or another source.
<img width="1920" height="923" alt="Discovery page including a PoI card with a placeholder image" src="https://github.com/user-attachments/assets/6cc77cb3-a1e2-4cf2-b885-62747eeef07e" />

3. **Design:** The current UI is functional but could be improved to be more modern and user-friendly.
4. **Falling Cities:** Random positions may overlap due to varying city name lengths. Future improvement could involve smarter positioning to prevent overlaps.
5. **User Location & Cookies:** Using cookies or geolocation to suggest default cities could improve UX.


### Limitations
1. Some POI images are missing or corrupted.
2. Searching very large cities (e.g., Tokyo) may return no POIs. Searching districts or wards works better.
