function getPlanChanges(originalPlans, updatedPlans) {
  const planChanges: any = {
    added: [],
    updated: [],
    deleted: [],
  };

  // 원래 계획의 인덱스를 맵으로 만들어 빠른 접근을 가능하게 함
  const originalPlansMap: any = {};
  originalPlans.forEach((plan) => {
    originalPlansMap[plan.planOrder] = plan;
  });

  // 변경된 계획의 인덱스를 맵으로 만듦
  const updatedPlansMap: any = {};
  updatedPlans.forEach((plan) => {
    updatedPlansMap[plan.planOrder] = plan;
  });

  // 완전히 새로 추가된 계획 찾기 (planOrder가 원래 계획에 없는 경우)
  updatedPlans.forEach((plan) => {
    const originalPlan = originalPlansMap[plan.planOrder];

    if (!originalPlan) {
      // 원래 계획에 없는 경우 추가된 항목
      planChanges.added.push({
        planOrder: plan.planOrder,
        spots: plan.spots,
      });
    }
  });

  // 완전히 삭제된 계획 찾기 (planOrder가 변경된 계획에 없는 경우)
  originalPlans.forEach((plan) => {
    if (!updatedPlansMap[plan.planOrder]) {
      planChanges.deleted.push(plan.planOrder);
    }
  });

  // 수정된 계획 찾기 (planOrder는 같지만 내용이 다른 경우)
  updatedPlans.forEach((plan) => {
    const originalPlan = originalPlansMap[plan.planOrder];

    if (originalPlan) {
      // 원래 계획에 있는 경우, spots 변경사항 확인
      const { spotsAdded, spotsDeleted, spotsModified } = compareSpots(originalPlan.spots, plan.spots);

      const hasChanges = spotsAdded.length > 0 || spotsDeleted.length > 0 || spotsModified.length > 0;

      if (hasChanges) {
        // 변경사항이 있으면 updated에 추가
        planChanges.updated.push({
          planOrder: plan.planOrder,
          spots: plan.spots,
          // 디버깅을 위한 상세 정보 (필요시 사용)
          _debug: {
            spotsAdded,
            spotsDeleted,
            spotsModified,
          },
        });

        // spots에 추가된 항목이 있으면 added에도 추가
        if (spotsAdded.length > 0) {
          planChanges.added.push({
            planOrder: plan.planOrder,
            spots: spotsAdded,
          });
        }

        // spots에서 삭제된 항목이 있으면 deleted에도 추가
        if (spotsDeleted.length > 0) {
          // 삭제된 spot의 순서를 added
          spotsDeleted.forEach((spot) => {
            if (spot.spotOrder !== undefined) {
              planChanges.deleted.push(spot.spotOrder);
            }
          });
        }
      }
    }
  });

  return { planChanges };
}

/**
 * 두 spots 배열을 비교하여 추가, 삭제, 수정된 spot을 찾습니다.
 * @param {Array} originalSpots - 원래 spots 배열
 * @param {Array} updatedSpots - 변경된 spots 배열
 * @returns {Object} 추가, 삭제, 수정된 spot 목록
 */
function compareSpots(originalSpots, updatedSpots) {
  const spotsAdded: any = [];
  const spotsDeleted: any = [];
  const spotsModified: any = [];

  // 비어있는 배열 처리
  if (!originalSpots) originalSpots = [];
  if (!updatedSpots) updatedSpots = [];

  // 원래 spots의 맵을 만듦 (spotOrder 기준)
  const originalSpotsMap = {};
  originalSpots.forEach((spot, index) => {
    const key = spot.spotOrder !== undefined ? spot.spotOrder : index;
    originalSpotsMap[key] = spot;
  });

  // 변경된 spots의 맵을 만듦 (spotOrder 기준)
  const updatedSpotsMap = {};
  updatedSpots.forEach((spot, index) => {
    const key = spot.spotOrder !== undefined ? spot.spotOrder : index;
    updatedSpotsMap[key] = spot;
  });

  // 추가되거나 수정된 spot 찾기
  updatedSpots.forEach((spot, index) => {
    const key = spot.spotOrder !== undefined ? spot.spotOrder : index;
    const originalSpot = originalSpotsMap[key];

    if (!originalSpot) {
      // 원래 spots에 없는 경우 추가된 항목
      spotsAdded.push(spot);
    } else {
      // 원래 spots에 있는 경우 변경사항 확인
      if (!areSpotsEqual(originalSpot, spot)) {
        spotsModified.push(spot);
      }
    }
  });

  // 삭제된 spot 찾기
  originalSpots.forEach((spot, index) => {
    const key = spot.spotOrder !== undefined ? spot.spotOrder : index;
    if (!updatedSpotsMap[key]) {
      spotsDeleted.push(spot);
    }
  });

  return {
    spotsAdded,
    spotsDeleted,
    spotsModified,
  };
}

/**
 * 두 spot 객체가 같은지 비교합니다.
 * @param {Object} spot1 - 첫 번째 spot 객체
 * @param {Object} spot2 - 두 번째 spot 객체
 * @returns {boolean} 두 객체가 같으면 true, 다르면 false
 */
function areSpotsEqual(spot1, spot2) {
  if (!spot1 || !spot2) return spot1 === spot2;

  // 핵심 필드 비교
  return (
    spot1.name === spot2.name &&
    spot1.category === spot2.category &&
    spot1.region === spot2.region &&
    spot1.latitude === spot2.latitude &&
    spot1.longitude === spot2.longitude
  );
}
