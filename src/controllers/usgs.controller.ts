import { NextFunction, Request, Response } from "express";
import axios from 'axios'
import { generateDailyURL } from "../utils/util";
import { DailyValuesResponse } from "../models/usgs.models";
import { DischargeValue, MonthDischargeValues, YearlyDischargeValues } from "../models/daily.model";

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

export async function fetchDischargeYearly(req: Request, res: Response){
  try {
    const {start, end, sites} = req.body
    const startYear = Number(start || 0)
    const endYear = Number(end || 0)
    if(!startYear || !endYear || !sites || !sites.length) throw Error('Invalid parameters')
  
    const startOfYear = new Date(startYear - 1, 10, 1);
    const endOfYear =  new Date(endYear, 9, 31)
  
    const url = generateDailyURL({endDate: endOfYear, startDate: startOfYear, sites, parameterCodes: ['00060'], statisticCodes: ['00003']})
    const qRes = await axios.get(url)
    
    if(!qRes.data) throw Error('No data returned')
    
    const data: DailyValuesResponse = qRes.data

    const result: {[site:string]: YearlyDischargeValues} = {}
    for(let series of data.value.timeSeries){
      const siteName = series.sourceInfo.siteName
      const siteCode = series.sourceInfo.siteCode[0].value
      if(!(siteName in result)) result[siteName] = { siteName, siteCode, values:[] }
      
      const values: {date: string, value: string}[] = []
      
      for(let v of series.values[0].value){
        const dateStr = v.dateTime.split('T')
        const date = dateStr[0]

        values.push({date, value: v.value})
      }

      values.sort((a,b) => (new Date(a.date)).getTime() - (new Date(b.date)).getTime())

      const yearly: {[year:string]: string[]} = {}
      for(let v of values){
        const dateArr = v.date.split('-')
        const isPartOfNextYear = Number(dateArr[1]) >= 10
        const year = Number(dateArr[0]) + (isPartOfNextYear ? 1 : 0)
        yearly[year] = yearly[year] || []
        yearly[year].push(v.value)
      } 

      for(let year in yearly){
        result[siteName].values.push({year, discharges: yearly[year]})
      }

      
    }

    res.json(Object.values(result))
  } catch (error) {
    res.sendStatus(406)
  }
}

export async function fetchDischargeMonthlySummary(req: Request, res: Response){
  try {
    const {start, end, sites} = req.body
    if(!start || !end || !sites || !sites.length) throw Error('Invalid parameters')
  
    const startDate = new Date(start)
    const endDate = new Date(end)

    startDate.setDate(startDate.getDate() + 1)
    endDate.setDate(endDate.getDate() + 1)

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
        result[siteName].values.push({month, discharges: getQuadrants(values[month])})
      }
    }

    res.json(Object.values(result))
  } catch (error) {
    res.sendStatus(406)
  }

  function getQuadrants(discharges: string[], site?: any){
    let min:string, q1:string, median:string, q3:string, max:string;
    let result
    //Sort the array to get quadrants
    discharges = discharges.sort((a,b) => {
      if (Number(a) > Number(b)) {
          return 1;
      }
  
      if (Number(a) < Number(b)) {
          return -1;
      }
  
      return 0;
    }).filter(discharge => {
      return Number(discharge) > 0 && discharge != null
    })

    min = discharges[0]
    max = discharges[discharges.length - 1]
    //Middle point of the array
    median = getMedian(discharges)

    const left:string[] = [];
    const right:string[] = [];
    //Get left and right most part of the array
    discharges.forEach(discharge => {
      if(Number(discharge) < Number(median)){
        left.push(discharge)
      }else if(Number(discharge) > Number(median)){
        right.push(discharge)
      }
    })

    //Middle point of each array (Check if there's enough values)
    if(left.length > 0){
      q1 = getMedian(left)
    }else{
      q1 = min
    }
    
    if(right.length > 0){
      q3 = getMedian(right)
    }else{
      q3 = max
    }

    //Boxplot array
    result = [min, q1, median, q3, max]

    return result
  }

  function getMedian(arr: string[]){
    let median
    
    if (arr.length % 2 == 0)
        median = arr[(arr.length/2)]
    else
        median =  arr[(arr.length/2) - .5]
    
    if(median == null){
      arr.forEach(x => {
        console.log(x)
      })
    }
    return median
  }

}
