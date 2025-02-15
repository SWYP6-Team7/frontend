"use client";
import {
  AdvancedMarker,
  APIProvider,
  Map,
  MapCameraChangedEvent,
  Pin,
  useMap,
  useMapsLibrary,
} from "@vis.gl/react-google-maps";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import type { Marker } from "@googlemaps/markerclusterer";

type Poi = { key: string; location: google.maps.LatLngLiteral };
const locations: Poi[] = [
  { key: "operaHouse", location: { lat: -33.8567844, lng: 151.213108 } },
  { key: "tarongaZoo", location: { lat: -33.8472767, lng: 151.2188164 } },
  { key: "hyderPark", location: { lat: -33.8690081, lng: 151.2052393 } },

  { key: "darlingHarbour", location: { lat: -33.87488, lng: 151.1987113 } },
  { key: "barangaroo", location: { lat: -33.8605523, lng: 151.1972205 } },
];

export const typeToKorean = {
  Attractions: "관광 명소",
  Dining: "식사",
  Accommodation: "숙박",
  Shopping: "쇼핑",
  Transportation: "교통",
  Entertainment: "엔터테인먼트",
};

type TravelCategory = "Attractions" | "Dining" | "Accommodation" | "Shopping" | "Transportation" | "Entertainment";

const categoryKeywords: Record<TravelCategory, string[]> = {
  Attractions: [
    "art",
    "cultural",
    "historical",
    "museum",
    "monument",
    "landmark",
    "park",
    "garden",
    "zoo",
    "aquarium",
    "theater",
    "gallery",
    "sculpture",
    "auditorium",
    "botanical",
    "national_park",
    "state_park",
    "beach",
    "observation_deck",
    "tourist_attraction",
    "wildlife",
    "natural_feature",
  ],
  Dining: [
    "restaurant",
    "cafe",
    "bar",
    "food",
    "bakery",
    "cuisine",
    "coffee",
    "ice_cream",
    "juice",
    "tea",
    "meal",
    "deli",
    "buffet",
    "pub",
    "wine",
    "pizzeria",
    "steakhouse",
    "food_court",
  ],
  Accommodation: [
    "hotel",
    "hostel",
    "lodging",
    "resort",
    "motel",
    "inn",
    "apartment",
    "bed_and_breakfast",
    "campground",
    "rv_park",
    "guest_house",
    "cottage",
  ],
  Shopping: [
    "store",
    "mall",
    "market",
    "shop",
    "boutique",
    "supermarket",
    "department_store",
    "grocery",
    "convenience_store",
    "gift_shop",
    "bookstore",
    "electronics_store",
    "clothing_store",
    "jewelry_store",
  ],
  Transportation: [
    "airport",
    "station",
    "terminal",
    "stop",
    "parking",
    "bus",
    "train",
    "subway",
    "taxi",
    "ferry",
    "transit",
    "car_rental",
  ],
  Entertainment: [
    "amusement",
    "casino",
    "cinema",
    "movie",
    "theater",
    "nightclub",
    "concert",
    "stadium",
    "arena",
    "sports",
    "fitness",
    "gym",
    "bowling",
    "playground",
    "karaoke",
    "dance",
  ],
};

function categorizePlaces(placeTypes: string[]): TravelCategory | "" {
  const scores: Record<Exclude<TravelCategory, "">, number> = {
    Attractions: 0,
    Dining: 0,
    Accommodation: 0,
    Shopping: 0,
    Transportation: 0,
    Entertainment: 0,
  };

  placeTypes.forEach((placeType) => {
    Object.entries(categoryKeywords).forEach(([category, keywords]) => {
      if (keywords.some((keyword) => placeType.toLowerCase().includes(keyword))) {
        scores[category as Exclude<TravelCategory, "">]++;
      }
    });
  });

  // 특별 케이스 처리
  if (placeTypes.some((type) => type.includes("restaurant") || type.includes("cafe"))) {
    scores.Dining += 2;
  }

  if (placeTypes.some((type) => type.includes("hotel") || type.includes("lodging"))) {
    scores.Accommodation += 2;
  }

  const maxScore = Math.max(...Object.values(scores));
  const threshold = 0.5; // 최소 점수 임계값 설정

  if (maxScore < threshold) {
    return ""; // 모든 카테고리의 점수가 임계값보다 낮으면 빈 문자열 반환
  }

  return Object.entries(scores).reduce((a, b) => (a[1] > b[1] ? a : b))[0] as TravelCategory;
}

