type VisitLog = {
  countryName: string;
  visitDates: string[];
};

type InternationalLogs = {
  [region: string]: VisitLog[] | undefined;
};

type DomesticLog = {
  locationName: string;
  visitDates: string[];
};

export type TravelLog = {
  userNumber: number;
  visitedCountriesCount: number;
  internationalLogs: InternationalLogs;
  domesticLogs: DomesticLog[];
};
