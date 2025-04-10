interface Travel {
  travelNumber: number;
  title: string;
  userNumber: number;
  userName: string;
  tags: string[];
  nowPerson: number;
  maxPerson: number;
  createdAt: string;
  registerDue: string;
  location: string;
  bookmarked: boolean;
}

interface Page {
  size: number;
  number: number;
  totalElements: number;
  totalPages: number;
}

export interface ITripList {
  content: Travel[];
  page: Page;
}

export type SpotType = {
  id?: string;
  name: string;
  latitude: number;
  longitude: number;
  region: string;
  category: string;
};

interface Plan {
  planOrder: number;
  spots: SpotType[];
}

export interface CreateTripReqData {
  locationName: string;
  startDate: string;
  endDate: string;
  title: string;
  details: string;
  maxPerson: number;
  genderType: string;
  periodType: string;
  tags: string[];
  plans: Plan[];
}

export interface UpdateTripReqData {
  locationName: string;
  startDate: string;
  endDate: string;
  title: string;
  details: string;
  maxPerson: number;
  genderType: string;
  periodType: string;
  tags: string[];
  planChanges: PlanChanges;
}

interface PlanChanges {
  added: PlanChange[];
  updated: PlanChange[];
  deleted: number[];
}

interface PlanChange {
  planOrder: number;
  spots: SpotType[];
}
