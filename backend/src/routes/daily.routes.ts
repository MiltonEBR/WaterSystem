import express from 'express'
import { fetchDischargeData } from '../controllers/usgs.controller'

const router = express.Router()

router.post('/discharge_mean', fetchDischargeData)

export default router