export function getPlanChanges(originalPlans, updatedPlans) {
  const planChanges: any = {
    added: [],
    updated: [],
    deleted: [],
  };

  // 원래 계획의 인덱스를 맵으로 만들어 빠른 접근을 가능하게 함
  const originalPlansMap = {};
  originalPlans.forEach((plan) => {
    originalPlansMap[plan.planOrder] = plan;
  });

  // 변경된 계획의 인덱스를 맵으로 만듦
  const updatedPlansMap = {};
  updatedPlans.forEach((plan) => {
    updatedPlansMap[plan.planOrder] = plan;
  });

  // 추가되거나 수정된 항목 찾기
  updatedPlans.forEach((plan) => {
    const originalPlan = originalPlansMap[plan.planOrder];

    if (!originalPlan) {
      // 원래 계획에 없는 경우 추가된 항목
      planChanges.added.push({
        planOrder: plan.planOrder,
        spots: plan.spots,
      });
    } else {
      // 원래 계획에 있는 경우 변경사항 확인
      const spotsChanged = !areSpotsSame(originalPlan.spots, plan.spots);

      if (spotsChanged) {
        planChanges.updated.push({
          planOrder: plan.planOrder,
          spots: plan.spots,
        });
      }
    }
  });

  // 삭제된 항목 찾기
  originalPlans.forEach((plan) => {
    if (!updatedPlansMap[plan.planOrder]) {
      planChanges.deleted.push(plan.planOrder);
    }
  });

  return { planChanges };
}

/**
 * 두 spots 배열이 같은지 비교합니다.
 * @param {Array} spots1 - 첫 번째 spots 배열
 * @param {Array} spots2 - 두 번째 spots 배열
 * @returns {boolean} 두 배열이 같으면 true, 다르면 false
 */
function areSpotsSame(spots1, spots2) {
  if (!spots1 || !spots2) return spots1 === spots2;
  if (spots1.length !== spots2.length) return false;
  debugDifferences(spots1, spots2);
  // 각 요소를 문자열로 변환하여 간단하게 비교
  try {
    // 배열이 비어있는 경우를 처리
    if (spots1.length === 0 && spots2.length === 0) return true;

    // 각 요소별로 비교
    for (let i = 0; i < spots1.length; i++) {
      const spot1 = spots1[i];
      const spot2 = spots2[i];

      // 기본 필드 비교
      if (
        spot1.name !== spot2.name ||
        spot1.category !== spot2.category ||
        spot1.region !== spot2.region ||
        spot1.latitude !== spot2.latitude ||
        spot1.longitude !== spot2.longitude
      ) {
        return false;
      }

      // spotOrder가 있다면 비교
      if (spot1.spotOrder !== spot2.spotOrder) {
        return false;
      }
    }

    return true;
  } catch (error) {
    console.error("비교 중 오류 발생:", error);

    // 오류 발생 시 안전하게 문자열 비교로 폴백
    const str1 = JSON.stringify(simplifySpots(spots1));
    const str2 = JSON.stringify(simplifySpots(spots2));
    return str1 === str2;
  }
}

/**
 * 스팟 객체를 간소화하여 핵심 필드만 남깁니다.
 * @param {Array} spots - 스팟 배열
 * @returns {Array} 간소화된 스팟 배열
 */
function simplifySpots(spots) {
  if (!spots || !Array.isArray(spots)) return spots;

  return spots.map((spot) => {
    if (!spot) return null;

    return {
      name: spot.name,
      category: spot.category,
      region: spot.region,
      latitude: spot.latitude,
      longitude: spot.longitude,
      spotOrder: spot.spotOrder,
    };
  });
}

/**
 * 디버깅용: 두 객체의 차이점을 출력합니다.
 * @param {Object} obj1 - 첫 번째 객체
 * @param {Object} obj2 - 두 번째 객체
 */
function debugDifferences(obj1, obj2) {
  console.log("=== 객체 차이 분석 ===");
  console.log("첫 번째 객체:", JSON.stringify(obj1, null, 2));
  console.log("두 번째 객체:", JSON.stringify(obj2, null, 2));

  const str1 = JSON.stringify(obj1);
  const str2 = JSON.stringify(obj2);

  console.log("문자열 비교 결과:", str1 === str2);

  if (str1 !== str2) {
    console.log("첫 번째 객체 길이:", str1.length);
    console.log("두 번째 객체 길이:", str2.length);

    // 차이가 있는 부분 찾기
    for (let i = 0; i < Math.min(str1.length, str2.length); i++) {
      if (str1[i] !== str2[i]) {
        console.log(`첫 번째 차이점: 위치 ${i}, '${str1.substring(i, i + 10)}' vs '${str2.substring(i, i + 10)}'`);
        break;
      }
    }
  }
}
