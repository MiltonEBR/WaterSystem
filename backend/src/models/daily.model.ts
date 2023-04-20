export interface DischargeValue {
  siteName: string,
  siteCode: string,
  values: {discharge: string, qualifier: string, date: string, }[]
}