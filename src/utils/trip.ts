/**
 * 원래 계획과 변경된 계획을 비교하여 추가, 수정, 삭제된 항목을 반환합니다.
 * @param {Array} originalPlans - 원래 계획 배열
 * @param {Array} updatedPlans - 변경된 계획 배열
 * @returns {Object} 변경 사항을 포함한 객체
 */
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

  // 수정된 계획 찾기 (planOrder는 같지만 내용이 다른 경우)
  updatedPlans.forEach((plan) => {
    const originalPlan = originalPlansMap[plan.planOrder];

    if (originalPlan) {
      // 원래 계획에 있는 경우, spots 변경사항 확인
      const hasChanges = !areSpotsSame(originalPlan.spots, plan.spots);

      if (hasChanges) {
        // 변경사항이 있으면 updated에 추가
        planChanges.updated.push({
          planOrder: plan.planOrder,
          spots: plan.spots,
        });
      }
    }
  });

  // 완전히 삭제된 계획 찾기 (planOrder가 변경된 계획에 없는 경우)
  originalPlans.forEach((plan) => {
    if (!updatedPlansMap[plan.planOrder]) {
      planChanges.deleted.push(plan.planOrder);
    }
  });

  return planChanges;
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

  // 각 요소를 비교
  for (let i = 0; i < spots1.length; i++) {
    const spot1 = spots1[i];
    const spot2 = spots2[i];

    // 핵심 필드 비교
    if (
      spot1.name !== spot2.name ||
      spot1.category !== spot2.category ||
      spot1.region !== spot2.region ||
      spot1.latitude !== spot2.latitude ||
      spot1.longitude !== spot2.longitude
    ) {
      return false;
    }
  }

  return true;
}
