"use client";
import { APIProvider, Map, MapCameraChangedEvent, useMap } from "@vis.gl/react-google-maps";
import React, { useEffect, useRef } from "react";
import sigoonGeoJsonData from "../../../public/geojson/korea.json";
import countryGeoJsonData from "../../../public/geojson/country.json";

const TravelLogMap = ({ type }: { type: "country" | "sigoon" }) => {
  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API || ""}>
      <Map
        defaultCenter={
          type === "sigoon"
            ? { lat: 35.8, lng: 127.99041015624999 }
            : { lat: 35.95985150233884, lng: 164.13703818135662 }
        }
        defaultZoom={type === "sigoon" ? 6 : 0.579}
        id="travel-map"
        mapId={"487094bc36f35633"}
        style={{ width: 400, height: 300 }}
        mapTypeId={"roadmap"}
        disableDefaultUI
        onCameraChanged={(ev: MapCameraChangedEvent) =>
          console.log("camera changed:", ev.detail.center, ev.detail.zoom)
        }
      >
        <TravelLog type={type} />
      </Map>
    </APIProvider>
  );
};

const TravelLog = ({ type }: { type: "country" | "sigoon" }) => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    const geoJsonLayer = new google.maps.Data({ map });

    geoJsonLayer.addGeoJson(type === "sigoon" ? sigoonGeoJsonData : countryGeoJsonData);

    geoJsonLayer.setStyle({
      strokeColor: "#fff",
      strokeWeight: 1,
      strokeOpacity: 1,
      fillOpacity: 0, // 투명한 채우기
    });
  }, [map]);

  return null;
};

// function createAttribution() {
//   const attributionLabel = document.createElement("div");
//   // Define CSS styles.
//   attributionLabel.style.backgroundColor = "#fff";
//   attributionLabel.style.opacity = "0.7";
//   attributionLabel.style.fontFamily = "Roboto,Arial,sans-serif";
//   attributionLabel.style.fontSize = "10px";
//   attributionLabel.style.padding = "2px";
//   attributionLabel.style.margin = "2px";
//   attributionLabel.textContent = "Data source: NYC Open Data";
//   return attributionLabel;
// }

// useEffect(() => {
//   if (!map) return;

//   const attributionControl = createAttribution();

//   if (google && google.maps && google.maps.ControlPosition) {
//     map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(attributionControl);
//   }

//   return () => {
//     const index = map?.controls[google.maps.ControlPosition.LEFT_BOTTOM].getArray().indexOf(attributionControl);
//     if (index !== -1 && index) {
//       map?.controls[google.maps.ControlPosition.RIGHT_BOTTOM].removeAt(index);
//     }
//   };
// }, [map]);

export default TravelLogMap;
