export interface DailyUrlOptions {
  startDate: Date,
  endDate: Date,
  sites: string[],
  status?: string,
  statisticCodes?: string[],
  parameterCodes?: string[],
}