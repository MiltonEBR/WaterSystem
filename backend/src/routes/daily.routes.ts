import express from 'express'
import { fetchDischargeData, fetchDischargeMonthly, fetchDischargeMonthlySummary } from '../controllers/usgs.controller'

const router = express.Router()

router.post('/discharge_mean', fetchDischargeData)
router.post('/discharge_monthly',fetchDischargeMonthly)
router.post('/discharge_monthlySummary',fetchDischargeMonthlySummary)

export default router