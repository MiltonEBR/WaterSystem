import { NextFunction, Request, Response } from "express";
import axios from 'axios'
import { noTimeDate } from "../utils/dates.util";

// const sites: string[] = [
//   '06670500',
//   '06657000',
//   '06656000',
//   '06652800',
//   '06650000',
//   '06645000',
//   '06643500',
//   '06642000',
//   '06639000',
//   '06641000',
//   '06636000',
//   '06635000',
//   '06630000',
//   '06627000',
//   '06620000'
// ]

const siteArgs = {
  type: 'ST',
  status: 'all'
}

export async function fetchData(req: Request, res: Response) {
  try {
    const {start, end, sites} = req.body
    if(!start || !end || !sites || !sites.length) throw Error('Invalid parameters')

    const startDT = noTimeDate(new Date(start))
    const endDT = noTimeDate(new Date(end))

    const queryUrl = `//waterservices.usgs.gov/nwis/dv/?format=json&sites=${sites.join(',')}&startDT=${startDT}&endDT=${endDT}&siteStatus=${siteArgs.status}`

    const qRes = await axios.get(queryUrl)
    if(!qRes.data) throw Error('No data returned')

    res.status(200).send(res.json(qRes.data))
  } catch (error) {
    res.status(406).send({error})
  }
}