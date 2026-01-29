const imageCache = new Map();

export async function resolveImage(place) {
  if (imageCache.has(place.name)) {
    return { ...place, img_src: imageCache.get(place.name) };
  }
  try {
    const url =
      `https://api.wikimedia.org/core/v1/commons/search/page?q=${encodeURIComponent(place.name)}&limit=1`;

    const res = await fetch(url, {
        headers: {
            "User-Agent": "CityDiscover/1.0 (https://github.com/NedasU)"
        }
    });
    const data = await res.json();

    const page = Object.values(data.pages ?? {})[0];
    const img_url = page?.thumbnail?.url;
    const upsized_img = img_url ? img_url.replace(/\/\d+px-/, `/800px-`) : "/images/placeholder.jpg";

    imageCache.set(place.name, upsized_img);
    return {
        ...place,
        img_src: upsized_img
    }
  } catch {
    return place;
  }
}
export async function resolveImagesWithLimit(places, limit = 5) {
  let index = 0;

  async function worker() {
    while (true) {
      const currentIndex = index++;
      if (currentIndex >= places.length) break;

      places[currentIndex] = await resolveImage(places[currentIndex]);
    }
  }

  const workers = Array.from({ length: limit }, () => worker());
  await Promise.all(workers);

  return places;
}