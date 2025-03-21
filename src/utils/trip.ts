export function trackPlanChanges(originalPlans, plans) {
  const updated: any = [];
  const deleted: number[] = [];
  const added: any = [];

  // 삭제된 항목과 수정된 항목 확인
  originalPlans.forEach((originalPlan) => {
    const matchingPlan = plans.find(
      (p) => p.planOrder === originalPlan.planOrder
    );
    if (!matchingPlan) {
      // originalPlans에는 있지만 plans에는 없는 경우
      deleted.push(originalPlan.planOrder);
    } else {
      const originalSpots = originalPlan.spots.map((spot) => ({
        ...spot,
        id: undefined,
      }));
      const matchingSpots = matchingPlan.spots.map((spot) => ({
        ...spot,
        id: undefined,
      }));
      if (JSON.stringify(originalSpots) !== JSON.stringify(matchingSpots)) {
        // spots이 변경된 경우
        const { date, ...planWithoutDate } = matchingPlan;
        // spots 안의 id 제거
        planWithoutDate.spots = planWithoutDate.spots.map(
          ({ id, ...spot }) => ({
            ...spot,
            latitude: Number(Number(spot.latitude).toFixed(9)),
            longitude: Number(Number(spot.longitude).toFixed(9)),
          })
        );

        // spots가 없거나 비어있으면 deleted로 처리
        if (!planWithoutDate.spots || planWithoutDate.spots.length === 0) {
          deleted.push(planWithoutDate.planOrder);
        } else {
          updated.push(planWithoutDate);
        }
      }
    }
  });

  // 새로 추가된 항목 확인 (변경 없음)
  plans.forEach((plan) => {
    const isNewPlan = !originalPlans.some(
      (op) => op.planOrder === plan.planOrder
    );
    if (isNewPlan && plan.spots.length > 0) {
      const { id, date, ...planWithoutDate } = plan;
      planWithoutDate.spots = planWithoutDate.spots.map(({ id, ...spot }) => ({
        ...spot,
        latitude: Number(Number(spot.latitude).toFixed(9)),
        longitude: Number(Number(spot.longitude).toFixed(9)),
      }));
      added.push(planWithoutDate);
    }
  });

  return { updated, deleted, added };
}

export function calculateCenterPoint(
  positions: { lat: number; lng: number }[]
) {
  // 라디안으로 변환
  const radians = (deg: number) => (deg * Math.PI) / 180;

  // Cartesian 좌표로 변환
  const cartesianPoints = positions.map((pos) => {
    const latRad = radians(pos.lat);
    const lngRad = radians(pos.lng);
    return {
      x: Math.cos(latRad) * Math.cos(lngRad),
      y: Math.cos(latRad) * Math.sin(lngRad),
      z: Math.sin(latRad),
    };
  });

  // 평균 x, y, z 계산
  const sumX = cartesianPoints.reduce((acc, curr) => acc + curr.x, 0);
  const sumY = cartesianPoints.reduce((acc, curr) => acc + curr.y, 0);
  const sumZ = cartesianPoints.reduce((acc, curr) => acc + curr.z, 0);
  const avgX = sumX / cartesianPoints.length;
  const avgY = sumY / cartesianPoints.length;
  const avgZ = sumZ / cartesianPoints.length;

  // 평균 x, y, z를 다시 지리 좌표로 변환
  const centerLat = Math.atan2(avgZ, Math.sqrt(avgX ** 2 + avgY ** 2));
  const centerLng = Math.atan2(avgY, avgX);

  // 도로 변환
  const centerLatDeg = (centerLat * 180) / Math.PI;
  const centerLngDeg = (centerLng * 180) / Math.PI;

  return { lat: centerLatDeg, lng: centerLngDeg };
}

export function calculateZoomLevel(
  positions: { lat: number; lng: number }[],
  mapSize: { width: number; height: number }
) {
  // MBR 계산
  const minLat = Math.min(...positions.map((pos) => pos.lat));
  const maxLat = Math.max(...positions.map((pos) => pos.lat));
  const minLng = Math.min(...positions.map((pos) => pos.lng));
  const maxLng = Math.max(...positions.map((pos) => pos.lng));

  // 중심점 계산
  const center = calculateCenterPoint(positions);

  // MBR의 크기 계산
  const latRange = maxLat - minLat;
  const lngRange = maxLng - minLng;

  // Google Maps의 줌 수준 계산 공식 사용
  // 이 공식은 단순화된 버전이며, 실제로는 더 복잡한 계산이 필요할 수 있습니다.
  const BASE_METER_PER_DP = 156543.03392; // Google Maps의 기본 단위
  const latitudeRadian = (center.lat * Math.PI) / 180;
  const top =
    BASE_METER_PER_DP *
    Math.cos(latitudeRadian) *
    Math.min(mapSize.width, mapSize.height);
  const total = top / (Math.max(latRange, lngRange) * 111320); // 약 111,320 meters per degree
  const zoomLevel = Math.log2(
    (BASE_METER_PER_DP *
      Math.cos(latitudeRadian) *
      Math.min(mapSize.width, mapSize.height)) /
      (Math.max(latRange, lngRange) * 111320)
  );

  return zoomLevel;
}
