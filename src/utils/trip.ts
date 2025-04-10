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
        planWithoutDate.spots = planWithoutDate.spots.map(({ id, ...spot }) => ({
          ...spot,
          latitude: Number(Number(spot.latitude).toFixed(9)),
          longitude: Number(Number(spot.longitude).toFixed(9)),
        }));

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
    const isNewPlan = !originalPlans.some((op) => op.planOrder === plan.planOrder);
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