const PoiMarkers = (props: { pois: Poi[] }) => {
  const map = useMap();
  const [markers, setMarkers] = useState<{ [key: string]: Marker }>({});
  const clusterer = useRef<MarkerClusterer | null>(null);

  // // Initialize MarkerClusterer, if the map has changed
  // useEffect(() => {
  //   if (!map) return;
  //   if (!clusterer.current) {
  //     clusterer.current = new MarkerClusterer({ map });
  //   }
  // }, [map]);

  // Update markers, if the markers array has changed
  useEffect(() => {
    clusterer.current?.clearMarkers();
    clusterer.current?.addMarkers(Object.values(markers));
  }, [markers]);
  const handleClick = (ev: google.maps.MapMouseEvent) => {
    if (!map) return;
    if (!ev.latLng) return;
    console.log("marker clicked:", ev.latLng.toString());
    map.panTo(ev.latLng);
  };
  const setMarkerRef = (marker: Marker | null, key: string) => {
    if (marker && markers[key]) return;
    if (!marker && !markers[key]) return;

    setMarkers((prev) => {
      if (marker) {
        return { ...prev, [key]: marker };
      } else {
        const newMarkers = { ...prev };
        delete newMarkers[key];
        return newMarkers;
      }
    });
  };

  const flightPath = new google.maps.Polyline({
    path: locations.map((item) => item.location),
    geodesic: true,
    strokeColor: "#FF0000",
    strokeOpacity: 1.0,
    strokeWeight: 2,
  });

  flightPath.setMap(map);
  return (
    <>
      {props.pois.map((poi: Poi) => (
        <AdvancedMarker
          clickable={true}
          onClick={handleClick}
          key={poi.key}
          position={poi.location}
          ref={(marker) => setMarkerRef(marker, poi.key)}
        >
          <Pin background={"#FBBC04"} glyphColor={"#000"} borderColor={"#000"} />
        </AdvancedMarker>
      ))}
    </>
  );
};

const GoogleMap = () => {
  return (
    <div style={{ width: "100%", height: 300 }}>
      <APIProvider
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API || ""}
        onLoad={() => console.log("Maps API has loaded.")}
      >
        <Map
          defaultZoom={13}
          mapId={process.env.NEXT_PUBLIC_GOOGLE_MAP_ID || ""}
          disableDefaultUI
          defaultCenter={{ lat: -33.860664, lng: 151.208138 }}
          onCameraChanged={(ev: MapCameraChangedEvent) =>
            console.log("camera changed:", ev.detail.center, "zoom:", ev.detail.zoom)
          }
        >
          <PoiMarkers pois={locations} />
        </Map>
        <PlacePredictions />
      </APIProvider>
    </div>
  );
};

function PlacePredictions() {
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [placeInfo, setPlaceInfo] = useState<string | null>(null);
  const map = useMap();
  const [text, setText] = useState("");
  const placesLib = useMapsLibrary("places");
  console.log(placesLib, "test");
  useEffect(() => {
    if (!placesLib || !map || text === "") return;
    async function fetchPlacePredictions() {
      try {
        console.log(placesLib, "info");
        // @ts-ignore
        const { AutocompleteSessionToken, AutocompleteSuggestion } = placesLib;

        let request = {
          input: text,

          language: "ko-KR",
          region: "kr",
        };

        // Create a session token.
        const token = new AutocompleteSessionToken();
        // Add the token to the request.
        // @ts-ignore
        request.sessionToken = token;

        // Fetch autocomplete suggestions.
        const { suggestions } = await AutocompleteSuggestion.fetchAutocompleteSuggestions(request);
        console.log(suggestions, "sug");

        const mappedSuggestions: any[] = [];
        suggestions.forEach((suggestion) => {
          console.log(suggestion.placePrediction.mainText.text, "text");
          const type = categorizePlaces(suggestion.placePrediction.types);
          mappedSuggestions.push({
            place: suggestion.placePrediction.mainText.text,
            type: type === "" ? type : typeToKorean[type],
          });
        });
        // const uniqueSuggestions = mappedSuggestions.filter(
        //   (suggestion, index, self) => index === self.findIndex((t) => t.place === suggestion.place)
        // );
        setSuggestions(mappedSuggestions);
      } catch (error) {
        console.error("Error fetching place predictions:", error);
      }
    }

    fetchPlacePredictions();
  }, [placesLib, map, text]);

  return (
    <div>
      <h2>장소 검색:</h2>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <ul id="results">
        {suggestions.map((suggestion, index) => (
          <li key={index}>
            {suggestion.place} - {suggestion.type}
          </li>
        ))}
      </ul>
      {placeInfo && <p id="prediction">{placeInfo}</p>}
    </div>
  );
}

export default GoogleMap;
