"use client";
import { APIProvider, Map, MapCameraChangedEvent, useMap } from "@vis.gl/react-google-maps";
import React, { useEffect, useRef } from "react";
import sigoonGeoJsonData from "../../../public/geojson/korea.json";
import countryGeoJsonData from "../../../public/geojson/country.json";
function createAttribution() {
  const attributionLabel = document.createElement("div");
  // Define CSS styles.
  attributionLabel.style.backgroundColor = "#fff";
  attributionLabel.style.opacity = "0.7";
  attributionLabel.style.fontFamily = "Roboto,Arial,sans-serif";
  attributionLabel.style.fontSize = "10px";
  attributionLabel.style.padding = "2px";
  attributionLabel.style.margin = "2px";
  attributionLabel.textContent = "Data source: NYC Open Data";
  return attributionLabel;
}

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
        mapId={process.env.NEXT_PUBLIC_GOOGLE_MAP_ID || ""}
        renderingType="VECTOR"
        style={{ width: 400, height: 300 }}
        disableDefaultUI
        onCameraChanged={(ev: MapCameraChangedEvent) =>
          console.log("camera changed:", ev.detail.center, ev.detail.zoom)
        }
      >
        <TravelLog type={type} />
      </Map>
      <div id={`${type}-text`}></div>
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
      strokeColor: "green",
      strokeWeight: 2,
      strokeOpacity: 1,
      fillOpacity: 0, // 투명한 채우기
    });
    const textElem = document.getElementById(`${type}-text`) as HTMLDivElement;
    geoJsonLayer.addListener("click", (event) => {
      if (type === "sigoon") {
        const regionName = event.feature.getProperty("SIG_KOR_NM");
        const regionCode = event.feature.getProperty("SIG_CD");

        console.log("클릭한 지역:", regionName, regionCode);
        textElem.innerHTML = regionName;
        geoJsonLayer.revertStyle(); // 이전 스타일 초기화
        geoJsonLayer.overrideStyle(event.feature, {
          fillColor: "#FF5733", // 클릭한 지역 색상 변경
          fillOpacity: 0.9,
          strokeWeight: 2,
          strokeColor: "#C70039",
        });
      } else if (type === "country") {
        const regionName = event.feature.getProperty("name_ko");

        console.log("클릭한 지역:", textElem, regionName);
        textElem.innerHTML = regionName;

        geoJsonLayer.revertStyle(); // 이전 스타일 초기화
        geoJsonLayer.overrideStyle(event.feature, {
          fillColor: "#FF5733", // 클릭한 지역 색상 변경
          fillOpacity: 0.9,
          strokeWeight: 2,
          strokeColor: "#C70039",
        });
      }
    });
  }, [map]);
  useEffect(() => {
    if (!map) return;

    const attributionControl = createAttribution();

    if (google && google.maps && google.maps.ControlPosition) {
      map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(attributionControl);
    }

    return () => {
      const index = map?.controls[google.maps.ControlPosition.LEFT_BOTTOM].getArray().indexOf(attributionControl);
      if (index !== -1 && index) {
        map?.controls[google.maps.ControlPosition.RIGHT_BOTTOM].removeAt(index);
      }
    };
  }, [map]);

  return null;
};

export default TravelLogMap;
