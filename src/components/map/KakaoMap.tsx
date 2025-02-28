"use client";

import { useEffect, useState } from "react";

declare global {
  interface Window {
    kakao: any;
  }
}

interface KakaoMapProps {
  lat: number;
  lng: number;
  zoom: number;
}

const KakaoMap = ({ lat, lng, zoom }: KakaoMapProps) => {
  const apiKey: string | undefined = process.env.NEXT_PUBLIC_KAKAO_MAP_KEY;
  const [keyword, setKeyword] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);

  useEffect(() => {
    const script: HTMLScriptElement = document.createElement("script");
    script.async = true;
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&autoload=false`;
    document.head.appendChild(script);

    script.addEventListener("load", () => {
      window.kakao.maps.load(() => {
        // var positions = [
        //   {
        //     title: "카카오",
        //     latlng: new window.kakao.maps.LatLng(33.450705, 126.570677),
        //   },
        //   {
        //     title: "생태연못",
        //     latlng: new window.kakao.maps.LatLng(33.450936, 126.569477),
        //   },
        //   {
        //     title: "텃밭",
        //     latlng: new window.kakao.maps.LatLng(33.450879, 126.56994),
        //   },
        //   {
        //     title: "근린공원",
        //     latlng: new window.kakao.maps.LatLng(33.451393, 126.570738),
        //   },
        // ];
        let coords = new window.kakao.maps.LatLng(lat, lng);

        // 지도를 담을 영역의 DOM 레퍼런스
        let container = document.getElementById("map");

        // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
        let options = {
          // 지도를 생성할 때 필요한 기본 옵션
          center: coords, // 지도의 중심좌표
          level: zoom, // 지도의 확대 레벨
        };
        let map = new window.kakao.maps.Map(container, options); // 지도 생성 및 객체 리턴

        var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";

        var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
        var imageSize = new window.kakao.maps.Size(24, 35);
        var markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize);

        var linePath: any[] = [];

        // for (var i = 0; i < positions.length; i++) {
        //   var marker = new window.kakao.maps.Marker({
        //     map: map,
        //     position: positions[i].latlng,
        //     title: positions[i].title,
        //     image: markerImage,
        //   });

        //   linePath.push(positions[i].latlng);
        // }

        // var polyline = new window.kakao.maps.Polyline({
        //   path: linePath,
        //   strokeWeight: 3,
        //   strokeColor: "#db4040",
        //   strokeOpacity: 0.7,
        //   strokeStyle: "solid",
        // });

        // polyline.setMap(map);

        map.setCenter(coords);
      });
    });
  }, []);

  useEffect(() => {
    const script: HTMLScriptElement = document.createElement("script");
    script.async = true;
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&autoload=false&libraries=services`;
    document.head.appendChild(script);

    script.addEventListener("load", () => {
      window.kakao.maps.load(() => {
        function placesSearchCB(data, status, pagination) {
          if (status === window.kakao.maps.services.Status.OK) {
            const mappedSuggestions: any[] = [];
            data.forEach((item) => {
              console.log(item);

              mappedSuggestions.push({
                place: item.place_name,
                type: item.category_name,
              });

              // const uniqueSuggestions = mappedSuggestions.filter(
              //   (suggestion, index, self) => index === self.findIndex((t) => t.place === suggestion.place)
              // );
              setSuggestions(mappedSuggestions);
            });
          } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
            console.log("zero result");
            return;
          } else if (status === window.kakao.maps.services.Status.ERROR()) {
            alert("검색 결과 중 오류가 발생했습니다.");
            return;
          }
        }

        var ps = new window.kakao.maps.services.Places();

        // 검색 결과 목록이나 마커를 클릭했을 때 장소명을 표출할 인포윈도우를 생성합니다
        var infowindow = new window.kakao.maps.InfoWindow({ zIndex: 1 });

        // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
        ps.keywordSearch(keyword, placesSearchCB);
      });
    });
  }, [keyword]);

  return (
    <div style={{ minHeight: 800 }}>
      <div id="map" style={{ height: "300px", width: "100%" }} />

      {/* <input value={keyword} onChange={(e) => setKeyword(e.target.value)} /> */}
      {/* <ul id="results">
        {suggestions.map((suggestion, index) => (
          <li key={index}>
            {suggestion.place} - {suggestion.type}
          </li>
        ))}
      </ul> */}
    </div>
  );
};

export default KakaoMap;
