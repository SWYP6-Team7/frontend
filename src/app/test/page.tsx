import GoogleMap from "@/components/map/GoogleMap";
import KakaoMap from "@/components/map/KakaoMap";
import React from "react";

const TestPage = () => {
  return (
    <div>
      <GoogleMap />
      <div style={{ height: 300 }}></div>
      <KakaoMap />
    </div>
  );
};

export default TestPage;
