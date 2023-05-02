import express from 'express'
import { fetchDischargeData, fetchDischargeMonthly } from '../controllers/usgs.controller'

const router = express.Router()

router.post('/discharge_mean', fetchDischargeData)
router.post('/discharge_monthly',fetchDischargeMonthly)

export default router