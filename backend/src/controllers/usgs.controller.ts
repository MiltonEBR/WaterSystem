import { NextFunction, Request, Response } from "express";
import axios from 'axios'
import { generateDailyURL } from "../utils/util";
import { DailyValuesResponse } from "../models/usgs.models";
import { DischargeValue } from "../models/daily.model";

export async function fetchDischargeData(req: Request, res: Response) {
  try {
    const {start, end, sites} = req.body
    if(!start || !end || !sites || !sites.length) throw Error('Invalid parameters')

    const startDate = new Date(start)
    const endDate = new Date(end)

    const url = generateDailyURL({endDate, startDate, sites, parameterCodes: ['00060'], statisticCodes: ['00003']})

    const qRes = await axios.get(url)

    if(!qRes.data) throw Error('No data returned')

    const data: DailyValuesResponse = qRes.data

    const result: {[site:string]: DischargeValue} = {}
    for(let series of data.value.timeSeries){
      const siteName = series.sourceInfo.siteName
      const siteCode = series.sourceInfo.siteCode[0].value
      if(!(siteName in result)) result[siteName] = { siteName, siteCode, values:[] }
      
      const values = series.values[0].value.map(v => ({discharge: v.value, date: v.dateTime, qualifier: v.qualifiers[0]}))
      result[siteName].values.push(...values)
    }

    res.json(Object.values(result))

  } catch (error) {
    
  }
}