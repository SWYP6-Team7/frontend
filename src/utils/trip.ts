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
  if (spots1.length !== spots2.length) {
    return false;
  }

  // 각 spot 객체를 문자열로 변환하여 비교
  const spotsStringArray1 = spots1.map((spot) => JSON.stringify(sortObjectKeys(spot)));
  const spotsStringArray2 = spots2.map((spot) => JSON.stringify(sortObjectKeys(spot)));

  // 배열 순서가 중요한 경우 (인덱스별 일치)
  for (let i = 0; i < spotsStringArray1.length; i++) {
    if (spotsStringArray1[i] !== spotsStringArray2[i]) {
      return false;
    }
  }

  return true;
}

/**
 * 객체의 키를 정렬하여 동일한 객체지만 키 순서가 다른 경우 일관된 문자열이 생성되도록 합니다.
 * @param {Object} obj - 정렬할 객체
 * @returns {Object} 키가 정렬된 새 객체
 */
function sortObjectKeys(obj) {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }

  // 객체인 경우 키를 정렬
  if (!Array.isArray(obj)) {
    return Object.keys(obj)
      .sort()
      .reduce((result, key) => {
        result[key] = sortObjectKeys(obj[key]);
        return result;
      }, {});
  }

  // 배열인 경우 각 요소에 대해 재귀적으로 처리
  return obj.map(sortObjectKeys);
}
