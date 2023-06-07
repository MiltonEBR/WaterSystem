import { DailyUrlOptions } from "../models/util.model"

const noTimeDate = (date: Date): string => {
  return date.toISOString().split('T')[0]
}

export function generateDailyURL(options: DailyUrlOptions){
  let baseUrl = '//waterservices.usgs.gov/nwis/dv/?format=json'
  baseUrl += '&startDT=' + noTimeDate(new Date(options.startDate))
  baseUrl += '&endDT=' + noTimeDate(new Date(options.endDate))
  baseUrl += '&sites=' + options.sites.join(',')
  
  baseUrl += '&siteStatus=' + (options.status || 'all')
  if(options.parameterCodes) baseUrl += '&parameterCd=' + options.parameterCodes.join(',')
  if(options.statisticCodes) baseUrl += '&statCd=' + options.statisticCodes.join(',')

  return baseUrl
}

export function sortStringsAsNums(arr: string[]){
  arr.sort((a,b) => {
    if (Number(a) < Number(b)) {
        return 1;
    }

    if (Number(a) > Number(b)) {
        return -1;
    }

    return 0;
  })

  return arr
}