import GoogleMap from "@/components/map/GoogleMap";
import KakaoMap from "@/components/map/KakaoMap";
import TravelLogMap from "@/components/map/TravelLogMap";
import React from "react";

const TestPage = () => {
  return (
    <div>
      <TravelLogMap type="country" />
      <div style={{ height: 100 }} />
      <TravelLogMap type="sigoon" />
    </div>
  );
};

export default TestPage;
