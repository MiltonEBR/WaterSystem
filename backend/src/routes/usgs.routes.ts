import express from 'express'
import { fetchData } from '../controllers/usgs.controller'

const router = express.Router()

router.post('/daily_range', fetchData)

export default router