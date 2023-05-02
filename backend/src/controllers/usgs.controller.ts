import { NextFunction, Request, Response } from "express";
import axios from 'axios'
import { generateDailyURL } from "../utils/util";
import { DailyValuesResponse } from "../models/usgs.models";
import { DischargeValue, MonthDischargeValues } from "../models/daily.model";

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
    res.sendStatus(406)
  }
}

export async function fetchDischargeMonthly(req: Request, res: Response){
  try {
    const {start, end, sites} = req.body
      if(!start || !end || !sites || !sites.length) throw Error('Invalid parameters')
  
    const startDate = new Date(start)
    const endDate = new Date(end)
    endDate.setMonth(endDate.getMonth()+1)
  
    const url = generateDailyURL({endDate, startDate, sites, parameterCodes: ['00060'], statisticCodes: ['00003']})

    const qRes = await axios.get(url)

    if(!qRes.data) throw Error('No data returned')

    const data: DailyValuesResponse = qRes.data

    const result: {[site:string]: MonthDischargeValues} = {}
    for(let series of data.value.timeSeries){
      const siteName = series.sourceInfo.siteName
      const siteCode = series.sourceInfo.siteCode[0].value
      if(!(siteName in result)) result[siteName] = { siteName, siteCode, values:[] }
      
      const values: {[month:string]: string[]} = {}
      //const values = series.values[0].value.map(v => ({discharge: v.value, date: v.dateTime, qualifier: v.qualifiers[0]}))
      for(let v of series.values[0].value){
        const dateStr = v.dateTime.split('-')
        const month = dateStr[1]+'-'+dateStr[0]
        values[month] = values[month] || []
        values[month].push(v.value)
      }

      for(let month in values){
        result[siteName].values.push({month, discharges: values[month]})
      }
    }

    res.json(Object.values(result))
  } catch (error) {
    res.sendStatus(406)
  }
}

