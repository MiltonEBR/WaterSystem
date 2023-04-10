import { NextFunction, Request, Response } from "express";
import axios from 'axios'

const sites: string[] = [
  '06670500',
  '06657000',
  '06656000',
  '06652800',
  '06650000',
  '06645000',
  '06643500',
  '06642000',
  '06639000',
  '06641000',
  '06636000',
  '06635000',
  '06630000',
  '06627000',
  '06620000'
]
const siteArgs = {
  type: 'ST',
  status: 'all'
}
const paramCodes = ['00060','00065']


export async function test(req: Request, res: Response, next: NextFunction) {
  const resp = await axios.get(`//waterservices.usgs.gov/nwis/iv/?format=json&sites=${sites.join(',')}&parameterCd=${paramCodes.join(',')}&siteType=${siteArgs.type}&siteStatus=${siteArgs.status}`)
  // const retreived = new Set<string>()
  // for(let series of resp.data.value.timeSeries){
  //   retreived.add(series.name as string)
  // }
  // console.log(resp.data);
  const s = []
  for(let ts of resp.data.value.timeSeries){
    s.push(ts.sourceInfo.siteName)
  }
  
  const d = {
    names: s,
    rawData: resp.data
  }

  res.json(d)

}