export interface DischargeValue {
  siteName: string,
  siteCode: string,
  values: {discharge: string, qualifier: string, date: string, }[]
}

export interface MonthDischargeValues{
  siteName: string,
  siteCode: string,
  values: {month: string, discharges: string[]}[]
}

export interface YearlyDischargeValues{
  siteName: string,
  siteCode: string,
  values: {year: string, discharges: string[]}[]
}