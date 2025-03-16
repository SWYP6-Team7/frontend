export function trackPlanChanges(originalPlans, plans) {
  const updated: any = [];
  const deleted: number[] = [];
  const added: any = [];

  // 삭제된 항목과 수정된 항목 확인
  originalPlans.forEach((originalPlan) => {
    const matchingPlan = plans.find((p) => p.date === originalPlan.date);
    if (!matchingPlan) {
      // originalPlans에는 있지만 plans에는 없는 경우
      deleted.push(originalPlan.planOrder);
    } else if (JSON.stringify(originalPlan.spots) !== JSON.stringify(matchingPlan.spots)) {
      // spots이 변경된 경우
      updated.push(matchingPlan);
    }
  });

  // 새로 추가된 항목 확인
  plans.forEach((plan) => {
    const isNewPlan = !originalPlans.some((op) => op.date === plan.date);
    if (isNewPlan && plan.spots.length > 0) {
      added.push(plan);
    }
  });

  return { updated, deleted, added };
}
