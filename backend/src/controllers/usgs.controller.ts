import { NextFunction, Request, Response } from "express";
import axios from 'axios'

const sites: string[] = ['06679500','06679000','06678000','06677500','06674000','06674500','06672000','06670900','06670500','06657000','06656000','06652800','06652000','06650000','06646800','06645000','06643500','06642000','06639000','06641000','06636000','06635000','06630000','06627000','06620000']
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
  
  res.json(resp.data)

}