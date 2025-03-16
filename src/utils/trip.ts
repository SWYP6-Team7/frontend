export function trackPlanChanges(originalPlans, plans) {
  const updated: any = [];
  const deleted: number[] = [];
  const added: any = [];

  // 삭제된 항목과 수정된 항목 확인
  originalPlans.forEach((originalPlan) => {
    const matchingPlan = plans.find((p) => p.planOrder === originalPlan.planOrder);
    if (!matchingPlan) {
      // originalPlans에는 있지만 plans에는 없는 경우
      deleted.push(originalPlan.planOrder);
    } else {
      const originalSpots = originalPlan.spots.map((spot) => ({ ...spot, id: undefined }));
      const matchingSpots = matchingPlan.spots.map((spot) => ({ ...spot, id: undefined }));
      if (JSON.stringify(originalSpots) !== JSON.stringify(matchingSpots)) {
        // spots이 변경된 경우
        const { date, ...planWithoutDate } = matchingPlan;
        updated.push(planWithoutDate);
      }
    }
  });

  // 새로 추가된 항목 확인
  plans.forEach((plan) => {
    const isNewPlan = !originalPlans.some((op) => op.planOrder === plan.planOrder);
    if (isNewPlan && plan.spots.length > 0) {
      const { date, ...planWithoutDate } = plan;
      added.push(planWithoutDate);
    }
  });

  return { updated, deleted, added };
}
